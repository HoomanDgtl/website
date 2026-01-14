import { cn } from "@/lib/utils";
import { Skeleton } from "../../ui/skeleton";

interface GpuTableRowSkeletonProps {
  className?: string;
  isB200?: boolean;
}

const GpuTableRowSkeleton = ({
  className,
  isB200 = false,
}: GpuTableRowSkeletonProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between overflow-hidden border-b border-[#e6e8eb] px-4 py-5",
        isB200 ? "bg-[#fbfbfb]" : "bg-white",
        className,
      )}
    >
      {/* GPU Model */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-20" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      {/* Price Range & Avg Price */}
      <div className="flex items-center gap-8">
        <div className="flex items-start gap-1">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>

        <Skeleton className="h-5 w-20" />

        <Skeleton className="h-7 w-7 rounded-full bg-[#F5F5F5]" />
      </div>
    </div>
  );
};

export default GpuTableRowSkeleton;
