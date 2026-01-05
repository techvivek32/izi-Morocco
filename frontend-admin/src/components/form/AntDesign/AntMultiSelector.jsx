import { useState } from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";
import { getNestedError } from "../../../utils/common";

const AntMultiSelector = ({
  id,
  name,
  labelName = "Select",
  required = false,
  control,
  onChange: propOnChange = () => {},
  errors = {},
  disabled = false,
  placeholder = "Select options",
  options = [],
  defaultValue = [],
  showSearch = true,
  filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase()),
  size = "middle",
  maxTagCount = "responsive",
  mode = "multiple",
  ...rest
}) => {
  const error = getNestedError(errors, name)?.message;
  const [localValue, setLocalValue] = useState(defaultValue);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const commonClasses = `
    w-full 
    ant-multi-select 
    !min-h-10
    [&_.ant-select-selector]:!min-h-10
    [&_.ant-select-arrow]:cursor-pointer 
    [&_.ant-select-selection-wrap]:!m-2
    [&_.ant-select-selection-wrap]:!mb-0
    [&_.ant-select-selection-item]:!bg-accent/25

    
    /* Focus state */
    [&.ant-select-focused_.ant-select-selector]:!border-accent
    [&.ant-select-focused_.ant-select-selector]:!shadow-none
    [&.ant-select-focused_.ant-select-selector]:!outline-none
    
    /* Hover state */
    hover:[&_.ant-select-selector]:!border-accent
    
    /* Base styles */
    [&_.ant-select-selector]:rounded-lg
    [&_.ant-select-selector]:shadow-none
    focus:[&_.ant-select-selector]:shadow-none
  `;

  return (
    <div className="relative w-full text-accent max-h-14">
      <label
        htmlFor={labelName}
        className="block text-sm font-medium text-gray-900 mb-1"
      >
        {labelName}
        {required && <span className="text-red-600"> *</span>}
      </label>

      {control ? (
        // ✅ Controlled RHF mode using `control`
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              {...field}
              id={id}
              mode={mode}
              size={size}
              showSearch={showSearch}
              placeholder={placeholder}
              disabled={disabled}
              optionFilterProp="children"
              filterOption={filterOption}
              filterSort={filterSort}
              options={options}
              maxTagCount={maxTagCount}
              onChange={(value, option) => {
                field.onChange(value);
                propOnChange?.(value, option);
              }}
              className={commonClasses}
              aria-label={labelName}
              getPopupContainer={(triggerNode) => triggerNode.parentNode} // Prevents portal issues
              virtual={false}
              maxCount={5}
              {...rest}
            />
          )}
        />
      ) : (
        // ✅ Controlled standalone version (non-RHF)
        <Select
          id={id}
          mode={mode}
          size={size}
          showSearch={showSearch}
          placeholder={placeholder}
          disabled={disabled}
          value={localValue}
          defaultValue={defaultValue}
          optionFilterProp="children"
          filterOption={filterOption}
          filterSort={filterSort}
          options={options}
          maxTagCount={maxTagCount}
          onChange={(value, option) => {
            setLocalValue(value);
            propOnChange?.(value, option);
          }}
          className={commonClasses}
          aria-label={labelName}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          virtual={false}
          maxCount={5}
          {...rest}
        />
      )}

      {error && (
        <p className="text-xs text-red-600 text-start ml-1 mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default AntMultiSelector;
