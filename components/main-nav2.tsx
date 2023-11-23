"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SidebarRoutes } from "./sidebar-routes";

export function MainNav2( ){


  
  return (
    <div className="h-full  flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
