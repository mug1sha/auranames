export async function generateNames(
  category: string,
  description: string
): Promise<string[]> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, description, style: "modern" }),
  })

  if (!response.ok) {
    throw new Error("Failed to generate names")
  }

  const data = await response.json()
  
  if (!data.success || !Array.isArray(data.names)) {
    throw new Error(data.error || "Failed to parse names")
  }

  // Extract just the name strings from the ScoredName objects
  const names = data.names.map((n: any) => n.name)

  return names
}
