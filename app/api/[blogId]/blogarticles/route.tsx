import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const article = await prismadb.blogarticle.create({
      data: {
        userId,
        title,
      }
    });

    return NextResponse.json(article);
  } catch (error) {
    console.log("[ARTICLES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}