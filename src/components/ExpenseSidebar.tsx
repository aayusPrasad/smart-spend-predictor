import { UtensilsCrossed, Car, ShoppingBag, Receipt, TrendingUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const categories = [
  { title: "Food", icon: UtensilsCrossed, spent: 420, budget: 500, color: "text-orange-400" },
  { title: "Transport", icon: Car, spent: 180, budget: 200, color: "text-blue-400" },
  { title: "Shopping", icon: ShoppingBag, spent: 650, budget: 400, color: "text-pink-400" },
  { title: "Bills", icon: Receipt, spent: 310, budget: 500, color: "text-emerald-400" },
];

export function ExpenseSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display text-sm font-semibold text-sidebar-foreground">
              ExpenseAI
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/50">
            Monthly Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((cat) => {
                const pct = Math.round((cat.spent / cat.budget) * 100);
                const over = cat.spent > cat.budget;
                return (
                  <SidebarMenuItem key={cat.title}>
                    <SidebarMenuButton className="h-auto py-3 hover:bg-sidebar-accent">
                      <div className="flex w-full items-center gap-3">
                        <cat.icon className={`h-4 w-4 shrink-0 ${cat.color}`} />
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-sidebar-foreground">
                                {cat.title}
                              </span>
                              <span className={`text-xs font-medium ${over ? "text-destructive" : "text-sidebar-foreground/60"}`}>
                                ${cat.spent}
                              </span>
                            </div>
                            <div className="mt-1.5 h-1 w-full rounded-full bg-sidebar-muted">
                              <div
                                className={`h-full rounded-full transition-all ${over ? "bg-destructive" : "bg-primary"}`}
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                            <div className="mt-1 flex justify-between">
                              <span className="text-[10px] text-sidebar-foreground/40">
                                {pct}% used
                              </span>
                              <span className="text-[10px] text-sidebar-foreground/40">
                                ${cat.budget}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
