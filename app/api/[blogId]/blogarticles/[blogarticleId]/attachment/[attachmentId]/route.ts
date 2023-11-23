import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { blogarticleId: string, attachmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const blogarticleOwner = await prismadb.blogarticle.findUnique({
      where: {
        id: params.blogarticleId,
        userId: userId
      }
    });

    if (!blogarticleOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await prismadb.attachment.delete({
      where: {
        blogArticleId: params.blogarticleId,
        id: params.attachmentId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
