import { NextResponse } from "next/server";
// import { getServerSession } from 'next-auth';

// import { authOptions } from '@/libs/auth';
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request, res: Response) {
  //   const session = await getServerSession(authOptions);

  //   if (!session) {
  //     return new NextResponse('Not Authenticated', { status: 500 });
  //   }

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  // if (!params.blogId) {
  //   return new NextResponse("Blog id is required", { status: 400 });
  // }

  // const blogByUserId = await prismadb.blog.findFirst({
  //   where: {
  //     id: params.blogId,
  //     userId,
  //   }
  // });

  // if (!blogByUserId) {
  //   return new NextResponse("Unauthorized", { status: 405 });
  // }

  try {
    const projects = await prismadb.project.findMany();

    return NextResponse.json(projects, {
      status: 200,
      statusText: "Successful",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Cannot fetch data", { status: 500 });
  }
}



export async function POST(
  req: Request,
  // res: Response,
  { params }: { params: { blogId: string } }
) {
  //   const session = await getServerSession(authOptions);

  //   if (!session) {
  //     return new NextResponse('Not Authenticated', { status: 500 });
  //   }

  //   const userId = session.user?.id;

  // const { userId } = auth();

  // if (!userId) {
  //   return new NextResponse("Unauthenticated", { status: 403 });
  // }

  const { description, name, slug } = await req.json();

  if (!description || !name || !slug ) {
    return new NextResponse("Please all fields are required", { status: 400 });
  }

  // if (!params.blogId) {
  //   return new NextResponse("Blog id is required", { status: 400 });
  // }

  // const blogByUserId = await prismadb.blog.findFirst({
  //   where: {
  //     id: params.blogId,
  //     userId,
  //   },
  // });

  // if (!blogByUserId) {
  //   return new NextResponse("Unauthorized", { status: 405 });
  // }

  try {
    const createdProject = await prismadb.project.create({
      data: {
        description:description,
        name:name,
        slug:slug,
        blogId: params.blogId,
      },
    });

    return NextResponse.json(createdProject, {
      status: 200,
      statusText: "Project Created",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Creation Error", { status: 500 });
  }
}




export async function PATCH(req: Request, res: Response) {
  const { description, name, id, slug } = await req.json();

  if (!description || !name || !id || !slug) {
    return new NextResponse("Please all fields are required", { status: 400 });
  }

  try {
    const updatedProject = await prismadb.project.update({
      where: { id },
      data: { description, name, slug },
    });

    return NextResponse.json(updatedProject, {
      status: 200,
      statusText: "Successful",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating", { status: 500 });
  }
}

