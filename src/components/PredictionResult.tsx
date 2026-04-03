import { motion, AnimatePresence } from "framer-motion";
import { Tag, CheckCircle } from "lucide-react";

interface PredictionResultProps {
  category: string | null;
  confidence: number | null;
  description: string | null;
  amount: number | null;
}

const categoryColors: Record<string, string> = {
  Food: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Transport: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Shopping: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  Bills: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export function PredictionResult({ category, confidence, description, amount }: PredictionResultProps) {
  return (
    <AnimatePresence mode="wait">
      {category ? (
        <motion.div
          key={category + description}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="rounded-xl border border-border bg-card p-6 shadow-elevated"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-accent" />
            <h3 className="font-display text-lg font-semibold text-card-foreground">
              Prediction Result
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Expense</span>
              <span className="text-sm font-medium text-card-foreground">{description}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-medium text-card-foreground">${amount?.toFixed(2)}</span>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Category</span>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${categoryColors[category] || "bg-muted text-muted-foreground border-border"}`}>
                <Tag className="h-3 w-3" />
                {category}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <span className="text-sm font-semibold text-accent">{confidence}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center"
        >
          <Tag className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-3 text-sm text-muted-foreground">
            Enter an expense to see the predicted category
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
