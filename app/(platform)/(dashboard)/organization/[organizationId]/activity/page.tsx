import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import ActivityList from "./_components/ActivityList";

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};
export default ActivityPage;
