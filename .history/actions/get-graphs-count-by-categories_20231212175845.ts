import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string; // Format: "YYYY-MM"
  totalNews: number;
  totalOpinions: number;
  totalGeopol: number;
  totalAnalysis: number;
  totalUsefulHacks: number;
  totalArticle: number;
}

export const getGraphCountByCategory = async (blogId: string): Promise<GraphData[]> => {
  const categoryName = [
    "NEWS",
    "OPINIONS",
    "GEOPOL",
    "ANALYSIS",
    "USEFULHACKS"
  ];

  const publishedArticles = await prismadb.blogarticle.findMany({
    where: {
      isPublished: true,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        }
      }
    },
  });

  const monthlyCount: { [key: string]: GraphData } = {};

  // Grouping the articles by month and year for each category
  for (const category of categoryName) {
    const publishedCategoryArticles = await prismadb.blogarticle.findMany({
      where: {
        isPublished: true,
        category: {
          name: category,
          blogId
        }
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          }
        }
      },
    });

    for (const article of publishedCategoryArticles) {
      const year = article.createdAt.getFullYear();
      const month = article.createdAt.getMonth() + 1; // Adding 1 because getMonth() returns 0 for January

      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;

      if (!monthlyCount[monthKey]) {
        monthlyCount[monthKey] = {
          name: monthKey,
          totalNews: 0,
          totalOpinions: 0,
          totalGeopol: 0,
          totalAnalysis: 0,
          totalUsefulHacks: 0,
          totalArticle: 0
        };
      }

      // Count number of Chapters and Articles per Month for each category
      
      monthlyCount[monthKey].totalArticle += 1;

      // Count number of Articles per Month for each category
      switch (category) {
        case "NEWS":
          monthlyCount[monthKey].totalNews += 1;
          break;
        case "OPINIONS":
          monthlyCount[monthKey].totalOpinions += 1;
          break;
        case "GEOPOL":
          monthlyCount[monthKey].totalGeopol += 1;
          break;
        case "ANALYSIS":
          monthlyCount[monthKey].totalAnalysis += 1;
          break;
        case "USEFULHACKS":
          monthlyCount[monthKey].totalUsefulHacks += 1;
          break;
        default:
          break;
      }
    }
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Feb", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Mar", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Apr", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "May", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Jun", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Jul", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Aug", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Sep", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Oct", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Nov", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
    { name: "Dec", totalNews: 0, totalOpinions: 0, totalGeopol: 0, totalAnalysis: 0, totalUsefulHacks: 0, totalArticle: 0 },
  ];

  // Filling in the data from monthlyCount
  for (const monthKey in monthlyCount) {
    const monthIndex = parseInt(monthKey.split('-')[1]) - 1; // Convert "YYYY-MM" to month index (0-based)
    graphData[monthIndex] = monthlyCount[monthKey];
  }

  return graphData;
};
