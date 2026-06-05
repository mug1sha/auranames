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

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || "Failed to generate names. Check your server logs or API keys.")
  }

  if (!data || !data.success || !Array.isArray(data.names)) {
    throw new Error(data?.error || "Failed to parse names")
  }

  // Extract just the name strings from the ScoredName objects
  const names = data.names.map((n: any) => n.name)

  return names
}
