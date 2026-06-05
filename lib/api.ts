import { StandardName, RecommendedName } from "./types/name"

export async function generateNames(
  category: string,
  description: string
): Promise<{ curatedNames: StandardName[], recommendedNames: RecommendedName[] }> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, description, style: "modern" }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || "Failed to generate names. Check your server logs or API keys.")
  }

  if (!data || !data.success || !Array.isArray(data.curatedNames) || !Array.isArray(data.recommendedNames)) {
    throw new Error(data?.error || "Failed to parse names")
  }

  return {
    curatedNames: data.curatedNames,
    recommendedNames: data.recommendedNames
  }
}
