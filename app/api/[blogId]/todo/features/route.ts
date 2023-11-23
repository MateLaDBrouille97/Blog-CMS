import { parseISO } from 'date-fns';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request, res: Response) {
  const { name, description, finishDate, projectBoardId, slug,priority } =
    await req.json();

  if (!name || !description || !finishDate || !slug || !projectBoardId)
    return new NextResponse('Please provide all fields', { status: 400 });

  try {
    const projectBoard = await prismadb.projectBoard.findUnique({
      where: { id: projectBoardId },
      include: {
        features: true,
      },
    });

    if (!projectBoard)
      return new NextResponse('Feature must belong to a project board', {
        status: 400,
      });

    const order = projectBoard.features.length + 1;

    const feature = await prismadb.feature.create({
      data: {
        description,
        finishDate: parseISO(finishDate),
        name,
        order,
        slug,
        priority,
        projectBoard: {
          connect: { id: projectBoardId },
        },
      },
    });

    return NextResponse.json(feature, {
      status: 200,
      statusText: 'Feature Created',
    });
  } catch (error) {
    console.log(error);
    return new NextResponse('Creation Error', { status: 500 });
  }
}

