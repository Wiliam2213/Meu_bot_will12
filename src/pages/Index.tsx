import { ChatInterface } from "@/components/ChatInterface";
import { SalesChart } from "@/components/SalesChart";
import { StatsCards } from "@/components/StatsCards";
import { SalesTable } from "@/components/SalesTable";
import { BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Alpha Insights</h1>
              <p className="text-sm text-muted-foreground">Dashboard Analítico de Vendas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <StatsCards />
            <SalesChart />
            <SalesTable />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 h-[calc(100vh-8rem)]">
              <ChatInterface />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
