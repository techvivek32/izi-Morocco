import { useState } from "react";
import { ColorPicker } from "antd";
import { Controller } from "react-hook-form";
import { getNestedError } from "../../../utils/common";

const ColorPickerInput = ({
  id,
  name,
  labelName,
  required = false,
  control,
  onChange: propOnChange = () => {},
  errors = {},
  disabled = false,
  defaultValue = "rgb(249,87,56)",
  showText = true,
  format = "hex",
  ...rest
}) => {
  const error = getNestedError(errors, name)?.message;
  const [localValue, setLocalValue] = useState(defaultValue);

  const commonClasses = `
    w-fit 
    mt-1
    [&_.ant-color-picker-trigger]:!border-accent/50
    [&_.ant-color-picker-trigger]:border
    [&_.ant-color-picker-trigger]:rounded-lg
    [&_.ant-color-picker-trigger]:shadow-none
    
    /* Focus state */
    [&.ant-color-picker-focused_.ant-color-picker-trigger]:!border-accent
    [&.ant-color-picker-focused_.ant-color-picker-trigger]:!shadow-none
    [&.ant-color-picker-focused_.ant-color-picker-trigger]:!outline-none
    
    /* Hover state */
    hover:[&_.ant-color-picker-trigger]:!border-accent
  `;

  const handleColorChange = (color, hex) => {
    const value = format === "hex" ? hex : color.toRgbString();
    return value;
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor={id || name}
        className="block text-sm font-medium text-gray-900"
      >
        {labelName}
        {required && <span className="text-red-600"> *</span>}
      </label>

      {control ? (
        // ✅ Controlled RHF mode
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <ColorPicker
              {...field}
              id={id || name}
              disabled={disabled}
              defaultValue={defaultValue}
              value={field.value}
              onChange={(color, hex) => {
                const value = handleColorChange(color, hex);
                field.onChange(value);
                propOnChange?.(value, color);
              }}
              showText={showText}
              className={commonClasses}
              aria-label={labelName}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              {...rest}
            />
          )}
        />
      ) : (
        // ✅ Controlled standalone version with local state
        <ColorPicker
          id={id || name}
          disabled={disabled}
          value={localValue}
          defaultValue={defaultValue}
          onChange={(color, hex) => {
            const value = handleColorChange(color, hex);
            setLocalValue(value);
            propOnChange?.(value, color);
          }}
          showText={showText}
          className={commonClasses}
          aria-label={labelName}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          {...rest}
        />
      )}

      {error && (
        <p className="text-xs text-red-600 text-start ml-1 mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default ColorPickerInput;
