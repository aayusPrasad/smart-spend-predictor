import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface OverspendingAlertProps {
  category: string | null;
  spent: number | null;
  budget: number | null;
}

export function OverspendingAlert({ category, spent, budget }: OverspendingAlertProps) {
  const isOver = spent !== null && budget !== null && spent > budget;

  return (
    <AnimatePresence>
      {isOver && category && (
        <motion.div
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-warning/30 bg-warning/5 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-warning">
                Overspending Alert
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                You've spent{" "}
                <span className="font-semibold text-foreground">${spent?.toFixed(2)}</span>{" "}
                on <span className="font-semibold text-foreground">{category}</span> this month,
                exceeding your{" "}
                <span className="font-semibold text-foreground">${budget?.toFixed(2)}</span>{" "}
                budget by{" "}
                <span className="font-semibold text-destructive">
                  ${((spent ?? 0) - (budget ?? 0)).toFixed(2)}
                </span>.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
