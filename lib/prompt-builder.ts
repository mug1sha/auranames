export function buildPrompt(category: string, description: string, style?: string): string {
  return `You are an elite naming strategist.

Generate 50 unique names.

Category:
${category}

Style:
${style || "Modern"}

Description:
${description}

Rules:
- Short
- Easy to pronounce
- Memorable
- One word preferred
- Brandable
- Avoid generic terms
- Avoid existing famous brands

Return JSON format strictly:
{
  "names": [
    {
      "name": "NameHere",
      "explanation": "Brief explanation of why it works"
    }
  ]
}
`;
}
