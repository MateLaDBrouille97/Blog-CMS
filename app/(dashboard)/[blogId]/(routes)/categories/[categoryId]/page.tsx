import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string, blogId: string }
}) => {
  const category = await prismadb.categoryBlog.findUnique({
    where: {
      id: params.categoryId
    }
  });

  const billboards = await prismadb.billboardBlog.findMany({
    where: {
      blogId: params.blogId
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}

export default CategoryPage;