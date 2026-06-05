import { getGroq } from "../lib/groq";
import { buildPrompt } from "../lib/prompt-builder";
import { FilterService } from "./filter.service";
import { ScoringService } from "./scoring.service";
import { GeneratedNameResult, ScoredName } from "../types/name";

export class GenerationService {
  static async generateNames(category: string, description: string, style?: string): Promise<ScoredName[]> {
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

    let parsed: { names: GeneratedNameResult[] };
    try {
      parsed = JSON.parse(content);
      if (!Array.isArray(parsed.names)) {
        throw new Error("Invalid format: names is not an array");
      }
    } catch (error) {
      console.error("Failed to parse JSON:", content);
      throw new Error("Failed to parse AI response");
    }

    // 1. Filtering
    const filteredNames = FilterService.filterNames(parsed.names);

    // 2. Scoring
    const scoredNames = ScoringService.scoreNames(filteredNames);

    // 3. Keep top results (e.g. top 20 to ensure high quality)
    return scoredNames.slice(0, 20);
  }
}
