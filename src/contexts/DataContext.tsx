import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SalesDataRow {
  Data: string;
  ID_Transacao: string;
  Produto: string;
  Categoria: string;
  Regiao: string;
  Quantidade: number;
  Preco_Unitario: number;
  Receita_Total: number;
}

interface DataContextType {
  salesData: SalesDataRow[];
  addSalesData: (data: SalesDataRow[]) => void;
  clearSalesData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [salesData, setSalesData] = useState<SalesDataRow[]>(() => {
    const stored = localStorage.getItem('salesData');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('salesData', JSON.stringify(salesData));
  }, [salesData]);

  const addSalesData = (data: SalesDataRow[]) => {
    setSalesData(prev => [...prev, ...data]);
  };

  const clearSalesData = () => {
    setSalesData([]);
    localStorage.removeItem('salesData');
  };

  return (
    <DataContext.Provider value={{ salesData, addSalesData, clearSalesData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de DataProvider');
  }
  return context;
};
