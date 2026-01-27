import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const defaultSales = [
  {
    id: "T-001234",
    date: "2024-12-15",
    product: "Laptop X1 Pro",
    category: "Eletrônicos",
    region: "Sudeste",
    quantity: 2,
    revenue: 8400,
  },
  {
    id: "T-001235",
    date: "2024-12-15",
    product: "Mouse Óptico Pro",
    category: "Acessórios",
    region: "Sul",
    quantity: 15,
    revenue: 1125,
  },
  {
    id: "T-001236",
    date: "2024-12-14",
    product: "Monitor 4K Ultra",
    category: "Periféricos",
    region: "Nordeste",
    quantity: 3,
    revenue: 5997,
  },
  {
    id: "T-001237",
    date: "2024-12-14",
    product: "Teclado Mecânico RGB",
    category: "Periféricos",
    region: "Sudeste",
    quantity: 8,
    revenue: 2392,
  },
  {
    id: "T-001238",
    date: "2024-12-13",
    product: "Webcam HD Pro",
    category: "Acessórios",
    region: "Centro-Oeste",
    quantity: 5,
    revenue: 1495,
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    "Eletrônicos": "default",
    "Acessórios": "secondary",
    "Periféricos": "outline",
  };
  return colors[category] || "default";
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const SalesTable = () => {
  const { salesData } = useData();

  const displayData = salesData.length > 0 
    ? salesData.slice(-10).map((item, idx) => ({
        id: item.ID_Transacao || `T-${idx}`,
        date: item.Data,
        product: item.Produto,
        category: item.Categoria,
        region: item.Regiao,
        quantity: item.Quantidade,
        revenue: item.Receita_Total,
      }))
    : defaultSales;

  return (
    <Card className="overflow-hidden border-border/50 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-card to-muted/30 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Vendas Recentes</CardTitle>
            <CardDescription className="mt-1">
              {salesData.length > 0 
                ? `Mostrando ${displayData.length} de ${salesData.length} registros importados`
                : "Últimas transações registradas no sistema"}
            </CardDescription>
          </div>
          {salesData.length > 0 && (
            <Badge variant="secondary" className="font-mono">
              {salesData.length} registros
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow className="hover:bg-transparent border-b border-border/50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Data</TableHead>
                <TableHead className="font-semibold">Produto</TableHead>
                <TableHead className="font-semibold">Categoria</TableHead>
                <TableHead className="font-semibold">Região</TableHead>
                <TableHead className="text-right font-semibold">Qtd</TableHead>
                <TableHead className="text-right font-semibold">Receita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((sale, index) => (
                <TableRow 
                  key={sale.id + index} 
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {sale.id}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(sale.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="font-medium group-hover:text-primary transition-colors">
                    {sale.product}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getCategoryColor(sale.category)}
                      className="font-normal"
                    >
                      {sale.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{sale.region}</TableCell>
                  <TableCell className="text-right tabular-nums">{sale.quantity}</TableCell>
                  <TableCell className="text-right font-semibold text-primary tabular-nums">
                    {formatCurrency(sale.revenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
