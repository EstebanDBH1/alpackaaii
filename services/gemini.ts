import { GoogleGenAI, Type } from "@google/genai";
import { PromptRequest, OptimizationResult } from "../types";

export const optimizePromptWithGemini = async (request: PromptRequest): Promise<OptimizationResult> => {
  // En entornos de frontend (Vercel/Vite), el bundler busca y reemplaza la cadena 'process.env.API_KEY'
  // por el valor real durante la compilación. Accedemos directamente dentro de un try-catch
  // para permitir este reemplazo sin que la falta del objeto global 'process' cause un error en tiempo de ejecución.
  let apiKey = '';
  try {
    apiKey = process.env.API_KEY;
  } catch (error) {
    console.warn("No se pudo acceder a process.env.API_KEY. Verifica la configuración de tu entorno.");
  }
  
  if (!apiKey) {
    throw new Error("API Key no encontrada. Asegúrate de que la variable 'API_KEY' esté configurada en tu proyecto de Vercel y expuesta al cliente.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelId = 'gemini-2.5-flash-lite';

  const systemInstruction = `
    Eres 'PromptMaster', un experto Ingeniero de Prompts de nivel mundial que habla ESPAÑOL nativo.
    Tu función es doble:
    1. **CREADOR**: Si el usuario da una idea vaga (ej. "receta de pastel"), crea un prompt profesional y detallado desde cero para esa tarea.
    2. **OPTIMIZADOR**: Si el usuario da un prompt existente, refínalo usando técnicas avanzadas (Chain-of-Thought, Few-Shot, Delimitadores, Persona).

    **Directrices:**
    - Identifica la intención central (Core Intent).
    - Agrega restricciones claras y formatos de salida.
    - Usa un tono ${request.tone} y un nivel de detalle ${request.complexity}.
    - Optimiza pensando en que será usado en el modelo: ${request.targetModel}.

    **IDIOMA DE SALIDA:**
    - La propiedad 'explanation' debe estar estrictamente en ESPAÑOL.
    - La propiedad 'optimizedPrompt' debe estar en ESPAÑOL, a menos que la solicitud original del usuario implique explícitamente generar contenido en otro idioma (ej. "Write a poem in English"). En ese caso, las instrucciones del prompt pueden ser en español o inglés según sea mejor para el modelo, pero la explicación siempre en español.

    **Salida:**
    Devuelve SIEMPRE un JSON válido.
  `;

  const userPrompt = `
    Entrada del usuario: "${request.originalPrompt}"

    Por favor, analiza si esto es una idea simple o un borrador de prompt.
    - Si es una idea: Crea un SUPER PROMPT completo para ella.
    - Si es un prompt: Optimízalo al máximo nivel.

    Configuración:
    - Tono: ${request.tone}
    - Complejidad: ${request.complexity}
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimizedPrompt: {
              type: Type.STRING,
              description: "El prompt final optimizado. Incluye marcadores de posición [CORCHETES] donde el usuario deba poner sus datos.",
            },
            explanation: {
              type: Type.STRING,
              description: "Explicación detallada en Español sobre las mejoras aplicadas (ej. 'Se añadió una persona experta', 'Se estructuró en pasos').",
            }
          },
          required: ["optimizedPrompt", "explanation"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from Gemini");

    const parsed = JSON.parse(jsonText);

    return {
      original: request.originalPrompt,
      optimized: parsed.optimizedPrompt,
      explanation: parsed.explanation,
      timestamp: Date.now()
    };

  } catch (error) {
    console.error("Error optimizing prompt:", error);
    // Mejorar el mensaje de error para el usuario
    if (error instanceof Error && error.message.includes("API Key")) {
        throw error;
    }
    throw new Error("Falló la generación del prompt. Verifica tu API Key o intenta de nuevo.");
  }
};