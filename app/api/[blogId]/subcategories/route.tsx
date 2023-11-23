import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, billboardId, categoryBlogId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!categoryBlogId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
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

    const subcategory = await prismadb.subCategoryBlog.create({
      data: {
        name,
        billboardBlogId:billboardId,
        categoryBlogId,
        blogId: params.blogId,
      }
    });
  
    return NextResponse.json(subcategory);
  } catch (error) {
    console.log('[SUBCATEGORIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    if (!params.blogId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const subcategories = await prismadb.subCategoryBlog.findMany({
      where: {
        blogId: params.blogId
      }
    });
  
    return NextResponse.json(subcategories);
  } catch (error) {
    console.log('[SUBCATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};