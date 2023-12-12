import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
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

  // Grouping the orders by month and summing the revenue
  for (const article of publishedArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    let countForArticle = 0;

    //Count number of Chapter per Month
    const numberOfChapterPerArticle = article.chapters.length;
    countForArticle +=numberOfChapterPerArticle

   

    // Adding the revenue for this order to the respective month
    monthlyCount[month] = (monthlyCount[month] || 0) + countForArticle;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // Filling in the revenue data
  for (const month in monthlyCount) {
    graphData[parseInt(month)].total = monthlyCount[parseInt(month)];
  }

  return graphData;
};