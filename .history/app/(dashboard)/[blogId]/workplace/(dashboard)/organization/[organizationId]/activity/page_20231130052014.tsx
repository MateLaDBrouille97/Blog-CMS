"use client"
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";

// import { Info } from "../_components/info";

import { ActivityList } from "./_components/activity-list";
import { useParams } from "next/navigation";
// import { checkSubscription } from "@/lib/subscription";

const ActivityPage =  () => {
  // const isPro = await checkSubscription();
  const params=useParams()
  const {blogId}=params;

  return (
    <div className="w-full">
      {/* <Info isPro={isPro} /> */}
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList blogId={blogId}/>
      </Suspense>
    </div>
  );
};

export default ActivityPage;