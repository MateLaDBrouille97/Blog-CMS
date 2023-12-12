import { CreditCard, DollarSign, Package, Sidebar,Book,BookIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getBACount } from "@/actions/get-articles-count";
import { getChaptersCount } from "@/actions/get-chapters-count";
import { getGraphCount } from "@/actions/get-graph-counts";
import { getGraphCountByCategory } from "@/actions/get-graphs-count-by-categories";
import { getBACountByCategory } from "@/actions/get-articles-count-by-categories";
// import { getTotalRevenue } from "@/actions/get-total-revenue";
// import { getSalesCount } from "@/actions/get-sales-count";
// import { getGraphRevenue } from "@/actions/get-graph-revenue";
// import { getStockCount } from "@/actions/get-stock-count";
import { formatter } from "@/lib/utils";
import { Overview2 } from "@/components/overview2";

interface DashboardPageProps {
  params: {
    blogId: string;
  };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ 
  params
}) => {

  const categoryName= [ 
    "NEWS",
    "OPINIONS",
    "GEOPOL",
    "ANALYSIS",
    "USEFULHACKS"
  ]


  const totalBACount= await getBACount(params?.blogId);
  const totalChapterCount= await getChaptersCount(params?.blogId);
  const graphCount =await getGraphCount(params?.blogId)
  const graphCountCategory =await getGraphCountByCategory(params?.blogId)
  const newsArticles=await getBACountByCategory(categoryName[0]);
  const opinionsArticles=await getBACountByCategory(categoryName[1]);
  const geopolArticles=await getBACountByCategory(categoryName[2]);
  const analysisArticles=await getBACountByCategory(categoryName[3]);
  const ufhArticles=await getBACountByCategory(categoryName[4]);
  // const totalRevenue = await getTotalRevenue(params.blogId);
  // const graphRevenue = await getGraphRevenue(params.blogId);
  // const salesCount = await getSalesCount(params.blogId);
  // const stockCount = await getStockCount(params.blogId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your blog" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dashboard
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              {/* <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBACount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapters</CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChapterCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphCount} />
          </CardContent>
        </Card>
      </div>
      <Separator />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Articles by Categories" description="Overview of your blog by Articles and by Categories" />
        <Separator />
        <div className="grid gap-4 md:grid-cols-6 sm:grid-cols-3 ">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBACount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapters</CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsArticles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapters</CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{opinionsArticles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapters</CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{geopolArticles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapters</CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysisArticles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapters</CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ufhArticles}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview by Categories</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview2 data={graphCountCategory} />
          </CardContent>
        </Card>
      </div>
      <Separator />
    </div>
  );
};

export default DashboardPage;
