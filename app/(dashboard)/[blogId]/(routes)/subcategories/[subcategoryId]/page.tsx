import prismadb from "@/lib/prismadb";

import { SubCategoryForm } from "./components/subcategory-form";

const SubCategoryPage = async ({
  params
}: {
  params: { subcategoryId: string, blogId: string }
}) => {
  const subcategory = await prismadb.subCategoryBlog.findUnique({
    where: {
      id: params.subcategoryId
    }
  });

  const billboards = await prismadb.billboardBlog.findMany({
    where: {
      blogId: params.blogId
    }
  });

  const categories = await prismadb.categoryBlog.findMany({
    where: {
      blogId: params.blogId
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoryForm billboards={billboards} categories={categories} initialData={subcategory} />
      </div>
    </div>
  );
}

export default SubCategoryPage;