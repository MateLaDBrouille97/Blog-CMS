import { auth } from "@clerk/nextjs"
import { redirect, useParams, useRouter } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const ActivityList =  ({blogId}:{blogId:string|string[]}) => {
  
  const [auditLogs,setAuditLogs]=useState<any>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const params =useParams();


  useEffect(() => {
    const fetchBoard = async () => {
     try {
        setLoading(true);
        const auditLogs=await axios.get("/api/auditLog");
        setAuditLogs(auditLogs)
        router.refresh();
      } catch (error) {
        toast.error(
          "Reload the page "
        );
      } finally {
        setOpen(false);
        setLoading(false);
      }
    };

    fetchBoard();
  }, [router]);


  // if (!orgId) {
  //   redirect(`/${blogId}/workplace`);
  // }

  console.log(auditLogs)

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {/* {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))} */}
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