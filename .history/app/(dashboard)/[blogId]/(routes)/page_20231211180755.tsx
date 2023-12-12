import { CreditCard, DollarSign, Package, Sidebar } from "lucide-react";

import { Separator } from "@/components/ui/separator";
// import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getBACount } from "@/actions/get-articles-count";
import { getChaptersCount } from "@/actions/get-chapters-count";
// import { getTotalRevenue } from "@/actions/get-total-revenue";
// import { getSalesCount } from "@/actions/get-sales-count";
// import { getGraphRevenue } from "@/actions/get-graph-revenue";
// import { getStockCount } from "@/actions/get-stock-count";
import { formatter } from "@/lib/utils";

interface DashboardPageProps {
  params: {
    blogId: string;
  };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ 
  params
}) => {
  const totalBACount= await getBACount(params?.blogId);
  const totalChapterCount= await getChaptersCount(params?.blogId);
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
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBACount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapters</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
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
            {/* <Overview data={graphRevenue} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
