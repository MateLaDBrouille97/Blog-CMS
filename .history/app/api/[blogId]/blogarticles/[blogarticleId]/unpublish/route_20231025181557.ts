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
    });

    if (!blogarticle) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedBlogArticle = await prismadb.blogarticle.update({
      where: {
        id: params.blogarticleId,
        userId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedBlogArticle);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}