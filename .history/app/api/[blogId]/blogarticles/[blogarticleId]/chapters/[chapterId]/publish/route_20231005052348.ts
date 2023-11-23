import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { blogarticleId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownArticle = await prismadb.blogarticle.findUnique({
      where: {
        id: params.blogarticleId,
        userId
      }
    });

    if (!ownArticle) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await prismadb.chapter.findUnique({
      where: {
        id: params.chapterId,
        blogarticleId: params.blogarticleId,
      }
    });

    const muxData = await prismadb.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      }
    });

    if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedChapter = await prismadb.chapter.update({
      where: {
        id: params.chapterId,
        blogarticleId: params.blogarticleId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}