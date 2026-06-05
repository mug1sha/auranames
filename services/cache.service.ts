import { redis } from "../lib/redis";

export class CacheService {
  private static CACHE_TTL_SECONDS = 24 * 60 * 60; // 24 hours

  static generateKey(category: string, description: string, style?: string): string {
    const rawKey = `${category.toLowerCase()}:${description.toLowerCase()}:${(style || "modern").toLowerCase()}`;
    // Simple hash to avoid extremely long keys
    let hash = 0;
    for (let i = 0; i < rawKey.length; i++) {
      const char = rawKey.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return `auranames:cache:${hash}`;
  }

  static async get<T>(key: string): Promise<T | null> {
    if (!redis) return null;
    try {
      return await redis.get<T>(key);
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  }

  static async set(key: string, data: any): Promise<void> {
    if (!redis) return;
    try {
      await redis.set(key, data, { ex: this.CACHE_TTL_SECONDS });
    } catch (error) {
      console.error("Redis set error:", error);
    }
  }
}
