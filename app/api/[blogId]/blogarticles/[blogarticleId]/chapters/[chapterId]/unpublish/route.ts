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

    const ownCourse = await prismadb.blogarticle.findUnique({
      where: {
        id: params.blogarticleId,
        userId
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedChapter = await prismadb.chapter.update({
      where: {
        id: params.chapterId,
        blogarticleId: params.blogarticleId,
      },
      data: {
        isPublished: false,
      }
    });

    const publishedChaptersInCourse = await prismadb.chapter.findMany({
      where: {
        blogarticleId: params.blogarticleId,
        isPublished: true,
      }
    });

    if (!publishedChaptersInCourse.length) {
      await prismadb.blogarticle.update({
        where: {
          id: params.blogarticleId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}