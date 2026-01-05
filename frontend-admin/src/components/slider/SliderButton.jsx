import { cn } from "../../lib/utils";
import TooltipWrapper from "../TooltipWrapper";

const SliderButton = ({
  id,
  label: name,
  icon: Icon,
  isActive,
  navigateSidebar,
  to = "",
  isCollapsed,
  className = "",
  onClick = () => {},
}) => {
  const btnClass =
    isActive === id ? "bg-accent" : "bg-accent/50 hover:bg-accent duration-300";

  return (
    <TooltipWrapper content={name} place="right" visible={isCollapsed}>
      <div className={cn(className, "rounded-lg p-0.5")}>
        <div
          className={cn(
            `p-2 lg:p-3 text-white cursor-pointer w-full rounded-lg flex items-center transition-all bg-accent`,
            isCollapsed ? "justify-center" : "justify-start",
            btnClass
          )}
          onClick={() => navigateSidebar(to, id, onClick)}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            {!isCollapsed && <span className="whitespace-nowrap">{name}</span>}
          </div>
        </div>
      </div>
    </TooltipWrapper>
  );
};

export default SliderButton;
