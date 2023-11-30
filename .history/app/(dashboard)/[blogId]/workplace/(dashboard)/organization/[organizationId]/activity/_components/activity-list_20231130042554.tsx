import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";

export const ActivityList = async ({blogId}:{blogId:string|string[]}) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect(`/${blogId}`);
  }

  const auditLogs = await prismadb.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};