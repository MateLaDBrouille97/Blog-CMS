import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
  params
}: {
  params: { blogId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const blog = await prismadb.blog.findFirst({
    where: {
      id: params.blogId,
      userId
    }
  });

  if (!blog) {
    redirect('/settings');
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={blog} />
      </div>
    </div>
  );
}

export default SettingsPage;


