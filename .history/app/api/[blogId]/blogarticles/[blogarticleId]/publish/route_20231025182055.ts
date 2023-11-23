import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { blogarticleId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const blogarticle = await prismadb.blogarticle.findUnique({
      where: {
        id: params.blogarticleId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!blogarticle) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapter = blogarticle.chapters.some((chapter) => chapter.isPublished);

    if (!blogarticle.title || !blogarticle.description || !blogarticle.imageUrl || !blogarticle.categoryId || !hasPublishedChapter) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedBlogArticle = await prismadb.blogarticle.update({
      where: {
        id: params.blogarticleId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedBlogArticle);
  } catch (error) {
    console.log("[ARTICLE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}