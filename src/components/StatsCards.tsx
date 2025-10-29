import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ShoppingCart, DollarSign, Package } from "lucide-react";

const stats = [
  {
    title: "Receita Total",
    value: "R$ 2.187.000",
    change: "+12.5%",
    icon: DollarSign,
    positive: true,
  },
  {
    title: "Vendas Totais",
    value: "5.195",
    change: "+8.2%",
    icon: ShoppingCart,
    positive: true,
  },
  {
    title: "Produtos Ativos",
    value: "247",
    change: "+3.1%",
    icon: Package,
    positive: true,
  },
  {
    title: "Ticket Médio",
    value: "R$ 421",
    change: "+4.8%",
    icon: TrendingUp,
    positive: true,
  },
];

export const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className={`text-xs ${stat.positive ? 'text-accent' : 'text-destructive'} flex items-center gap-1 mt-1`}>
                <TrendingUp className="h-3 w-3" />
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
