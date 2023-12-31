import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request
   
) {
  try {
    const {  orgId } = auth();

    if (!orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const boards = await prismadb.board.findMany({
      where: {
        orgId:orgId
    
      },
      include: {
        lists:true
      },
    });

    return NextResponse.json(boards);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}