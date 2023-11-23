import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();     // On veut authentifier l'utilisateur avec Clerk
    const body = await req.json(); // Extraction des donnees

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 }); // How we handle 
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const blog = await prismadb.blog.create({
      data: {
        name,
        userId,
      }
    }); // On cree un magasin dans prisma 
  
    return NextResponse.json(blog);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};