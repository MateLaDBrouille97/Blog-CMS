import prismadb from "@/lib/prismadb";

export const getBACount = async (blogId: string) => {
  const blogArticlesCount = await prismadb.blogarticle.count({
    where: {
      isPublished:true,      
    },
    
    
  });

  return blogArticlesCount;
};