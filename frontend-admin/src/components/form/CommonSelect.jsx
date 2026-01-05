import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { getNestedError } from "../../utils/common";

const CommonSelect = ({
  name,
  control,
  labelName,
  placeholder,
  defaultValue,
  required = false,
  errors = {},
  options,
}) => {
  const error = getNestedError(errors, name)?.message;
  return (
    <div>
      <label
        htmlFor={labelName}
        className="block text-sm font-medium text-gray-900"
      >
        {labelName}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="mt-1">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p className="top-full text-[10px] lg:text-xs text-red-600 text-start text-nowrap">
          {error}
        </p>
      )}
    </div>
  );
};

export default CommonSelect;
