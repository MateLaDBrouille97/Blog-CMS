import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "../../../../../lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { subcategoryId: string } }
) {


  try {
    if (!params.subcategoryId) {
      return new NextResponse("Sub-Category id is required", { status: 400 });
    }

    const subcategory = await prismadb.subCategoryBlog.findUnique({
      where: {
        id: params.subcategoryId
      },
      include: {
        billboard: true,
        categoryBlog:true
      }
    });
  
    return NextResponse.json(subcategory);
  } catch (error) {
    console.log('[SUBCATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { subcategoryId: string, blogId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.subcategoryId) {
      return new NextResponse("Sub-Category id is required", { status: 400 });
    }

    const blogByUserId = await prismadb.blog.findFirst({
      where: {
        id: params.blogId,
        userId,
      }
    });

    if (!blogByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const subcategory = await prismadb.subCategoryBlog.delete({
      where: {
        id: params.subcategoryId,
      }
    });
  
    return NextResponse.json(subcategory);
  } catch (error) {
    console.log('[SUBCATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { subcategoryId: string, blogId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { name, billboardId,categoryBlogId } = body;

    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!categoryBlogId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }


    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.subcategoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const blogByUserId = await prismadb.blog.findFirst({
      where: {
        id: params.blogId,
        userId,
      }
    });

    if (!blogByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const subcategory = await prismadb.subCategoryBlog.update({
      where: {
        id: params.subcategoryId,
      },
      data: {
        name,
        billboardBlogId:billboardId,
        categoryBlogId,
      }
    });
  
    return NextResponse.json(subcategory);
  } catch (error) {
    console.log('[SUBCATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};