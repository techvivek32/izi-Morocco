import { cn } from "../../lib/utils";
import { getNestedError } from "../../utils/common";

const CommonTextarea = ({
  id,
  name,
  labelName = "",
  required = false,
  className = "",
  textareaClassName = "",
  errors,
  register = () => {},
  placeholder,
  children,
  onKeyDown = () => {},
}) => {
  const error = getNestedError(errors, name)?.message;
  return (
    <div className={cn(`relative w-full text-accent z-0`, className)}>
      <label
        htmlFor={labelName}
        className="block text-sm font-medium text-gray-900"
      >
        {labelName}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <textarea
        placeholder={placeholder || " "}
        onKeyDown={onKeyDown}
        id={id}
        name={name}
        {...register(name)}
        required={required}
        className={cn(
          "mt-1 block rounded-md bg-white px-3 py-2 text-base text-gray-800 outline outline-gray-300 placeholder:text-gray-400 hover:outline hover:outline-accent duration-300 focus:outline focus:outline-accent sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full",
          textareaClassName
        )}
      />

      {error && (
        <p className="top-full text-[10px] lg:text-xs text-red-600 text-start text-nowrap">
          {error}
        </p>
      )}
      {children && children}
    </div>
  );
};

export default CommonTextarea;
