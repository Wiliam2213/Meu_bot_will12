import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesData = [
  { month: "Jan", receita: 145000, quantidade: 320 },
  { month: "Fev", receita: 132000, quantidade: 298 },
  { month: "Mar", receita: 178000, quantidade: 412 },
  { month: "Abr", receita: 156000, quantidade: 365 },
  { month: "Mai", receita: 189000, quantidade: 445 },
  { month: "Jun", receita: 167000, quantidade: 387 },
  { month: "Jul", receita: 198000, quantidade: 478 },
  { month: "Ago", receita: 205000, quantidade: 501 },
  { month: "Set", receita: 176000, quantidade: 423 },
  { month: "Out", receita: 192000, quantidade: 456 },
  { month: "Nov", receita: 215000, quantidade: 523 },
  { month: "Dez", receita: 234000, quantidade: 587 },
];

export const SalesChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho de Vendas 2024</CardTitle>
        <CardDescription>Receita e quantidade de vendas por mês</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-muted-foreground" />
            <YAxis className="text-muted-foreground" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Legend />
            <Bar dataKey="receita" fill="hsl(var(--chart-1))" name="Receita (R$)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="quantidade" fill="hsl(var(--chart-2))" name="Quantidade" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
