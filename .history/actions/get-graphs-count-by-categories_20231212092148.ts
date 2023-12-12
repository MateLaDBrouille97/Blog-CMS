import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  totalArticle: number;
  totalNews:number;
  totalOpinions:number;
  totalGeopol:number;
  totalAnalysis:number;
  totalusefulHacks:number;
}

export const getGraphCountByCategory = async (blogId: string): Promise<GraphData[]> => {

  const categoryName= [ 
    "NEWS",
    "OPINIONS",
    "GEOPOL",
    "ANALYSIS",
    "USEFULHACKS"
  ]
  


  const publishedArticles = await prismadb.blogarticle.findMany({
    where: {  
      isPublished: true,
    },
    
   
  });

  const publishedNewsArticles = await prismadb.blogarticle.findMany({
    where: {  
      isPublished: true,
      category:{
        name:categoryName[0]
      }
    },
  });

  const publishedOpinionsArticles = await prismadb.blogarticle.findMany({
    where: {  
      isPublished: true,
      category:{
        name:categoryName[1]
      }
    },
  });

  const publishedGeopolArticles = await prismadb.blogarticle.findMany({
    where: {  
      isPublished: true,
      category:{
        name:categoryName[2]
      }
    },
  });

  const publishedAnalysisArticles = await prismadb.blogarticle.findMany({
    where: {  
      isPublished: true,
      category:{
        name:categoryName[3]
      }
    },
  });

  const publishedUsefulHacksArticles = await prismadb.blogarticle.findMany({
    where: {  
      isPublished: true,
      category:{
        name:categoryName[4]
      }
    },
  });





  const monthlyCountArticles: { [key: number]: number } = {};
  const monthlyCountNewsArticles: { [key: number]: number } = {};
  const monthlyCountOpinionsArticles: { [key: number]: number } = {};
  const monthlyCountGeopolArticles: { [key: number]: number } = {};
  const monthlyCountAnalysisArticles: { [key: number]: number } = {};
  const monthlyCountUsefulHackArticles: { [key: number]: number } = {};


  // Grouping the orders by month and summing the revenue
  for (const article of publishedArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ... 
    let countForArticles =0;
    //Count number of Chapter per Month
    
    countForArticles += 1;
    // Adding the revenue for this order to the respective month 
    monthlyCountArticles[month]=(monthlyCountArticles[month]||0)+countForArticles;
    
  }

  for (const article of publishedNewsArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ... 
    let countForArticles =0;
    //Count number of Chapter per Month
    countForArticles += 1;
    // Adding the revenue for this order to the respective month 
    monthlyCountNewsArticles[month]=(monthlyCountNewsArticles[month]||0)+countForArticles;
    
  }

  for (const article of publishedOpinionsArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ... 
    let countForArticles =0;
    //Count number of Chapter per Month
    countForArticles += 1;
    // Adding the revenue for this order to the respective month 
    monthlyCountOpinionsArticles[month]=(monthlyCountOpinionsArticles[month]||0)+countForArticles;
    
  }
  
  for (const article of publishedGeopolArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ... 
    let countForArticles =0;
    //Count number of Chapter per Month
    countForArticles += 1;
    // Adding the revenue for this order to the respective month 
    monthlyCountGeopolArticles[month]=(monthlyCountGeopolArticles[month]||0)+countForArticles;
    
  }

  for (const article of publishedAnalysisArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ... 
    let countForArticles =0;
    //Count number of Chapter per Month
    countForArticles += 1;
    // Adding the revenue for this order to the respective month 
    monthlyCountAnalysisArticles[month]=(monthlyCountAnalysisArticles[month]||0)+countForArticles;
    
  }

  for (const article of publishedUsefulHacksArticles) {
    const month = article.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ... 
    let countForArticles =0;
    //Count number of Chapter per Month
    countForArticles += 1;
    // Adding the revenue for this order to the respective month 
    monthlyCountUsefulHackArticles[month]=(monthlyCountUsefulHackArticles[month]||0)+countForArticles;
    
  }




  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", totalNews: 0, totalArticle:0, totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Feb", totalNews: 0 ,totalArticle:0, totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Mar", totalNews: 0,totalArticle:0, totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0 },
    { name: "Apr", totalNews: 0,totalArticle:0, totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0 },
    { name: "May", totalNews: 0 ,totalArticle:0, totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Jun", totalNews: 0,totalArticle:0 , totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Jul", totalNews: 0,totalArticle:0 , totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Aug", totalNews: 0,totalArticle:0 , totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Sep", totalNews: 0,totalArticle:0 , totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Oct", totalNews: 0 ,totalArticle:0, totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Nov", totalNews: 0 ,totalArticle:0, totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
    { name: "Dec", totalNews: 0 ,totalArticle:0, totalOpinions: 0, totalGeopol: 0, totalusefulHacks: 0, totalAnalysis: 0},
  ];

  // Filling in the revenue data
  
  for (const month in monthlyCountArticles) {
    graphData[parseInt(month)].totalArticle = monthlyCountArticles[parseInt(month)];
  }

  for (const month in monthlyCountNewsArticles) {
    graphData[parseInt(month)].totalNews = monthlyCountNewsArticles[parseInt(month)];
  }

  for (const month in monthlyCountOpinionsArticles) {
    graphData[parseInt(month)].totalOpinions = monthlyCountOpinionsArticles[parseInt(month)];
  }

  for (const month in monthlyCountGeopolArticles) {
    graphData[parseInt(month)].totalGeopol = monthlyCountGeopolArticles[parseInt(month)];
  }

  for (const month in monthlyCountAnalysisArticles) {
    graphData[parseInt(month)].totalAnalysis = monthlyCountAnalysisArticles[parseInt(month)];
  }

  for (const month in monthlyCountUsefulHackArticles) {
    graphData[parseInt(month)].totalusefulHacks = monthlyCountUsefulHackArticles[parseInt(month)];
  }

  return graphData;
};