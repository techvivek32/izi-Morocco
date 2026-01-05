import { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import CalanderIcon from "../../svgs/CalanderIcon";
import { Controller } from "react-hook-form";
import { getNestedError } from "../../../utils/common";
import { splitDate } from "../../../utils/dateAndTime";

const AntDatePicker = ({
  id,
  name,
  labelName = "Date",
  required = false,
  control,
  onChange: propOnChange = () => {},
  errors = {},
  disabled = false,
  placeholder = "DD/MM/YYYY",
  showTime = false,
}) => {
  const error = getNestedError(errors, name)?.message;
  const [localValue, setLocalValue] = useState(null);

  const commonClasses = `
  w-full
  ant-date-picker
  !h-10
  
  /* Input field */
  [&_.ant-picker-input>input]:!h-10
  [&_.ant-picker-suffix]:cursor-pointer
  
  /* Normal state */
  [&_.ant-picker]:border

  /* Hover state */
  [&.ant-picker-outlined]:!border
  [&.ant-picker-outlined:hover]:!border
  [&.ant-picker-outlined:hover]:!border-accent
  
  /* Focus state */
  [&.ant-picker-focused]:!border-accent
  [&.ant-picker-focused]:!shadow-none
  [&.ant-picker-focused]:!outline-none
  
  
  /* Base styles */
  [&_.ant-picker]:rounded-lg
  [&_.ant-picker]:shadow-none
  [&_.ant-picker]:!border-accent/50
  focus:[&_.ant-picker]:shadow-none
  
  /* Calendar icon */
  [&_.ant-picker-suffix]:text-accent
  [&_.ant-picker-suffix]:transition-all
`;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={labelName}
        className="block text-sm font-medium text-gray-900"
      >
        {labelName}
        {required && <span className="text-red-600"> *</span>}
      </label>

      {control ? (
        // ✅ controlled RHF mode using `control `
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              id={id}
              allowClear
              disabled={disabled}
              format={["D/M/YYYY HH:mm:ss", "DD/MM/YYYY HH:mm:ss"]}
              placeholder={placeholder}
              inputReadOnly={false}
              value={field.value ? dayjs(field.value, "D/M/YYYY HH:mm:ss") : null}
              onChange={(date, dateString) => {
                field.onChange(splitDate(dateString)); // updates RHF
                propOnChange?.(date, splitDate(dateString)); // for custom logic like setting age
              }}
              className={commonClasses}
              suffixIcon={
                <span className="ant-picker-suffix cursor-pointer">
                  <CalanderIcon variant="dark" />
                </span>
              }
              onKeyDown={handleKeyDown}
              showTime={showTime}
            />
          )}
        />
      ) : (
        // ✅ Controlled standalone version (non-RHF)
        <DatePicker
          id={id}
          format={["D/M/YYYY HH:mm:ss", "DD/MM/YYYY HH:mm:ss"]}
          allowClear
          disabled={disabled}
          placeholder={placeholder}
          inputReadOnly={false}
          value={localValue ? dayjs(localValue, "D/M/YYYY HH:mm:ss") : null}
          onChange={(date, dateString) => {
            setLocalValue(splitDate(dateString));
            propOnChange(date, splitDate(dateString));
          }}
          className={commonClasses}
          suffixIcon={
            <span className="ant-picker-suffix cursor-pointer">
              <CalanderIcon variant="dark" />
            </span>
          }
          onKeyDown={handleKeyDown}
          showTime={showTime}
        />
      )}

      {error && (
        <p className="text-xs text-red-600 text-start ml-1 mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default AntDatePicker;
