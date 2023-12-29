"use client"
import React,{useEffect} from 'react';
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReturnButton } from '@/components/ReturnButton';

const WhiteboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string,blogId:string };
}) => {
  // const { orgId } = auth();

  // if (!orgId) {
  //   redirect(`${params.blogId}/workplace/select-org`);
  // }

  
  return (
    <div className="relative mt-10 bg-no-repeat bg-cover bg-center z-60">
      
      <main className="mt-10">
        {children}
      </main>
    </div>
  );
};

export default WhiteboardLayout;


