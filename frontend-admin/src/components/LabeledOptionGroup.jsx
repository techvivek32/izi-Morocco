import { cn } from "../lib/utils";
import { getNestedError } from "../utils/common";

const LabeledOptionGroup = ({
  name,
  labelName,
  options = [],
  selected = [],
  onChange = () => {},
  required = false,
  type = "radio",
  register,
  _class = "",
  errors = {},
}) => {
  const error = getNestedError(errors, name)?.message;
  const handleInputChange = (value) => {
    if (type === "checkbox") {
      const updated = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      onChange(updated);
    } else {
      const updated = selected.includes(value) ? [] : [value];
      onChange(updated);
    }
  };

  const getInputProps = (opt) => {
    if (register) return register(name);
    return {
      checked: selected.includes(opt.value),
      onChange: () => handleInputChange(opt.value),
    };
  };

  return (
    <div className={cn("w-full flex flex-col gap-1", _class)}>
      {labelName && (
        <label
          htmlFor={labelName}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}

      <div className="flex w-full gap-3 flex-wrap h-full overflow-y-scroll scrollbar-hide">
        {options.map((opt) => (
          <label key={opt.value} className="cursor-pointer h-full">
            <input
              type={type}
              name={name}
              value={opt.value}
              {...getInputProps(opt)}
              className="peer hidden"
            />
            <div
              className="border px-3 py-1.5 rounded-lg 
                border-accent/5 text-accent
                peer-checked:bg-light-accent peer-checked:border-accent/50 peer-checked:font-medium text-sm h-full flex items-center justify-center hover:border-accent/50 duration-300"
            >
              {opt.label}
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-xs text-red-600 text-start ml-1 mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default LabeledOptionGroup;
