import { NextRequest, NextResponse } from "next/server";
import { generateSchema } from "../../../validators/generate.schema";
import { GenerationService } from "../../../services/generation.service";
import { CacheService } from "../../../services/cache.service";
import { prisma } from "../../../lib/prisma";

/**
 * Handle POST requests to generate names: validate the request, return cached results when available,
 * invoke AI generation on cache miss, enqueue anonymous analytics persistence, and respond with the generated names.
 *
 * @returns A JSON HTTP response. On success: an object with `success: true` and the generated name lists (`curatedNames`, `recommendedNames`, etc.). On validation failure: `success: false`, `error`, and `details` describing validation errors. On other failures: `success: false` and an `error` message.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validation
    const validationResult = generateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid request format", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { category, description, style } = validationResult.data;

    // 2. Check Cache
    const cacheKey = CacheService.generateKey(category, description, style);
    const cachedResults = await CacheService.get<any[]>(cacheKey);
    
    let namesToReturn;

    if (cachedResults && cachedResults !== null && typeof cachedResults === 'object' && 'curatedNames' in cachedResults) {
      namesToReturn = cachedResults;
      // In a real production app with high load, we might not track every cache hit 
      // or we'd do it asynchronously. For now, just return.
    } else {
      // 3. Generate via AI
      namesToReturn = await GenerationService.generateNames(category, description, style);
      
      // 4. Set Cache
      if (namesToReturn && namesToReturn.curatedNames.length > 0) {
        await CacheService.set(cacheKey, namesToReturn);
      }
    }

    // 5. Store Analytics/Generations asynchronously (don't await to keep response fast)
    // To identify the user, we'd normally check the session here. 
    // For now, storing anonymously as per schema optional userId.
    Promise.resolve().then(async () => {
      try {
        const generation = await prisma.generation.create({
          data: {
            category,
            description,
            style: style || null,
          }
        });

        // Store generated names in DB (combining curated and recommended for analytics)
        if (namesToReturn) {
          const allNamesToStore = [
            ...namesToReturn.curatedNames.map((n: any) => ({ name: n.name, score: 80, explanation: n.meaning || null })),
            ...namesToReturn.recommendedNames.map((n: any) => ({ name: n.name, score: 100, explanation: n.definition }))
          ];
          
          await prisma.generatedName.createMany({
            data: allNamesToStore.map((n: any) => ({
              generationId: generation.id,
              name: n.name,
              score: n.score,
              explanation: n.explanation,
            }))
          });
        }
      } catch (dbError) {
        console.error("Database analytics error:", dbError);
      }
    });

    // 6. Return response
    return NextResponse.json({
      success: true,
      ...namesToReturn,
    });

  } catch (error: any) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
