import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
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

  const monthlyCount: { [key: number]: number } = {};

  const monthlyCountArticles: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const article of publishedArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    let countForChapters = 0;
    let countForArticles =0;

    //Count number of Chapter per Month
    const numberOfChapterPerArticle = article.chapters.length;
    countForChapters +=numberOfChapterPerArticle;
    countForArticles += 1;
    
   

    // Adding the revenue for this order to the respective month
    monthlyCount[month] = (monthlyCount[month] || 0) + countForChapters;
    monthlyCountArticles[month]=(monthlyCountArticles[month]||0)+countForArticles;
    
  }

  const monthlyCount2: { [key: string]: number } = {};
  const monthlyCountArticles2: { [key: string]: number } = {};

  // Grouping the orders by month and year and summing the counts
  for (const article of publishedArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    const year = article.createdAt.getFullYear().toString();
    const key = `${year}-${month}`;

    let countForChapters = 0;
    let countForArticles =0;

    const numberOfChapterPerArticle = article.chapters.length;
    countForChapters +=numberOfChapterPerArticle;
    countForArticles += 1;

    monthlyCount2[key] = (monthlyCount2[key] || 0) + countForChapters;
    monthlyCountArticles2[key]=(monthlyCountArticles2[key]||0)+countForArticles;

  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", totalChapter: 0, totalArticle:0},
    { name: "Feb", totalChapter: 0 ,totalArticle:0},
    { name: "Mar", totalChapter: 0,totalArticle:0 },
    { name: "Apr", totalChapter: 0,totalArticle:0 },
    { name: "May", totalChapter: 0 ,totalArticle:0},
    { name: "Jun", totalChapter: 0,totalArticle:0 },
    { name: "Jul", totalChapter: 0,totalArticle:0 },
    { name: "Aug", totalChapter: 0,totalArticle:0 },
    { name: "Sep", totalChapter: 0,totalArticle:0 },
    { name: "Oct", totalChapter: 0 ,totalArticle:0},
    { name: "Nov", totalChapter: 0 ,totalArticle:0},
    { name: "Dec", totalChapter: 0 ,totalArticle:0},
  ];

  // Filling in the revenue data
  for (const month in monthlyCount2) {
    graphData[parseInt(month)].totalChapter = monthlyCount2[parseInt(month)];
  }

  for (const month in monthlyCountArticles2) {
    graphData[parseInt(month)].totalArticle = monthlyCountArticles2[parseInt(month)];
  }

  return graphData;
};