import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useData } from "@/contexts/DataContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const { salesData } = useData();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! 👋 Sou o assistente de análise de vendas da Alpha Insights. Posso ajudá-lo a analisar dados de vendas, identificar tendências e responder perguntas sobre o desempenho mensal. Como posso ajudar?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content
            })),
            salesData: salesData
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao comunicar com o assistente');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta do assistente. Tente novamente.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Qual foi o produto mais vendido?",
    "Qual região tem melhor desempenho?",
    "Resumo de vendas do mês",
  ];

  return (
    <Card className="flex flex-col h-full border-border/50 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              Assistente IA
              <Sparkles className="w-4 h-4 text-primary" />
            </h3>
            <p className="text-xs text-muted-foreground">
              {salesData.length > 0 
                ? `Analisando ${salesData.length} registros` 
                : "Pronto para ajudar"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted/80 text-foreground rounded-bl-md"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start animate-in fade-in-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-sm">
                <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
              </div>
              <div className="bg-muted/80 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length === 1 && !isLoading && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Sugestões:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="text-xs h-7 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                onClick={() => {
                  setInput(q);
                }}
              >
                {q}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pergunte sobre vendas, produtos, regiões..."
            className="flex-1 rounded-xl border-border/50 focus-visible:ring-primary/30"
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()} 
            size="icon"
            className="rounded-xl bg-primary hover:bg-primary/90 shadow-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
