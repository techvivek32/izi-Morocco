import Skeleton from "../../../components/Skeleton";


const CommentsSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Header */}
            <div className="mb-6">
                <Skeleton className="h-7 w-64 mb-4" />
                <div className="p-4 flex flex-col gap-6">

                    {/* Hints Rich Text Editor */}
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-40 w-full rounded-lg" />
                    </div>

                    {/* Comments After Correction Rich Text Editor */}
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-40 w-full rounded-lg" />
                    </div>

                    {/* Comments After Rejection Rich Text Editor */}
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-44" />
                        <Skeleton className="h-40 w-full rounded-lg" />
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

export default CommentsSkeleton;