const Toggle = ({
  leftSideLabel = "",
  rightSideLabel = "",
  isChecked,
  handleCheckboxChange,
  toggleOffClass = "bg-red-500/80",
  toggleOnClass = "bg-green-500/80",
  isDisabled = false,
  counts = { doneCount: 0, notDoneCount: 0 },
}) => {
  return (
    <>
      <label
        className={`flex text-base ${
          isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } select-none gap-0.5 items-center`}
      >
        {leftSideLabel && (
          <span className="text-sm mr-2">
            {leftSideLabel} ({counts?.notDoneCount})
          </span>
        )}
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
            disabled={isDisabled}
          />
          <div
            className={`box block h-6 w-10 rounded-full ${
              isChecked ? toggleOnClass : toggleOffClass
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition-all duration-200 ${
              isChecked ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
        {rightSideLabel && (
          <span className="text-sm ml-2">
            {rightSideLabel} ({counts?.doneCount})
          </span>
        )}
      </label>
    </>
  );
};

export default Toggle;
