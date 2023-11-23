import prismadb from "@/lib/prismadb";

import { AuthorForm } from "./components/author-form";
import { ImageForm } from "./components/image-form";

const AuthorPage = async ({ params }: { params: { authorId: string, blogId: string  } }) => {
  const author = await prismadb.author.findUnique({
    where: {
      id: params.authorId,
    },
  });

  const billboards = await prismadb.billboardBlog.findMany({
    where: {
      blogId: params.blogId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AuthorForm initialData={author} billboards={billboards}/>
      </div>
    </div>
  );
};

export default AuthorPage;
