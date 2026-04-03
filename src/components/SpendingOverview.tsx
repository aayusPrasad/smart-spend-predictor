import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Food", spent: 420, budget: 500, fill: "hsl(25, 95%, 53%)" },
  { name: "Transport", spent: 180, budget: 200, fill: "hsl(217, 91%, 60%)" },
  { name: "Shopping", spent: 650, budget: 400, fill: "hsl(330, 80%, 60%)" },
  { name: "Bills", spent: 310, budget: 500, fill: "hsl(152, 69%, 40%)" },
];

const totalSpent = data.reduce((s, d) => s + d.spent, 0);
const totalBudget = data.reduce((s, d) => s + d.budget, 0);

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const pct = Math.round((d.spent / d.budget) * 100);
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-elevated text-xs">
      <p className="font-semibold text-card-foreground">{d.name}</p>
      <p className="text-muted-foreground">
        ${d.spent} / ${d.budget} ({pct}%)
      </p>
    </div>
  );
};

export function SpendingOverview() {
  const pctUsed = Math.round((totalSpent / totalBudget) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-lg font-semibold text-card-foreground">
          Spending Overview
        </h3>
        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          This month
        </span>
      </div>

      {/* Summary row */}
      <div className="flex items-end gap-1 mb-5">
        <span className="font-display text-2xl font-bold text-card-foreground">
          ${totalSpent.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground mb-0.5">
          / ${totalBudget.toLocaleString()}
        </span>
        <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full mb-0.5 ${pctUsed > 90 ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"}`}>
          {pctUsed}% used
        </span>
      </div>

      {/* Chart */}
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="25%">
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="budget" radius={[6, 6, 6, 6]} fill="hsl(var(--secondary))" />
            <Bar dataKey="spent" radius={[6, 6, 6, 6]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-secondary" />
          Budget
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
          Spent
        </div>
      </div>
    </motion.div>
  );
}
