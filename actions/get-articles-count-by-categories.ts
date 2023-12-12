import prismadb from "@/lib/prismadb";

export const getBACountByCategory = async (categoryName: string) => {
  const blogArticlesCountbyCategory = await prismadb.blogarticle.count({
    where: {
      isPublished:true, 
      category:{
        name:categoryName,
      }     
    },
    
    
  });

  return blogArticlesCountbyCategory;
};