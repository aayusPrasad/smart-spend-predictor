import { useState } from "react";
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
  food: { spent: 420, budget: 500 },
  travel: { spent: 180, budget: 200 },
  shopping: { spent: 650, budget: 400 },
  utilities: { spent: 310, budget: 500 },
};

const statCards = [
  {
    label: "Total Spent",
    value: "$1,560",
    icon: Wallet,
    change: "+12%",
    negative: true,
  },
  {
    label: "Total Budget",
    value: "$1,600",
    icon: CreditCard,
    change: "97% used",
    negative: false,
  },
  {
    label: "Savings",
    value: "$40",
    icon: TrendingDown,
    change: "-68%",
    negative: true,
  },
];

const Index = () => {
  const [result, setResult] = useState<{
    category: string;
    confidence: number;
    description: string;
    amount: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (description: string, amount: number) => {
    setIsLoading(true);

    const API_URL =
      window.location.hostname === "localhost"
        ? "http://127.0.0.1:8000/predict"
        : "https://aayup78bm-smartspendpredictor.hf.space/predict";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: description,
          amount: amount,
        }),
      });

      const data = await response.json();

      setResult({
        category: data.category.toLowerCase(),
        confidence: data.confidence,
        description,
        amount,
      });
    } catch (error) {
      console.error("Backend error:", error);

      setResult({
        category: "error",
        confidence: 0,
        description,
        amount,
      });
    }

    setIsLoading(false);
  };

  const alertData = result
    ? {
        category: result.category,
        spent: (budgetData[result.category]?.spent ?? 0) + result.amount,
        budget: budgetData[result.category]?.budget ?? 0,
      }
    : {
        category: null,
        spent: null,
        budget: null,
      };

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
              <span className="text-sm font-medium text-muted-foreground">
                Dashboard
              </span>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Smart Expense Predictor
              </h1>
              <p className="mt-2 text-muted-foreground">
                AI-powered expense classification and budget alert
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {statCards.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </span>
                    <s.icon className="h-4 w-4 text-muted-foreground/50" />
                  </div>

                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-card-foreground">
                      {s.value}
                    </span>

                    <span
                      className={`text-xs font-semibold ${
                        s.negative ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {s.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

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
