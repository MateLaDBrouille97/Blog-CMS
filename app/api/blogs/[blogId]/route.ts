import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";


export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
    }

    const blog = await prismadb.blog.updateMany({
      where: {
        id: params.blogId,
        userId,
      },
      data: {
        name
      }
    });
  
    return NextResponse.json(blog);
  } catch (error) {
    console.log('[BLOG_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
    }

    const blog = await prismadb.blog.deleteMany({
      where: {
        id: params.blogId,
        userId
      }
    });
  
    return NextResponse.json(blog);
  } catch (error) {
    console.log('[BLOG_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};