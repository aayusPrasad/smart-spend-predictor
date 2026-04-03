import { useState } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ExpenseSidebar } from "@/components/ExpenseSidebar";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { OverspendingAlert } from "@/components/OverspendingAlert";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SpendingOverview } from "@/components/SpendingOverview";
import { Sparkles, Wallet, TrendingDown, CreditCard } from "lucide-react";

const budgetData: Record<string, { spent: number; budget: number }> = {
  Food: { spent: 420, budget: 500 },
  Transport: { spent: 180, budget: 200 },
  Shopping: { spent: 650, budget: 400 },
  Bills: { spent: 310, budget: 500 },
};

const categoryKeywords: Record<string, string[]> = {
  Food: ["food", "restaurant", "lunch", "dinner", "coffee", "grocery", "eat", "meal", "pizza", "burger", "cafe"],
  Transport: ["uber", "lyft", "taxi", "bus", "train", "gas", "fuel", "ride", "metro", "parking", "flight"],
  Shopping: ["amazon", "clothes", "shoes", "electronics", "buy", "shop", "store", "mall", "order"],
  Bills: ["rent", "electricity", "water", "internet", "phone", "insurance", "subscription", "netflix", "bill", "utility"],
};

function predictCategory(description: string): { category: string; confidence: number } {
  const lower = description.toLowerCase();
  let bestCategory = "Shopping";
  let bestScore = 0;
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    const score = keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestCategory = cat;
    }
  }
  const confidence = bestScore > 0 ? Math.min(75 + bestScore * 8, 97) : 62;
  return { category: bestCategory, confidence };
}

const statCards = [
  { label: "Total Spent", value: "$1,560", icon: Wallet, change: "+12%", negative: true },
  { label: "Total Budget", value: "$1,600", icon: CreditCard, change: "97% used", negative: false },
  { label: "Savings", value: "$40", icon: TrendingDown, change: "-68%", negative: true },
];

const Index = () => {
  const [result, setResult] = useState<{
    category: string;
    confidence: number;
    description: string;
    amount: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = (description: string, amount: number) => {
    setIsLoading(true);
    setTimeout(() => {
      const { category, confidence } = predictCategory(description);
      setResult({ category, confidence, description, amount });
      setIsLoading(false);
    }, 800);
  };

  const alertData = result
    ? {
        category: result.category,
        spent: (budgetData[result.category]?.spent ?? 0) + result.amount,
        budget: budgetData[result.category]?.budget ?? 0,
      }
    : { category: null, spent: null, budget: null };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <AnimatedBackground />
        <ExpenseSidebar />

        <div className="flex-1 flex flex-col relative z-10">
          <header className="h-14 flex items-center border-b border-border/50 px-4 backdrop-blur-sm bg-background/80">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Dashboard</span>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">
            {/* Hero heading */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Smart Expense Predictor
              </h1>
              <p className="mt-2 text-muted-foreground">
                AI-powered expense classification and budget alert
              </p>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {statCards.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 shadow-card hover:shadow-elevated transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </span>
                    <s.icon className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-2xl font-bold text-card-foreground">
                      {s.value}
                    </span>
                    <span className={`text-xs font-semibold mb-0.5 ${s.negative ? "text-destructive" : "text-accent"}`}>
                      {s.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Prediction section */}
            <div className="grid gap-6 lg:grid-cols-2 mb-8">
              <div className="space-y-6">
                <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
              </div>
              <div className="space-y-6">
                <PredictionResult
                  category={result?.category ?? null}
                  confidence={result?.confidence ?? null}
                  description={result?.description ?? null}
                  amount={result?.amount ?? null}
                />
                <OverspendingAlert
                  category={alertData.category}
                  spent={alertData.spent}
                  budget={alertData.budget}
                />
              </div>
            </div>

            {/* Spending + Transactions */}
            <div className="grid gap-6 lg:grid-cols-2">
              <SpendingOverview />
              <TransactionHistory />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
