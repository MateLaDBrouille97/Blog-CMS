import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SubCategoryColumn } from "./components/columns"
import { SubCategoriesClient } from "./components/client";

const CategoriesPage = async ({
  params
}: {
  params: { blogId: string }
}) => {
  const subcategories = await prismadb.subCategoryBlog.findMany({
    where: {
      blogId: params.blogId
    },
    include: {
      billboard: true,
      categoryBlog:true,
      
    },
    orderBy: {
      createdAt: 'desc'
    }
  });


  const formattedCategories: SubCategoryColumn[] = subcategories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    categoryBlog:item.categoryBlog.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;