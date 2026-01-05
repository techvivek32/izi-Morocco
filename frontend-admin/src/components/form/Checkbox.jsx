import { cn } from "../../lib/utils";
import { getNestedError } from "../../utils/common";

const CheckBox = ({
  checked = false,
  labelName = "",
  className = "",
  handleChecked = () => {},
  disabled = false,
  required = false,
  errors = {},
  name,
}) => {
  const handleCheckboxChange = () => {
    handleChecked();
  };

  const errorMessage = name && getNestedError(errors, name)?.message;

  return (
    <div>
      <label
        className={cn(
          "flex flex-col gap-1 w-auto cursor-pointer",
          disabled && "opacity-60 cursor-not-allowed",
          className
        )}
      >
        <span
          htmlFor={labelName}
          className="block text-sm font-medium text-gray-900 w-full text-nowrap"
        >
          {labelName}
          {required && <span className="text-red-600"> *</span>}
        </span>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          className="peer hidden"
        />
        <div
          className={cn(
            `w-5 h-5 flex items-center justify-center rounded-md border 
           bg-white transition 
          peer-checked:bg-accent/10 peer-checked:border-accent/40
        `,
            disabled ? "border-light-accent" : "border-accent"
          )}
        >
          {/* Check icon */}
          <svg
            className={`w-3 h-3 text-accent/90 transition-opacity duration-200 ${
              checked ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </label>
      {errorMessage && (
        <p className="top-full text-[10px] lg:text-xs text-red-600 text-start text-nowrap">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CheckBox;
