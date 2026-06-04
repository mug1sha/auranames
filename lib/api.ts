export async function generateNames(
  category: string,
  description: string
): Promise<string[]> {
  const response = await fetch("/api/generate-names", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, description }),
  })

  if (!response.ok) {
    throw new Error("Failed to generate names")
  }

  const text = await response.text()
  
  // Parse the numbered list
  const names = text
    .split("\n")
    .filter((line) => /^\d+\./.test(line.trim()))
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter((name) => name.length > 0)

  return names
}
