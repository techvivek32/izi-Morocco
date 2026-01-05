import Skeleton from "../../../components/Skeleton";

const ConfigurationSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-7 w-64 mb-4" />
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex flex-col gap-6">
            
            {/* Title Input Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* File Upload Skeletons */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            ))}

            {/* Rich Text Editor Skeletons */}
            {[1, 2].map((item) => (
              <div key={item} className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
            ))}

            {/* Tags Selector Skeleton */}
            <div className="flex w-full items-end gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton circle className="h-10 w-10" />
            </div>

            {/* Language Selector Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Time Limit Radio Group Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-28" />
              <div className="flex gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Skeleton circle className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Conditional Duration Inputs Skeleton */}
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Status Radio Group Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-20" />
              <div className="flex gap-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Skeleton circle className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Form Stepper Buttons Skeleton */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};

export default ConfigurationSkeleton;