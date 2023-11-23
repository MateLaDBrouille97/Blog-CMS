import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
 
  

  if (!userId) {
    redirect("/sign-in");
  }

  const blog = await prismadb.blog.findFirst({
    where: {
      userId: userId,
    },
  });

  

  if (blog) {
    redirect(`/${blog.id}`);
  }

  return(
    <>{children}</>
  )
  
}
