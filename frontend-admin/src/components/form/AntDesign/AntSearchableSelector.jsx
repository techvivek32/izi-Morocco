import { Select } from "antd";
import { Controller } from "react-hook-form";
import { getNestedError } from "../../../utils/common";
import { cn } from "../../../lib/utils";

const AntSearchableSelector = ({
  id,
  name,
  labelName = "",
  required = false,
  control,
  onChange: propOnChange = () => {},
  errors = {},
  disabled = false,
  placeholder = "Select an option",
  options = [],
  message,
  showSearch = true,
  isCompressed = false,
  defaultValue = null,
  filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase()),
  ...rest
}) => {
  const error = getNestedError(errors, name)?.message;

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const commonClasses = `
    w-full 
    ant-multi-select 
    !capitalize
    !min-h-10
    [&_.ant-select-selector]:!min-h-10
    [&_.ant-select-arrow]:cursor-pointer 

    
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
    <div
      className={cn(
        "relative max-h-14 flex flex-col gap-1",
        isCompressed ? "w-[10rem]" : "w-full"
      )}
    >
      <label
        htmlFor={labelName}
        className="block text-sm font-medium text-gray-900"
      >
        {labelName}
        {required && <span className="text-red-600"> *</span>}
      </label>

      {control ? (
        // ✅ Controlled RHF mode using `control`
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              id={id}
              showSearch={showSearch}
              placeholder={placeholder}
              disabled={disabled}
              optionFilterProp="children"
              filterOption={filterOption}
              filterSort={filterSort}
              options={options}
              onChange={(value, option) => {
                field.onChange(value); // updates RHF
                propOnChange?.(value, option); // for custom logic
              }}
              className={commonClasses}
              aria-label={labelName}
              virtual={false}
              getPopupContainer={(triggerNode) => triggerNode.parentNode} // Prevents portal issues
              {...rest}
              notFoundContent={
                !options.length
                  ? message || (
                      <p className="text-gray-400 text-xs lg:text-sm font-bold">
                        No options available.
                      </p>
                    )
                  : null
              }
            />
          )}
        />
      ) : (
        // ✅ Controlled standalone version (non-RHF)
        <Select
          id={id}
          showSearch={showSearch}
          placeholder={placeholder}
          disabled={disabled}
          optionFilterProp="children"
          filterOption={filterOption}
          filterSort={filterSort}
          defaultValue={defaultValue}
          options={options}
          onChange={(value, option) => {
            propOnChange?.(value, option);
          }}
          getPopupContainer={(triggerNode) => triggerNode.parentNode} // Prevents portal issues
          className={commonClasses}
          aria-label={labelName}
          virtual={false}
          {...rest}
          notFoundContent={!options.length ? message : null}
        />
      )}

      {error && (
        <p className="text-[10px] lg:text-xs text-red-600 text-start ml-1 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default AntSearchableSelector;
