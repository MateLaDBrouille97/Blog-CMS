import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PUT(
  req: Request,
  res: Response
) {
  try {
   
    const { list } = await req.json();

    for (let item of list) {
      await prismadb.feature.update({
        where: { id: item.id },
        data: { order: item.order }
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}