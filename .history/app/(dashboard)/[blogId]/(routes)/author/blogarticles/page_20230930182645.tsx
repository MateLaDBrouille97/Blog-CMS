import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const ArticlesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const articles = await prismadb.blogarticle.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={articles} />
    </div>
   );
}
 
export default ArticlesPage;