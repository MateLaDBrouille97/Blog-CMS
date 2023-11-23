import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, res: Response) {
    const { name, description, finishDate, projectBoardId, slug,priority,id} =
    await req.json();
  
    if (!name || !description || !finishDate )
    return new NextResponse('Please provide all fields', { status: 400 });
  
    try {
      const updatedFeature = await prismadb.feature.update({
        where: { id },
        data: {
            description,
            finishDate,
            name,
            slug,
            priority,
            
          },
    
      });
  
      return NextResponse.json(updatedFeature, {
        status: 200,
        statusText: "Successful",
      });
    } catch (error) {
      console.log(error);
      return new NextResponse("Error Updating", { status: 500 });
    }
  }
  