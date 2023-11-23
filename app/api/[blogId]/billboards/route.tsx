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

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
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

    //Ici ce que l'on regarde c'est si l'utilisateur est l'utilisateur qui a cree le magasin si c'est le cas il pourra faire les modifications a son magasin comme il veut sinon il ne sera pas authorise a faire quoi que ce soit meme s'il est authentifie
    if (!blogByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billboard = await prismadb.billboardBlog.create({
      data: {
        label,
        imageUrl,
        blogId: params.blogId,
      }
    });
  
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


//GET all BillBoards available for the blog

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
    }

    const billboards = await prismadb.billboardBlog.findMany({
      where: {
        blogId: params.blogId
      }
    });
  
    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};