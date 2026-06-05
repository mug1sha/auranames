import { Redis } from "@upstash/redis";

let redisInstance: Redis | null = null;

const getRedis = (): Redis | null => {
  if (redisInstance) return redisInstance;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Crucial: Only initialize if URL is valid and starts with https
  if (!url || !token || !url.startsWith("https://")) {
    return null;
  }

  try {
    redisInstance = new Redis({
      url,
      token,
    });
    return redisInstance;
  } catch (e) {
    console.error("Failed to initialize Redis:", e);
    return null;
  }
};

// Transparent proxy that only delegates to Redis if it's initialized
export const redis = new Proxy({} as Redis, {
  get: (target, prop) => {
    const instance = getRedis();
    if (!instance) {
      return () => null; // Safe no-op for any method call
    }
    
    const value = (instance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
});
