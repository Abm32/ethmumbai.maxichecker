
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMaxiProfile(score: number, answers: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User scored ${score}/10000 in an ETHMumbai loyalty quiz. Topics included: ${answers.join(", ")}. 
      Generate a highly creative, futuristic Web3 title and a one-sentence vibe-check description. 
      The description should mention 'Mumbai' or 'vada pav' or 'local trains' mixed with 'Ethereum' or 'degen' terminology.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { 
              type: Type.STRING,
              description: "A cool title like 'Mumbai Mainnet Maverick' or 'Vada Pav Validator'"
            },
            description: { 
              type: Type.STRING,
              description: "A punchy one-liner combining Mumbai culture and Web3"
            }
          },
          required: ["title", "description"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini AI error:", error);
    // Fallback logic for high/medium/low scores
    if (score > 8000) return { title: "GIGA CHAD VALIDATOR", description: "Your nodes run faster than a Virar local. Pure Mumbai mainnet energy." };
    if (score > 5000) return { title: "BANDRA BUILDER", description: "Shipping code from a cafe while waiting for the next bull run. WAGMI." };
    return { title: "TESTNET TOURIST", description: "Just landed at CST. Time to start your journey into the Mumbai ecosystem." };
  }
}
