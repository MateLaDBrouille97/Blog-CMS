import prismadb from "@/lib/prismadb";

export const getChaptersCount = async (blogId: string) => {
  const blogArticlesCount = await prismadb.chapter.count({
    where:{
      isPublished:true,
      course:{
        category:{
          blogId
        }
      }
    }
  });

  return blogArticlesCount;
};