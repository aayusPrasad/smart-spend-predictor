import { motion } from "framer-motion";
import { UtensilsCrossed, Car, ShoppingBag, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "expense" | "refund";
}

const transactions: Transaction[] = [
  { id: 1, description: "Starbucks Coffee", amount: 5.40, category: "Food", date: "Today", type: "expense" },
  { id: 2, description: "Uber to Airport", amount: 32.00, category: "Transport", date: "Today", type: "expense" },
  { id: 3, description: "Amazon Order Refund", amount: 24.99, category: "Shopping", date: "Yesterday", type: "refund" },
  { id: 4, description: "Netflix Subscription", amount: 15.99, category: "Bills", date: "Yesterday", type: "expense" },
  { id: 5, description: "Whole Foods Market", amount: 67.30, category: "Food", date: "Mar 31", type: "expense" },
  { id: 6, description: "Metro Monthly Pass", amount: 120.00, category: "Transport", date: "Mar 30", type: "expense" },
  { id: 7, description: "Nike Store", amount: 189.00, category: "Shopping", date: "Mar 29", type: "expense" },
  { id: 8, description: "Electric Bill", amount: 94.50, category: "Bills", date: "Mar 28", type: "expense" },
];

const categoryIcons: Record<string, React.ElementType> = {
  Food: UtensilsCrossed,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Receipt,
};

const categoryColors: Record<string, string> = {
  Food: "bg-orange-500/10 text-orange-500",
  Transport: "bg-blue-500/10 text-blue-500",
  Shopping: "bg-pink-500/10 text-pink-500",
  Bills: "bg-emerald-500/10 text-emerald-500",
};

export function TransactionHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg font-semibold text-card-foreground">
          Recent Transactions
        </h3>
        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          {transactions.length} items
        </span>
      </div>

      <div className="space-y-1">
        {transactions.map((tx, i) => {
          const Icon = categoryIcons[tx.category] || Receipt;
          const colorClass = categoryColors[tx.category] || "bg-muted text-muted-foreground";
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary/50 group"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {tx.description}
                </p>
                <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {tx.type === "refund" ? (
                  <ArrowDownRight className="h-3.5 w-3.5 text-accent" />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5 text-destructive/60" />
                )}
                <span className={`text-sm font-semibold ${tx.type === "refund" ? "text-accent" : "text-card-foreground"}`}>
                  {tx.type === "refund" ? "+" : "-"}${tx.amount.toFixed(2)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
