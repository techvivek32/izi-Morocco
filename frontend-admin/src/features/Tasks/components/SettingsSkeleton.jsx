import Skeleton from "../../../components/Skeleton";

const SettingsSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-7 w-64 mb-4" />
        <div className="p-4 flex flex-col gap-6">
          
          {/* Time Limit and Time Unit Row */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Question Logo Upload */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          {/* Logo Name Input */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Location Radius Input */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-44" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Behavior Options Radio Group */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Skeleton circle className="h-4 w-4" />
                  <Skeleton className="h-4 w-64" />
                </div>
              ))}
            </div>
          </div>

          {/* Conditional Duration Inputs */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-72" />
            <Skeleton className="h-10 w-full" />
          </div>

        </div>
      </div>

      {/* Form Stepper Buttons */}
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

export default SettingsSkeleton;