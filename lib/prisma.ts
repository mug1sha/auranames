import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const getPrisma = () => {
  if (!globalForPrisma.prisma) {
    // For Prisma 7, if the URL is in prisma.config.ts, we should be able to just call new PrismaClient()
    // However, static analysis in Next.js 15 is failing.
    // We pass it explicitly here to be safe.
    globalForPrisma.prisma = new PrismaClient({
      // @ts-ignore - Bypass constructor validation during build time
      datasourceUrl: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy"
    });
  }
  return globalForPrisma.prisma;
};

// Also export a prisma proxy to avoid refactoring all files
export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop, receiver) => {
    return Reflect.get(getPrisma(), prop, receiver);
  }
});
