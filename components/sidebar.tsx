import React from "react";
import { MainNav2 } from "./main-nav2";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";

const Sidebar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const blogs = await prismadb.blog.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className=" h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm w-full px-4">
      <div className="p-8">
        
      </div>
      <div className="py-5">
        <StoreSwitcher items={blogs} />
      </div>
      <MainNav2 />
    </div>
  );
};

export default Sidebar;
