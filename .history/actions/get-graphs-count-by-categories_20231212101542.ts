import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  totalArticle: number;
  totalNews: number;
  totalOpinions: number;
  totalGeopol: number;
  totalAnalysis: number;
  totalusefulHacks: number;
}

export const getGraphCountByCategory = async (blogId: string): Promise<GraphData[]> => {
  const categoryName = ["NEWS", "OPINIONS", "GEOPOL", "ANALYSIS", "USEFULHACKS"];

  const categories = await Promise.all(
    categoryName.map((category) =>
      prismadb.blogarticle.findMany({
        where: {
          isPublished: true,
          category: {
            name: category,
          },
        },
      })
    )
  );

  const monthlyCount: { [year: number]: { [month: number]: number } } = {};

  // Grouping the articles by year and month
  for (const categoryArticles of categories) {
    for (const article of categoryArticles) {
      const year = article.createdAt.getFullYear();
      const month = article.createdAt.getMonth();

      // Initialize the count for the year if not present
      if (!monthlyCount[year]) {
        monthlyCount[year] = {};
      }

      // Initialize the count for the month if not present
      if (!monthlyCount[year][month]) {
        monthlyCount[year][month] = 0;
      }

      // Increment the count for the month
      monthlyCount[year][month] += 1;
    }
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = Array.from({ length: 12 }, (_, month) => {
    return {
      name: monthToName(month),
      totalNews: 0,
      totalArticle: 0,
      totalOpinions: 0,
      totalGeopol: 0,
      totalusefulHacks: 0,
      totalAnalysis: 0,
    };
  });

  // Filling in the counts in the graphData
  for (const year in monthlyCount) {
    for (const month in monthlyCount[year]) {
      const index = parseInt(month);
      graphData[index].totalArticle += monthlyCount[year][month];
    }
  }

  return graphData;
};

// Helper function to get month name from month number
const monthToName = (month: number): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month];
};
