import { cn } from "../../lib/utils";
import { getNestedError } from "../../utils/common";

const CommonInput = ({
  id,
  name,
  value = "",
  labelName = "",
  type = "text",
  errors,
  register,
  disabled = false,
  onChange = () => {},
  placeholder = " ",
  inputAsValue = false,
  title = "",
  required = false,
  isCompress = false,
}) => {
  const isRegisterFunction = typeof register === "function";
  const isHookForm = !!register;

  let inputProps = {};

  switch (true) {
    case isHookForm && isRegisterFunction:
      // Case 1: Normal RHF register
      inputProps =
        type === "number"
          ? register(name, { valueAsNumber: true })
          : register(name);
      break;

    case isHookForm && !isRegisterFunction:
      // Case 2: Pre-registered object
      inputProps = register;
      break;

    default:
      // Case 3: Regular controlled input
      inputProps = {
        value: value ?? "",
        onChange: (e) => {
          const val =
            type === "number"
              ? e.target.value === ""
                ? null
                : Number(e.target.value)
              : e.target.value;
          onChange(val);
        },
      };
  }
  const errorMessage = getNestedError(errors, name || inputProps.name)?.message;

  return (
    <div className="relative w-full text-accent flex items-center">
      <p
        className={cn(
          "text-nowrap text-light-primary",
          isCompress ? "text-xs" : "text-xs lg:text-sm"
        )}
      >
        {title && title}
      </p>
      <div className="w-full flex flex-col gap-1">
        <label
          htmlFor={labelName}
          className={cn(
            "block font-medium text-gray-900",
            isCompress ? "text-xs" : "text-sm"
          )}
        >
          {labelName}
          {required && <span className="text-red-600"> *</span>}
        </label>

        <input
          type={type}
          id={id}
          {...inputProps}
          placeholder={placeholder}
          disabled={disabled || inputAsValue}
          className={cn(
            "block rounded-md bg-white px-3 py-2  text-gray-800 outline outline-gray-300 placeholder:text-gray-400 hover:outline hover:outline-accent duration-300 focus:outline focus:outline-accent disabled:opacity-50 disabled:cursor-not-allowed w-full",
            isCompress ? "text-xs" : "text-base sm:text-sm"
          )}
        />

        {errorMessage && (
          <p
            className={cn(
              "top-full text-red-600 text-start text-nowrap",
              isCompress ? "text-[8px]" : "text-[10px] lg:text-xs"
            )}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommonInput;
