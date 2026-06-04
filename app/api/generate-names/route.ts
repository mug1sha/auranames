import { streamText } from "ai"

export async function POST(req: Request) {
  const { category, description } = await req.json()

  const categoryLabels: Record<string, string> = {
    kids: "a child/baby",
    pets: "a pet",
    business: "a business/startup",
    product: "a product/brand",
  }

  const prompt = `You are a creative naming expert. Generate 10 unique, modern, and brandable names for ${categoryLabels[category] || "something"}. 

Context: ${description}

Requirements:
- Each name should be memorable and easy to pronounce
- Names should feel modern and sophisticated
- For businesses/products, ensure they could work as domain names
- For kids/pets, ensure they have pleasant sounds and meanings

Return ONLY a numbered list (1-10) with just the names. No explanations, no additional text, no descriptions. Just the names.

Example format:
1. NameOne
2. NameTwo
3. NameThree
...and so on`

  const result = streamText({
    model: "anthropic/claude-sonnet-4-20250514",
    prompt,
    maxTokens: 500,
  })

  return result.toTextStreamResponse()
}
