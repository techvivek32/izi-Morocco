import { cn } from "../lib/utils";

const Skeleton = ({ className, circle = false, ...props }) => (
  <div
    className={cn(
      "animate-pulse bg-gray-200 rounded-md",
      circle ? "rounded-full" : "rounded",
      className
    )}
    {...props}
  />
);

export default Skeleton;
