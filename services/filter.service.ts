import { GeneratedNameResult } from "../lib/types/name";

export class FilterService {
  static filterNames(names: GeneratedNameResult[]): GeneratedNameResult[] {
    const seen = new Set<string>();
    const filtered: GeneratedNameResult[] = [];

    // Common generic words to avoid entirely
    const genericTerms = ["tech", "solutions", "global", "group", "inc", "co", "app"];

    for (const item of names) {
      const lower = item.name.toLowerCase().trim();
      
      // 1. Check length
      if (lower.length < 3 || lower.length > 14) continue;
      
      // 2. Exact duplicates
      if (seen.has(lower)) continue;

      // 3. Generic terms
      const isGeneric = genericTerms.some(term => lower.includes(term));
      if (isGeneric) continue;

      // 4. Levenshtein check against already accepted names
      let isTooSimilar = false;
      for (const accepted of seen) {
        if (this.levenshtein(lower, accepted) <= 2) {
          isTooSimilar = true;
          break;
        }
      }

      if (!isTooSimilar) {
        seen.add(lower);
        filtered.push(item);
      }
    }

    return filtered;
  }

  // Levenshtein distance algorithm
  private static levenshtein(a: string, b: string): number {
    const matrix = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1,   // insertion
              matrix[i - 1][j] + 1    // deletion
            )
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }
}
