import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { billboardBlogId, firstName, lastName, email, image } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!firstName) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!lastName) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardBlogId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!image) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
    }

    const blogByUserId = await prismadb.blog.findFirst({
      where: {
        id: params.blogId,
        userId,
      },
    });

    if (!blogByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const author = await prismadb.author.create({
      data: {
        firstName,
        lastName,
        email,
        image,
        billboardBlogId: billboardBlogId,
        blogId: params.blogId,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[AUTHOR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
    }

    const authors = await prismadb.author.findMany({
      where: {
        blogId: params.blogId,
      },
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.log("[AUTHOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
