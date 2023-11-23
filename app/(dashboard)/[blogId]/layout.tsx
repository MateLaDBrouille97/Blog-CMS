
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { blogId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const blog = await prismadb.blog.findFirst({
    where: {
      id: params.blogId,
      userId,
    },
  });

  if (!blog) {
    redirect("/");
  }

  return (
    <>
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] md:my-5 md:mx-2 h-full">
        {children}
      </main>
    </div>
    </>
  );
}
