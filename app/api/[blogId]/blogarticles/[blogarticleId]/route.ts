import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function DELETE(
  req: Request,
  { params }: { params: { blogarticleId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const Blogarticle = await prismadb.blogarticle.findUnique({
      where: {
        id: params.blogarticleId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!Blogarticle) {
      return new NextResponse("Not found", { status: 404 });
    }

    for (const chapter of Blogarticle.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedBlogarticle = await prismadb.blogarticle.delete({
      where: {
        id: params.blogarticleId,
      },
    });

    return NextResponse.json(deletedBlogarticle);
  } catch (error) {
    console.log("[BLOGARTICLE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { blogarticleId: string } }
) {
  try {
    const { userId } = auth();
    const { blogarticleId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const Blogarticle = await prismadb.blogarticle.update({
      where: {
        id: blogarticleId,
        userId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(Blogarticle);
  } catch (error) {
    console.log("[BLOGARTICLE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}