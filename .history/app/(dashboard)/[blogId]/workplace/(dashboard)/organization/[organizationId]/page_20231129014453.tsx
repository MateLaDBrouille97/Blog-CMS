"use client"

import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { Board } from "@prisma/client";
// import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage =  ({boards}:{boards:Board[]}) => {
  // const isPro = await checkSubscription();

  

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

export const getServerSideProps = async ({ params }:{params:any}) => {
  const { blogId } = params;
  const { orgId } = auth();

  if (!orgId) {
    return {
      redirect: {
        destination: `/${blogId}/workplace/select-org`,
        permanent: false,
      },
    };
  }

  const boards = await prismadb.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      boards,
    },
  };
};
