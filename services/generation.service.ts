import { getGroq } from "../lib/groq";
import { buildPrompt } from "../lib/prompt-builder";
import { StandardName, RecommendedName } from "../lib/types/name";

export class GenerationService {
  static async generateNames(category: string, description: string, style?: string): Promise<{ curatedNames: StandardName[], recommendedNames: RecommendedName[] }> {
    const prompt = buildPrompt(category, description, style);
    const groq = getGroq();

    let completion;
    try {
      completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.8,
        response_format: { type: "json_object" },
      });
    } catch (error) {
      console.error("Groq API error:", error);
      throw new Error("Failed to generate names via AI");
    }

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from AI");
    }

    let parsed: { curatedNames: StandardName[], recommendedNames: RecommendedName[] };
    try {
      parsed = JSON.parse(content);
      if (!Array.isArray(parsed.curatedNames) || !Array.isArray(parsed.recommendedNames)) {
        throw new Error("Invalid format: curatedNames or recommendedNames is not an array");
      }
    } catch (error) {
      console.error("Failed to parse JSON:", content);
      throw new Error("Failed to parse AI response");
    }

    // Since we are explicitly asking for 10 and 3, we bypass the aggressive filtering 
    // to preserve the AI's intended curation.
    return {
      curatedNames: parsed.curatedNames.slice(0, 10),
      recommendedNames: parsed.recommendedNames.slice(0, 3)
    };
  }
}
