import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

const favoriteSchema = z.object({
  userId: z.string().uuid(), // Normally from auth session
  generatedNameId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const val = favoriteSchema.safeParse(body);
    if (!val.success) {
      return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
    }

    const { userId, generatedNameId } = val.data;

    // Check if name exists
    const nameRecord = await prisma.generatedName.findUnique({
      where: { id: generatedNameId }
    });

    if (!nameRecord) {
      return NextResponse.json({ success: false, error: "Name not found" }, { status: 404 });
    }

    // Upsert or create
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        generatedNameId,
      }
    });

    // Increment favorite count asynchronously
    Promise.resolve().then(async () => {
      await prisma.generatedName.update({
        where: { id: generatedNameId },
        data: { favoriteCount: { increment: 1 } }
      });
    });

    return NextResponse.json({ success: true, favorite });
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === 'P2002') {
       return NextResponse.json({ success: false, error: "Already favorited" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Normally user ID from auth context
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        generatedName: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Favorite ID

  if (!id) {
    return NextResponse.json({ success: false, error: "Missing favorite id" }, { status: 400 });
  }

  try {
    await prisma.favorite.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
