"use client"

import { Suspense, useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { toast } from "react-hot-toast";
import {  useOrganization } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { Board } from "@prisma/client";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
// import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = () => {
  // const isPro = await checkSubscription();

  
  const { organization, isLoaded } = useOrganization();
  const [boards,setBoards]=useState<any>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const params =useParams();
  const {blogId}=params

  useEffect(() => {
    const fetchBoard = async () => {
     try {
        setLoading(true);
        await axios.get("/api/boards");
        router.refresh();
      } catch (error) {
        toast.error(
          "Make sure you removed all categories using this billboard first."
        );
      } finally {
        setOpen(false);
        setLoading(false);
      }
    };

    fetchBoard();
  }, [router]);

  


  return (
    <div className="w-full mb-20">
      <Info isPro={true} organization={organization} isLoaded={isLoaded} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList boards={boards} blogId={blogId} />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
