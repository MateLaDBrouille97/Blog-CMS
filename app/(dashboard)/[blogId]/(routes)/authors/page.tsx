import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { AuthorColumn } from "./components/columns"
import { AuthorClient } from "./components/client";

const AuthorsPage = async ({
  params
}: {
  params: { blogId: string }
}) => {
  const authors = await prismadb.author.findMany({
    where: {
      blogId: params.blogId
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedAuthors: AuthorColumn[] = authors.map((item) => ({
    id: item.id,
    firstName: item.firstName,
    lastName:item.lastName,
    email:item.email,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AuthorClient data={formattedAuthors} />
      </div>
    </div>
  );
};

export default AuthorsPage;