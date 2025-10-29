import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileSpreadsheet, Trash2 } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { toast } from "@/hooks/use-toast";

export const SpreadsheetUpload = () => {
  const { salesData, addSalesData, clearSalesData } = useData();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      addSalesData(parsedData);
      
      toast({
        title: "Planilha importada!",
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
      event.target.value = '';
    }
  };

  const handleClearData = () => {
    clearSalesData();
    toast({
      title: "Dados limpos",
      description: "Todos os dados das planilhas foram removidos.",
    });
  };

  return (
    <Card className="p-4 border-border bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-card-foreground">Dados Importados</h3>
        </div>
        {salesData.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearData}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div className="text-sm text-muted-foreground">
          {salesData.length > 0 ? (
            <p><strong>{salesData.length}</strong> registros carregados</p>
          ) : (
            <p>Nenhum dado importado ainda</p>
          )}
        </div>

        <label htmlFor="file-upload">
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isLoading}
          />
          <Button
            variant="outline"
            className="w-full"
            disabled={isLoading}
            asChild
          >
            <span>
              <Upload className="w-4 h-4 mr-2" />
              {isLoading ? 'Processando...' : 'Importar Planilha CSV'}
            </span>
          </Button>
        </label>

        <p className="text-xs text-muted-foreground">
          Formato esperado: Data, ID_Transacao, Produto, Categoria, Regiao, Quantidade, Preco_Unitario, Receita_Total
        </p>
      </div>
    </Card>
  );
};
