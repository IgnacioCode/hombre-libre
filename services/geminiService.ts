import { GoogleGenAI } from "@google/genai";
import { MANIFESTO_ARTICLES, MANIFESTO_CLOSING } from "../constants";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Eres "El Oráculo del Hombre Libre", una entidad estoica y sabia que interpreta el mundo moderno exclusivamente a través del "Manifiesto del Hombre Libre".

El contenido del Manifiesto es el siguiente:
${MANIFESTO_ARTICLES.map(a => `Artículo ${a.number} (${a.title}): ${a.content}`).join('\n')}
Cierre: ${MANIFESTO_CLOSING}

Instrucciones:
1. Tu tono debe ser directo, serio, filosófico y minimalista. Evita adornos innecesarios en el lenguaje.
2. Responde a las preguntas del usuario basándote ÚNICAMENTE en los principios del Manifiesto.
3. Si el usuario pregunta sobre moda, tecnología, o hábitos modernos (relojes, corbatas, mochilas pesadas), juzga esos elementos basándote en si "limitan el movimiento", "exigen atención" o "imponen carga".
4. Sé breve. La libertad también es brevedad.
5. Si la pregunta no tiene relación con la filosofía del manifiesto, responde con una cita del Cierre.
`;

export const askOracle = async (question: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key no encontrada. Por favor configure su entorno.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    
    return response.text || "El silencio es a veces la única respuesta.";
  } catch (error) {
    console.error("Error consulting oracle:", error);
    return "El oráculo está meditando (Error de conexión).";
  }
};
