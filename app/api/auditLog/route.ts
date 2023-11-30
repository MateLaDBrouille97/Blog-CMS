import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request 
) {
  try {
    const { orgId } = auth();

    if (!orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLog = await prismadb.auditLog.findMany({
      where: {
        orgId:orgId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(auditLog);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}