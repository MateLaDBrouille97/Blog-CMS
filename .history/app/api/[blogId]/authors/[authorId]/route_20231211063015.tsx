import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "../../../../../lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { authorId: string } }
) {
  try {
    if (!params.authorId) {
      return new NextResponse("Author id is required", { status: 400 });
    }

    const author = await prismadb.author.findUnique({
      where: {
        id: params.authorId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[AUTHOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { authorId: string; blogId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.authorId) {
      return new NextResponse("Author id is required", { status: 400 });
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

    const author = await prismadb.author.delete({
      where: {
        id: params.authorId,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[AUTHOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { authorId: string; blogId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { billboardBlogId, firstName, lastName, email, image,descriptionLong,title,twitter,facebook,instagram,github,linkedIn,buyMeACoffee } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!billboardBlogId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!firstName) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!lastName) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!image) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.authorId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const author = await prismadb.author.update({
      where: {
        id: params.authorId,
      },
      data: {
        firstName,
        lastName,
        email,
        image,
        billboardBlogId: billboardBlogId,
        descriptionLong,
        title,
        twitter,
        facebook,
        instagram,
        github,
        linkedIn,
        buyMeACoffee,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[AUTHOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
