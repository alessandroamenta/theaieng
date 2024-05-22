import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonJobCard() {
  return (
    <div className="flex items-center justify-between p-4 bg-[#090909] border border-[#181818] rounded border-greyrounded-md">
      <div className="flex items-center space-x-4">
        <Skeleton className="rounded-md bg-[#090909] border border-[#181818] h-12 w-12" />
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex space-x-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
