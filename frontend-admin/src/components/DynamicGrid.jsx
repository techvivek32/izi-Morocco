import Split from "react-split-grid";

const DynamicGrid = ({ children1, childrend2 }) => {
  return (
    <Split minSize={100} cursor="col-resize">
      {({ getGridProps, getGutterProps }) => (
        <div className="wrapper" {...getGridProps()}>
          {children1}
          <div className="resize-gutter" {...getGutterProps("column", 1)} />
          {childrend2}
        </div>
      )}
    </Split>
  );
};

export const DynamicGridRow = ({ children1, childrend2 }) => {
  return (
    <Split minSize={100} cursor="col-resize">
      {({ getGridProps, getGutterProps }) => (
        <div className="wrapper-2" {...getGridProps()}>
          {children1}
          <div className="resize-gutter-2" {...getGutterProps("row", 1)} />
          <div>{childrend2}</div>
        </div>
      )}
    </Split>
  );
};

export default DynamicGrid;
