import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string; // Format: "YYYY-MM"
  totalChapter: number;
  totalArticle: number;
}

export const getGraphCount = async (blogId: string): Promise<GraphData[]> => {
  const publishedArticles = await prismadb.blogarticle.findMany({
    where: {  
      isPublished: true,
    },
    include: {
      chapters:{
        where:{
          isPublished:true,
        }
      }
    },
  });

  const monthlyCount: { [key: string]: GraphData } = {};

  // Grouping the articles by month and year
  for (const article of publishedArticles) {
    const year = article.createdAt.getFullYear();
    const month = article.createdAt.getMonth() + 1; // Adding 1 because getMonth() returns 0 for January

    const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
    
    if (!monthlyCount[monthKey]) {
      monthlyCount[monthKey] = { name: monthKey, totalChapter: 0, totalArticle: 0 };
    }

    // Count number of Chapters and Articles per Month
    const numberOfChapterPerArticle = article.chapters.length;
    monthlyCount[monthKey].totalChapter += numberOfChapterPerArticle;
    monthlyCount[monthKey].totalArticle += 1;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", totalChapter: 0, totalArticle: 0 }, // Jan
    { name: "Feb", totalChapter: 0, totalArticle: 0 }, // Feb
    { name: "Mar", totalChapter: 0, totalArticle: 0 }, // Mar
    { name: "Apr", totalChapter: 0, totalArticle: 0 }, // Apr
    { name: "May", totalChapter: 0, totalArticle: 0 }, // May
    { name: "Jun", totalChapter: 0, totalArticle: 0 }, // Jun
    { name: "Jul", totalChapter: 0, totalArticle: 0 }, // Jul
    { name: "Aug", totalChapter: 0, totalArticle: 0 }, // Aug
    { name: "Sep", totalChapter: 0, totalArticle: 0 }, // Sep
    { name: "Oct", totalChapter: 0, totalArticle: 0 }, // Oct
    { name: "Nov", totalChapter: 0, totalArticle: 0 }, // Nov
    { name: "Dec", totalChapter: 0, totalArticle: 0 }, // Dec
  ];

  // Filling in the data from monthlyCount
  for (const monthKey in monthlyCount) {
    const monthIndex = parseInt(monthKey.split('-')[1]) - 1; // Convert "YYYY-MM" to month index (0-based)
    graphData[monthIndex] = monthlyCount[monthKey];
  }

  return graphData;
};
