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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  useEffect(() => {
    const fetchBoard = async () => {
     try {
        setLoading(true);
        const boards=await axios.get("/api/boards");
        setBoards(boards)
        router.refresh();
      } catch (error) {
        toast.error(
          "Reload the page"
        );
      } finally {
        setOpen(false);
        setLoading(false);
      }
    };

    fetchBoard();
  }, [router]);


  if (!isMounted) {
    return null;
  }


  return (
    <div className="w-full mb-20">
      <Info isPro={true} organization={organization} isLoaded={isLoaded} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          {boards?.data&&<BoardList boards={boards.data} blogId={blogId} />}
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
