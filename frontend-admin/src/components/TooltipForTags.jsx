import { cn } from "../lib/utils";
import TooltipWrapper from "./TooltipWrapper";

const TooltipForTags = ({ _class, data = [] }) => {
  return (
    //don't write overflow-x: scroll, it will break the tooltip
    <div
      className={cn(
        _class,
        "cursor-pointer relative whitespace-nowrap scrollbar-hide"
      )}
    >
      {data.length === 0 && "No tags"}
      {data.length <= 1 ? (
        data.slice(0, 1).join(", ")
      ) : (
        <TooltipWrapper
          id={"tooltip-" + data.join("-")}
          content={data.join(", ")}
        >
          {data.slice(0, 1).join(", ")}...
        </TooltipWrapper>
      )}
    </div>
  );
};

export default TooltipForTags;
