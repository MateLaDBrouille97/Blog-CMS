import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(req: Request, { params }: any) {
  try {
    const project = await prismadb.project.findUnique({
      where: { slug: params.slug },
      include: {
        projectBoards: {
          include: {
            features: true,
          },
        },
      },
    });

    return NextResponse.json(project, {
      status: 200,
      statusText: 'Successful',
    });
  } catch (error) {
    return new NextResponse('Cannot fetch data', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: any }
) {
  try {
   

    const project = await prismadb.project.delete({
      where: { 
        slug:params.slug,
     },
      
    });

    return NextResponse.json(project, {
      status: 200,
      statusText: "Successful",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating", { status: 500 });
  }
}
