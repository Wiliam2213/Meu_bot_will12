import { useState } from "react";
import {
  BarChart3,
  FileSpreadsheet,
  MessageSquare,
  Settings,
  TrendingUp,
  Upload,
  Database,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const mainNavItems: NavItem[] = [
  { icon: BarChart3, label: "Dashboard", id: "dashboard" },
  { icon: TrendingUp, label: "Análises", id: "analytics" },
  { icon: PieChart, label: "Gráficos", id: "charts" },
  { icon: Database, label: "Dados", id: "data" },
];

const toolsNavItems: NavItem[] = [
  { icon: Upload, label: "Importar", id: "import" },
  { icon: FileSpreadsheet, label: "Planilhas", id: "spreadsheets" },
  { icon: MessageSquare, label: "Chat IA", id: "chat" },
];

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AppSidebar = ({ activeSection, onSectionChange }: AppSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const NavButton = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;

    const button = (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 transition-all duration-200",
          collapsed ? "justify-center px-2" : "px-3",
          isActive && "bg-primary/10 text-primary border-l-2 border-primary rounded-l-none"
        )}
        onClick={() => onSectionChange(item.id)}
      >
        <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
        {!collapsed && (
          <span className={cn("truncate", isActive && "font-medium")}>
            {item.label}
          </span>
        )}
      </Button>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "h-screen bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center gap-3 p-4 border-b border-border",
          collapsed && "justify-center"
        )}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                Alpha Insights
              </h1>
              <p className="text-xs text-muted-foreground">
                Analytics Dashboard
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <div className="space-y-6 px-3">
            {/* Main Section */}
            <div className="space-y-1">
              {!collapsed && (
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                  Principal
                </p>
              )}
              {mainNavItems.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </div>

            <Separator className="mx-3" />

            {/* Tools Section */}
            <div className="space-y-1">
              {!collapsed && (
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                  Ferramentas
                </p>
              )}
              {toolsNavItems.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Configurações</TooltipContent>
              </Tooltip>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 ml-auto"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
};
