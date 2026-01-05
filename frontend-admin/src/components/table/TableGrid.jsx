import { cn } from "../../lib/utils";
import TableHeader from "./TableHeader";
// import Pagination from "../Pagination";
import TableLoader from "./TableLoader";
import TableData from "./TableData";
import { EmptyData } from "../EmptyData";
import Pagination from "../Pagination";

const TableGrid = ({
  data,
  columns,
  isLoading = false,
  isCompressView = false,
  allowPagination = false,
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  pageLimit = 1,
  onPageChange = () => {},
  handleChecked,
  className,
  from = "",
}) => {
  return (
    <div
      className={cn(
        isCompressView
          ? "max-h-fit overflow-y-scroll scrollbar-hide"
          : "max-h-auto",
        "relative border border-accent rounded-lg w-full h-full flex flex-col divide-y divide-accent",
        className
      )}
    >
      {isLoading ? (
        <TableLoader columns={columns} isCompressView={isCompressView} />
      ) : data?.length ? (
        <>
          <TableHeader data={columns} isCompressView={isCompressView} />{" "}
          <TableData
            columns={columns}
            data={data}
            isCompressView={isCompressView}
            handleChecked={handleChecked}
            from={from}
          />
          {allowPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              pageLimit={pageLimit}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : (
        <EmptyData isCompressView={isCompressView} from={from} />
      )}
    </div>
  );
};

export default TableGrid;
