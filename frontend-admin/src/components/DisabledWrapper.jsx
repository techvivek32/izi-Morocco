import { cn } from "../lib/utils";

const DisabledWrapper = ({
  children,
  where,
  className = "",
  childrenClassName = "",
}) => {
  return (
    <div
      className={cn(
        className,
        where ? "cursor-not-allowed opacity-75" : "cursor-default",
        ""
      )}
    >
      <div
        className={cn(
          childrenClassName,
          where ? "pointer-events-none" : "pointer-events-auto"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DisabledWrapper;
