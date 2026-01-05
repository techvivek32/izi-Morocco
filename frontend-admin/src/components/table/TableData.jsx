import { useMemo } from "react";
import TableRow from "./TableRow";

const TableData = ({ data, columns, isCompressView, handleChecked }) => {
  const renderedState = useMemo(() => {
    return data.map((ele) => (
      <TableRow
        key={ele?._id}
        data={ele}
        columns={columns}
        isCompressView={isCompressView}
        handleChecked={handleChecked}
      />
    ));
  }, [data, columns, isCompressView, handleChecked]);
  return <>{renderedState}</>;
};

export default TableData;
