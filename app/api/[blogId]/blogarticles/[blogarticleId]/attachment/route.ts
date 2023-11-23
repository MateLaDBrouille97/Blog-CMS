import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { blogarticleId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const blogarticleOwner = await prismadb.blogarticle.findUnique({
      where: {
        id: params.blogarticleId,
        userId: userId,
      }
    });

    if (!blogarticleOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await prismadb.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        blogArticleId: params.blogarticleId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("BLOGARTICLE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}