import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, salesData } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY não está configurada');
    }

    // Construir contexto com dados das planilhas
    let contextPrompt = `Você é o assistente de análise de vendas da Alpha Insights. Você ajuda a analisar dados de vendas, identificar tendências e responder perguntas sobre o desempenho mensal.`;
    
    if (salesData && salesData.length > 0) {
      contextPrompt += `\n\nDados de vendas disponíveis:\n${JSON.stringify(salesData, null, 2)}`;
      contextPrompt += `\n\nUse esses dados para fornecer análises precisas e insights baseados em dados reais. Quando o usuário fizer perguntas, consulte esses dados para dar respostas precisas.`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: contextPrompt }
              ]
            },
            ...messages.map((msg: any) => ({
              parts: [{ text: msg.content }],
              role: msg.role === 'user' ? 'user' : 'model'
            }))
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.candidates[0].content.parts[0].text;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
