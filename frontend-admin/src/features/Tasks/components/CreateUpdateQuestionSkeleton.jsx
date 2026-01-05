import Skeleton from "../../../components/Skeleton";


const CreateUpdateQuestionSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-7 w-64 mb-4" />
        <div className="p-4 flex flex-col gap-6">
          
          {/* Task Name Input */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Task Description Rich Text Editor */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>

          {/* Answer Type Selector */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Options Section - Conditionally shown for MCQ types */}
          <div className="border border-accent/25 rounded-lg p-4 flex flex-col gap-4">
            <Skeleton className="h-4 w-48 mb-2" />
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton circle className="h-5 w-5" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex gap-4">
                  <Skeleton circle className="h-10 w-10" />
                  <Skeleton circle className="h-10 w-10" />
                </div>
              </div>
            ))}
          </div>

          {/* Correct Answer Input - Conditionally shown for text/number types */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Puzzle Selector - Conditionally shown for puzzle type */}
          <div className="flex items-end gap-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Tags Selector */}
          <div className="flex w-full items-end gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Points Input */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
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

export default CreateUpdateQuestionSkeleton;