import { cn } from "../../lib/utils";

const TableHeader = ({
  data,
  isCompressView,
  extraClass = "",
  isSticky = false,
}) => {
  return (
    <div
      className={cn(
        isCompressView ? "p-0 text-sm" : "p-2 text-base",
        isSticky && "sticky top-0",
        "grid grid-cols-12 font-semibold text-xs lg:text-sm bg-accent/90 rounded-t-lg text-white",
        extraClass
      )}
    >
      {data.map((header, idx) => {
        const { name, _class = "col-span-1" } = header;
        return (
          <div
            key={idx}
            className={cn(
              _class,
              "px-2 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide"
            )}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
