import prismadb from "@/lib/prismadb";

export const getBAbyCategoryCount = async (categoryName: string) => {
  const blogArticlesByCategoryCount = await prismadb.blogarticle.count({
    where: {
      isPublished:true,
      category:{
        name:categoryName
      }
    },
    
    
  });

  return blogArticlesByCategoryCount;
};