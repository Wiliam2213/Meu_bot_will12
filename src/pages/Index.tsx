import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { SalesChart } from "@/components/SalesChart";
import { StatsCards } from "@/components/StatsCards";
import { SalesTable } from "@/components/SalesTable";
import { SpreadsheetUpload } from "@/components/SpreadsheetUpload";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AppSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 space-y-6">
          {/* Page Header */}
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {activeSection === "dashboard" && "Dashboard"}
              {activeSection === "analytics" && "Análises"}
              {activeSection === "charts" && "Gráficos"}
              {activeSection === "data" && "Dados"}
              {activeSection === "import" && "Importar Dados"}
              {activeSection === "spreadsheets" && "Planilhas"}
              {activeSection === "chat" && "Chat IA"}
            </h1>
            <p className="text-muted-foreground">
              {activeSection === "dashboard" && "Visão geral do desempenho de vendas"}
              {activeSection === "analytics" && "Análise detalhada de métricas"}
              {activeSection === "charts" && "Visualização gráfica de dados"}
              {activeSection === "data" && "Explore seus dados de vendas"}
              {activeSection === "import" && "Importe planilhas CSV para análise"}
              {activeSection === "spreadsheets" && "Gerencie suas planilhas importadas"}
              {activeSection === "chat" && "Converse com a IA sobre seus dados"}
            </p>
          </header>

          {/* Content based on active section */}
          <div className={cn(
            "grid gap-6",
            (activeSection === "dashboard" || activeSection === "analytics") && "lg:grid-cols-3"
          )}>
            {/* Dashboard View */}
            {(activeSection === "dashboard" || activeSection === "analytics") && (
              <>
                <div className="lg:col-span-2 space-y-6">
                  <StatsCards />
                  <SalesChart />
                  <SalesTable />
                </div>
                <div className="lg:col-span-1 space-y-6">
                  <SpreadsheetUpload />
                  <div className="h-[600px]">
                    <ChatInterface />
                  </div>
                </div>
              </>
            )}

            {/* Charts View */}
            {activeSection === "charts" && (
              <div className="col-span-full space-y-6">
                <SalesChart />
                <StatsCards />
              </div>
            )}

            {/* Data View */}
            {activeSection === "data" && (
              <div className="col-span-full space-y-6">
                <StatsCards />
                <SalesTable />
              </div>
            )}

            {/* Import View */}
            {(activeSection === "import" || activeSection === "spreadsheets") && (
              <div className="col-span-full max-w-2xl space-y-6">
                <SpreadsheetUpload />
                <SalesTable />
              </div>
            )}

            {/* Chat View */}
            {activeSection === "chat" && (
              <div className="col-span-full grid gap-6 lg:grid-cols-2">
                <div className="h-[700px]">
                  <ChatInterface />
                </div>
                <div className="space-y-6">
                  <SpreadsheetUpload />
                  <StatsCards />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
