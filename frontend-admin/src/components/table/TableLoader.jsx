import { cn } from "../../lib/utils";
import { HeaderType } from "../../utils/types";
import Skeleton from "../Skeleton";

const TableLoader = ({ columns,skeletonRows=5,isCompressView }) => {
  return (
    <div>
      {/* Skeleton Table Header */}
      <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
        {columns.map((col, index) => (
          <Skeleton
            key={`header-${index}`}
            className={cn(col._class || "col-span-1", "h-5 mx-2")}
          />
        ))}
      </div>

      {/* Skeleton Rows */}
      {[...Array(skeletonRows)].map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={cn(
            isCompressView ? "p-0" : "p-4",
            "grid grid-cols-12 items-center text-sm border-b border-gray-200"
          )}
        >
          {columns.map((col, colIndex) => {
            const { _class = "col-span-1", type } = col;

            // Render different skeleton types based on column type
            switch (type) {
              case HeaderType.statusBudge:
              case HeaderType.roleBudge:
                return (
                  <div key={`cell-${rowIndex}-${colIndex}`} className={_class}>
                    <div className="flex items-center gap-2 px-2 py-1">
                      <Skeleton className="w-3 h-3 rounded-full" />
                      <Skeleton className="w-16 h-4" />
                    </div>
                  </div>
                );

              case HeaderType.tooltip:
              case HeaderType.longDesc:
                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={cn(_class, "flex items-center gap-1 px-2 py-2")}
                  >
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                  </div>
                );

              case HeaderType.action:
                return (
                  <div key={`cell-${rowIndex}-${colIndex}`} className={_class}>
                    <div className="flex gap-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                  </div>
                );

              case HeaderType.currencyType:
                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={cn(
                      _class,
                      "flex items-baseline gap-1 px-2 py-2"
                    )}
                  >
                    <Skeleton className="w-12 h-4" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                  </div>
                );

              case HeaderType.checkbox:
                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={cn(_class, "px-2 py-2")}
                  >
                    <Skeleton className="w-5 h-5 rounded-md" />
                  </div>
                );

              default:
                return (
                  <Skeleton
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={cn(_class, "h-5 mx-2 my-1")}
                  />
                );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default TableLoader;
