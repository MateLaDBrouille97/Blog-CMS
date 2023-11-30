"use client"

import { Suspense, useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";

import { auth, useOrganization } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { Board } from "@prisma/client";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
// import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = () => {
  // const isPro = await checkSubscription();

  const { orgId } = auth();
  const { organization, isLoaded } = useOrganization();
  const [boards,setBoards]=useState<Board[]>()

  useEffect(() => {
    const fetchBoard = async () => {
      if (orgId) {
        const fetchedBoards = await prismadb.board.findMany({
          where: {
            orgId: orgId,
            
          },
          include: {
            lists: true,
          },
        });
        setBoards(fetchedBoards);
      }
    };

    
    fetchBoard();
  }, [orgId]);

  if (!orgId) {
    return redirect("/");
  }


  return (
    <div className="w-full mb-20">
      <Info isPro={true} organization={organization} isLoaded={isLoaded} />
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
