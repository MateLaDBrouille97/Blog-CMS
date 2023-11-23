import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { status, projectId, slug } = await req.json();

  if (!status || !projectId || !slug)
    return new NextResponse("Please all fields are required", { status: 400 });

  try {
    const maxOrderResult = await prismadb.projectBoard.aggregate({
      _max: {
        order: true,
      },
      where: {
        projectId,
      },
    });

    const nextOrder = maxOrderResult._max?.order
      ? maxOrderResult._max.order + 1
      : 1;

    const createdProjectBoard = await prismadb.projectBoard.create({
      data: {
        slug,
        status,
        project: {
          connect: { id: projectId },
        },
        order: nextOrder,
      },
    });

    return NextResponse.json(createdProjectBoard, {
      status: 200,
      statusText: "Project board created",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Creation Error", { status: 500 });
  }
}

export async function PATCH(req: Request, res: Response) {
  const {
    projectId,
    sourceIndex,
    destinationIndex,
    type,
    sourceBoardId,
    destinationBoardId,
  } = await req.json();

  try {
    if (type === "status") {
      const projectBoards = await prismadb.projectBoard.findMany({
        where: { projectId },
        orderBy: { order: "asc" },
      });

      const sourceBoard = projectBoards[sourceIndex];
      const destinationBoard = projectBoards[destinationIndex];

      await prismadb.projectBoard.update({
        where: {
          id: sourceBoard.id,
        },
        data: {
          order: destinationBoard.order,
        },
      });

      await prismadb.projectBoard.update({
        where: {
          id: destinationBoard.id,
        },
        data: {
          order: sourceBoard.order,
        },
      });

      return NextResponse.json("Update successful", {
        status: 200,
        statusText: "Successful",
      });
    }

    if (type === "feature") {
      const project = await prismadb.project.findUnique({
        where: {
          id: projectId,
        },
        include: { projectBoards: { include: { features: true } } },
      });

      if (!project)
        return new NextResponse("project not found", { status: 500 });

      const sourceBoard = project.projectBoards.find(
        (board) => board.id === sourceBoardId
      );
      const destinationBoard = project.projectBoards.find(
        (board) => board.id === destinationBoardId
      );

      if (!sourceBoard || !destinationBoard)
        return new NextResponse("Error Updating", { status: 500 });

      const movedFeature = sourceBoard.features[sourceIndex];



      if (sourceBoardId === destinationBoardId) {

        
        const sourceFeatures = [...sourceBoard.features];
        const movedFeature = sourceFeatures.splice(sourceIndex, 1)[0];

        const destinationOrder =
          sourceFeatures[destinationIndex].order || destinationIndex + 1;


        movedFeature.order = destinationOrder;


        sourceFeatures.forEach((feature, index) => {
          if (
            index >= Math.min(sourceIndex, destinationIndex) 
            &&
            index <= Math.max(sourceIndex, destinationIndex)
          ) {
            feature.order = index + 1;
          }
        });

        await prismadb.projectBoard.update({
          where: { id: sourceBoardId },
          data: { order: sourceBoard.order },
        });

        await prismadb.feature.update({
          where: { id: movedFeature.id },
          data: { order: destinationOrder },
        });

      } else {
        destinationBoard.features.splice(destinationIndex, 0, movedFeature);

        await prismadb.projectBoard.update({
          where: { id: destinationBoardId },
          data: { features: { set: destinationBoard.features } },
        });

        sourceBoard.features.splice(sourceIndex, 1);

        await prismadb.projectBoard.update({
          where: { id: sourceBoardId },
          data: { features: { set: sourceBoard.features } },
        });

        return NextResponse.json("Update successful", {
          status: 200,
          statusText: "Successful",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating", { status: 500 });
  }
}

// export async function GET(req: Request, { params }: {params:{boardId:string,projectId:string}}) {
//   const {
//     projectId,
//   } = await req.json();

//   try {

//       const project =await prismadb.project.findUnique({
//         where:{id:projectId}
//       })

//       const board = await prismadb.projectBoard.findUnique({
//         where: {
//           id: params.boardId,
//           projectId:project?.id,
//       },
//         include: {
//              features: true,
//     }})

//       return NextResponse.json(board, {
//         status: 200,
//         statusText: 'Successful',
//       });
//     } catch (error) {
//       return new NextResponse('Cannot fetch data', { status: 500 });
//     }
//   }



export async function DELETE(req: Request, res: Response) {
  try {
    // const { userId } = auth();
    const { slug, projectBoardId } = await req.json();

    if (!slug || !projectBoardId)
      return new NextResponse("Please all fields are required", {
        status: 400,
      });

    const project = await prismadb.project.findUnique({
      where: { slug: slug },
    });

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    const { status } = await req.json();

    if (!status) {
      return new NextResponse("Please all fields are required", {
        status: 400,
      });
    }

    const board = await prismadb.projectBoard.findUnique({
      where: {
        id: projectBoardId,
        projectId: project?.id,
      },
    });

    if (!board) {
      return new NextResponse("Board required", { status: 403 });
    }

    const boardToDelete = await prismadb.projectBoard.delete({
      where: {
        id: projectBoardId,
      },
    });

    return NextResponse.json(boardToDelete, {
      status: 200,
      statusText: "Successful",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating", { status: 500 });
  }
}
