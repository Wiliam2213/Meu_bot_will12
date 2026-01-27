import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, Package, Target } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}K`;
  }
  return `R$ ${value.toFixed(0)}`;
};

export const StatsCards = () => {
  const { salesData } = useData();

  const stats = salesData.length > 0 
    ? [
        {
          title: "Receita Total",
          value: formatCurrency(salesData.reduce((acc, item) => acc + (item.Receita_Total || 0), 0)),
          change: "+12.5%",
          icon: DollarSign,
          positive: true,
          color: "from-primary/20 to-primary/5",
          iconColor: "text-primary",
        },
        {
          title: "Total de Vendas",
          value: salesData.reduce((acc, item) => acc + (item.Quantidade || 0), 0).toLocaleString('pt-BR'),
          change: "+8.2%",
          icon: ShoppingCart,
          positive: true,
          color: "from-accent/20 to-accent/5",
          iconColor: "text-accent",
        },
        {
          title: "Produtos",
          value: new Set(salesData.map(item => item.Produto)).size.toString(),
          change: "+3.1%",
          icon: Package,
          positive: true,
          color: "from-chart-3/20 to-chart-3/5",
          iconColor: "text-chart-3",
        },
        {
          title: "Ticket Médio",
          value: formatCurrency(salesData.reduce((acc, item) => acc + (item.Receita_Total || 0), 0) / salesData.length),
          change: "+4.8%",
          icon: Target,
          positive: true,
          color: "from-chart-4/20 to-chart-4/5",
          iconColor: "text-chart-4",
        },
      ]
    : [
        {
          title: "Receita Total",
          value: "R$ 2.18M",
          change: "+12.5%",
          icon: DollarSign,
          positive: true,
          color: "from-primary/20 to-primary/5",
          iconColor: "text-primary",
        },
        {
          title: "Total de Vendas",
          value: "5.195",
          change: "+8.2%",
          icon: ShoppingCart,
          positive: true,
          color: "from-accent/20 to-accent/5",
          iconColor: "text-accent",
        },
        {
          title: "Produtos Ativos",
          value: "247",
          change: "+3.1%",
          icon: Package,
          positive: true,
          color: "from-chart-3/20 to-chart-3/5",
          iconColor: "text-chart-3",
        },
        {
          title: "Ticket Médio",
          value: "R$ 421",
          change: "+4.8%",
          icon: Target,
          positive: true,
          color: "from-chart-4/20 to-chart-4/5",
          iconColor: "text-chart-4",
        },
      ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.positive ? TrendingUp : TrendingDown;
        
        return (
          <Card 
            key={index} 
            className={cn(
              "relative overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group"
            )}
          >
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-80 transition-opacity",
              stat.color
            )} />
            
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center bg-background/80 shadow-sm",
                stat.iconColor
              )}>
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="text-2xl font-bold text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className={cn(
                "flex items-center gap-1 mt-2 text-xs font-medium",
                stat.positive ? "text-accent" : "text-destructive"
              )}>
                <TrendIcon className="h-3 w-3" />
                <span>{stat.change}</span>
                <span className="text-muted-foreground font-normal">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
