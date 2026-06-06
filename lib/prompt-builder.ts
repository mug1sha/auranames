export function buildPrompt(category: string, description: string, style?: string): string {
  return `You are an elite naming strategist.

Based on the user's input, generate exactly 10 curated names and 3 highly recommended names.

Category:
${category}

Style:
${style || "Modern"}

Description:
${description}

Rules:
- Short (preferably one word)
- Easy to pronounce
- Memorable and brandable
- Avoid generic terms
- Avoid existing famous brands
- EVERY curated name must include a short (max 10 words) "meaning" explaining the name's essence.
- The 3 recommended names MUST include a detailed, human-sounding "definition" (2-3 sentences) explaining the vibe, origin, or why the name perfectly fits the description.

Return JSON format strictly:
{
  "curatedNames": [
    { "name": "NameOne", "meaning": "A short, catchy essence description." },
    { "name": "NameTwo", "meaning": "Another brief description." }
  ],
  "recommendedNames": [
    { 
      "name": "TopPickOne", 
      "definition": "Derived from the Latin word for light, this name feels bright, energetic, and perfectly captures the essence of your vision." 
    }
  ]
}
`;
}
