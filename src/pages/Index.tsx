import { useState } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ExpenseSidebar } from "@/components/ExpenseSidebar";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { OverspendingAlert } from "@/components/OverspendingAlert";
import { Sparkles } from "lucide-react";

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
      <div className="min-h-screen flex w-full">
        <ExpenseSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Dashboard</span>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
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

            <div className="grid gap-6 md:grid-cols-2">
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
