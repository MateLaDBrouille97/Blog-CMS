import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, res: Response) {
    const { status,id,slug,projectId } = await req.json();
  
    if (!status  ) {
      return new NextResponse("Please all fields are required", { status: 400 });
    }
  
    try {
      const updatedProjectBoard = await prismadb.projectBoard.update({
        where: { id },
        data: { status,slug,projectId },
    
      });
  
      return NextResponse.json(updatedProjectBoard, {
        status: 200,
        statusText: "Successful",
      });
    } catch (error) {
      console.log(error);
      return new NextResponse("Error Updating", { status: 500 });
    }
  }
  
  
  