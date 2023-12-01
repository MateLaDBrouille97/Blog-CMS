import prismadb from "@/lib/prismadb";

export const getSalesCount = async (blogId: string) => {
  const salesCount = await prismadb.blogarticle.count({
    where: {
      isPublished:true,      
    },
  });

  return salesCount;
};