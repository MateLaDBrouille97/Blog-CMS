

import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { Board } from "@prisma/client";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
// import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = async () => {
  // const isPro = await checkSubscription();

  const {  orgId } = auth();

  if (!orgId) {
    return redirect("/");
  }

  const boards = await prismadb.board.findMany({
    where: {
      orgId:orgId
  
    },
    include: {
      lists:true
    },
  });

  return (
    <div className="w-full mb-20">
      <Info isPro={true} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList boards={boards} />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;

