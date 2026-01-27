import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileSpreadsheet, Trash2, CheckCircle2, FileUp } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export const SpreadsheetUpload = () => {
  const { salesData, addSalesData, clearSalesData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState(0);

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        if (header === 'Quantidade') {
          row[header] = parseInt(value) || 0;
        } else if (header === 'Preco_Unitario' || header === 'Receita_Total') {
          row[header] = parseFloat(value) || 0;
        } else {
          row[header] = value;
        }
      });
      
      return row;
    });
    
    return data;
  };

  const processFile = async (file: File) => {
    setIsLoading(true);
    setProgress(0);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 20, 90));
      }, 100);

      const text = await file.text();
      const parsedData = parseCSV(text);
      
      clearInterval(interval);
      setProgress(100);
      
      addSalesData(parsedData);
      
      toast({
        title: "✅ Planilha importada!",
        description: `${parsedData.length} registros adicionados com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      toast({
        title: "Erro ao importar",
        description: "Não foi possível processar o arquivo. Verifique o formato.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processFile(file);
    event.target.value = '';
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      await processFile(file);
    } else {
      toast({
        title: "Formato inválido",
        description: "Por favor, envie apenas arquivos CSV.",
        variant: "destructive",
      });
    }
  }, []);

  const handleClearData = () => {
    clearSalesData();
    toast({
      title: "Dados limpos",
      description: "Todos os dados das planilhas foram removidos.",
    });
  };

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-card to-muted/30 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-sm">
              <FileSpreadsheet className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Dados Importados</h3>
              <p className="text-xs text-muted-foreground">
                {salesData.length > 0 
                  ? `${salesData.length} registros carregados`
                  : "Importe seus dados CSV"}
              </p>
            </div>
          </div>
          {salesData.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearData}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status */}
        {salesData.length > 0 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">
              Dados prontos para análise
            </span>
          </div>
        )}

        {/* Drop Zone */}
        <label
          htmlFor="file-upload"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
            isDragOver 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-border/50 hover:border-primary/50 hover:bg-muted/30",
            isLoading && "pointer-events-none opacity-60"
          )}
        >
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isLoading}
          />
          
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all",
            isDragOver 
              ? "bg-primary/20 text-primary" 
              : "bg-muted text-muted-foreground"
          )}>
            <FileUp className="w-6 h-6" />
          </div>
          
          <p className="text-sm font-medium text-foreground mb-1">
            {isDragOver ? "Solte o arquivo aqui" : "Arraste ou clique para importar"}
          </p>
          <p className="text-xs text-muted-foreground">
            Apenas arquivos CSV
          </p>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-xl">
              <div className="w-3/4 space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">
                  Processando...
                </p>
              </div>
            </div>
          )}
        </label>

        <p className="text-xs text-muted-foreground text-center">
          Formato: Data, ID_Transacao, Produto, Categoria, Regiao, Quantidade, Preco_Unitario, Receita_Total
        </p>
      </div>
    </Card>
  );
};
