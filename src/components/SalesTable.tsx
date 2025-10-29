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

const recentSales = [
  {
    id: "T-001234",
    date: "2024-12-15",
    product: "Laptop X1 Pro",
    category: "Eletrônicos",
    region: "Sudeste",
    quantity: 2,
    revenue: "R$ 8.400,00",
  },
  {
    id: "T-001235",
    date: "2024-12-15",
    product: "Mouse Óptico Pro",
    category: "Acessórios",
    region: "Sul",
    quantity: 15,
    revenue: "R$ 1.125,00",
  },
  {
    id: "T-001236",
    date: "2024-12-14",
    product: "Monitor 4K Ultra",
    category: "Periféricos",
    region: "Nordeste",
    quantity: 3,
    revenue: "R$ 5.997,00",
  },
  {
    id: "T-001237",
    date: "2024-12-14",
    product: "Teclado Mecânico RGB",
    category: "Periféricos",
    region: "Sudeste",
    quantity: 8,
    revenue: "R$ 2.392,00",
  },
  {
    id: "T-001238",
    date: "2024-12-13",
    product: "Webcam HD Pro",
    category: "Acessórios",
    region: "Centro-Oeste",
    quantity: 5,
    revenue: "R$ 1.495,00",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Eletrônicos":
      return "default";
    case "Acessórios":
      return "secondary";
    case "Periféricos":
      return "outline";
    default:
      return "default";
  }
};

export const SalesTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas Recentes</CardTitle>
        <CardDescription>Últimas transações registradas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Região</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead className="text-right">Receita</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-mono text-xs">{sale.id}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell className="font-medium">{sale.product}</TableCell>
                <TableCell>
                  <Badge variant={getCategoryColor(sale.category)}>{sale.category}</Badge>
                </TableCell>
                <TableCell>{sale.region}</TableCell>
                <TableCell className="text-right">{sale.quantity}</TableCell>
                <TableCell className="text-right font-medium">{sale.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
