import { GeneratedNameResult, ScoredName } from "../types/name";

export class ScoringService {
  static scoreNames(names: GeneratedNameResult[]): ScoredName[] {
    return names.map((item) => {
      const score = this.calculateScore(item.name);
      return {
        ...item,
        score,
      };
    }).sort((a, b) => b.score - a.score);
  }

  private static calculateScore(name: string): number {
    let score = 0;
    
    // 1. Length (0-25)
    // Ideal length is 4-8 characters
    const len = name.length;
    if (len >= 4 && len <= 8) score += 25;
    else if (len === 3 || len === 9) score += 20;
    else if (len === 10) score += 15;
    else if (len > 10 && len <= 14) score += 10;
    else score += 5;

    // 2. Pronounceability (0-25)
    // Very simple heuristic: vowel to consonant ratio and alternating patterns
    score += this.scorePronounceability(name);

    // 3. Memorability (0-25)
    // Avoid double letters, prefer strong consonants (x, z, v, q, k)
    score += this.scoreMemorability(name);

    // 4. Brandability (0-25)
    // Suffixes that are brandable like -a, -o, -ix, -ex
    score += this.scoreBrandability(name);

    // Cap at 100
    return Math.min(100, Math.max(0, score));
  }

  private static scorePronounceability(name: string): number {
    const vowels = name.match(/[aeiouy]/gi);
    const consonants = name.match(/[^aeiouy]/gi);
    
    if (!vowels || !consonants) return 5;
    
    const ratio = vowels.length / consonants.length;
    if (ratio >= 0.5 && ratio <= 1.5) return 25;
    if (ratio >= 0.3 && ratio <= 2.0) return 15;
    return 10;
  }

  private static scoreMemorability(name: string): number {
    const lower = name.toLowerCase();
    let score = 15;
    
    // Bonus for strong unique characters
    if (/[xzvkq]/i.test(name)) score += 10;
    
    // Penalty for 3 identical letters in a row
    if (/(.)\1\1/.test(lower)) score -= 15;
    
    return Math.min(25, Math.max(0, score));
  }

  private static scoreBrandability(name: string): number {
    const lower = name.toLowerCase();
    let score = 10;
    
    // Good endings
    if (lower.endsWith('a') || lower.endsWith('o') || lower.endsWith('i')) score += 15;
    else if (lower.endsWith('ex') || lower.endsWith('ix') || lower.endsWith('ly')) score += 10;
    
    // Penalty for numbers
    if (/[0-9]/.test(name)) score -= 10;
    
    return Math.min(25, Math.max(0, score));
  }
}
