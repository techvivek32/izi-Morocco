import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";

const TooltipWrapper = ({ content, children, visible = true, className }) => {
  if (!visible) {
    return <>{children}</>;
  }

  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default TooltipWrapper;
