import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

import { MainNav } from "@/components/main-nav";
import { MobileSidebar } from "./mobile-sidebar";



const Navbar = async ({blogId}:{blogId:string}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

 

  return ( 
    <div className="p-4 border-b  bg-white shadow-sm" >
      <div className="flex h-16 items-center px-4">
        <MobileSidebar blogId={blogId}/>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;