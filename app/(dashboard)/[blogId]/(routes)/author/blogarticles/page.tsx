import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

const ArticlesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
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
    <>
      <div className="p-6">
        <DataTable columns={columns} data={articles} />
      </div>
      <Heading title="API" description="API Calls for Articles" />
      <Separator />
      <ApiList entityName="articles" entityIdName="blogarticleId" />
    </>
  );
};

export default ArticlesPage;
