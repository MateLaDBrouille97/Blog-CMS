import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  res: Response,
  { params }: { params: { boardId: string; projectId: string } }
) {
  try {
    const project = await prismadb.project.findUnique({
      where: { id: params.projectId },
    });

    const board = await prismadb.projectBoard.findUnique({
      where: {
        id: params.boardId,
      },
      include: {
        features: true,
      },
    });

    return NextResponse.json(board, {
      status: 200,
      statusText: "Successful",
    });
  } catch (error) {
    return new NextResponse("Cannot fetch data", { status: 500 });
  }
}

export async function DELETE(
  req: Request,

  { params }: { params: any }
) {
  

  try {
    // const { userId } = auth();

    // const project = await prismadb.project.findUnique({
    //   where: { id: params.projectId },
    // });

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    // const { status, projectBoardId, slug } = await req.json();

    // if (!status || !projectBoardId || !slug) {
    //   return new NextResponse("Please all fields are required", {
    //     status: 400,
    //   });
    // }

    const board = await prismadb.projectBoard.delete({
      where: {
        id: params.boardId,
      },
    });

    return NextResponse.json(board, {
      status: 200,
      statusText: "Successful",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating", { status: 500 });
  }
}
