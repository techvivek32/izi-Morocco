import HorizontalLine from "../lines/HorizontalLine";
import VerticalLine from "../lines/VerticalLine";

const NormalTableView = ({ data }) => {
  const entries = Object.entries(data);
  return (
    <div className="bg-white border border-light-accent rounded-lg px-2">
      {entries.map(([key, value], idx) => (
        <div key={key}>
          <div className="grid grid-cols-3 items-center p-1 lg:p-2">
            <span className="min-w-32 text-accent text-sm lg:text-base">
              {key}
            </span>
            <div className="col-span-2 flex items-center">
              <VerticalLine />
              {Array.isArray(value) ? (
                value.map((v, i) => (
                  <span
                    key={i}
                    className="ml-2 flex items-center text-light-primary text-sm lg:text-base"
                  >
                    {i !== 0 && <VerticalLine />}
                    <span className="ml-2">{v}</span>
                  </span>
                ))
              ) : (
                <span className="ml-2 text-light-primary text-sm lg:text-base">
                  {value}
                </span>
              )}
            </div>
          </div>
          {idx !== entries.length - 1 && <HorizontalLine />}
        </div>
      ))}
    </div>
  );
};

export default NormalTableView;
