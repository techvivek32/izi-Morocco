import Skeleton from "../../../components/Skeleton";


const MediaSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-7 w-64 mb-4" />
        <div className="p-4 flex flex-col gap-6">
          
          {/* Image Upload Section */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          {/* Video URL Input */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Video Upload Section */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          {/* Audios Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-8 w-24" />
            </div>

            {/* Audio Field Items */}
            {[1, 2].map((item) => (
              <div key={item} className="p-2 rounded flex items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <div className="flex items-center gap-3">
                  {/* Radio Options */}
                  <div className="flex flex-row items-center gap-3">
                    {[1, 2].map((radio) => (
                      <div key={radio} className="flex items-center gap-2">
                        <Skeleton circle className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                  {/* Delete Button */}
                  <Skeleton circle className="h-5 w-5" />
                </div>
              </div>
            ))}
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

export default MediaSkeleton;