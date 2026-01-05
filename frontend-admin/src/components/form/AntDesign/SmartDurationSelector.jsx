import { useState } from "react";
import AntSearchableSelector from "./AntSearchableSelector";

const SmartDurationSelector = ({
  id,
  name,
  control,
  labelName = "Duration",
  required = false,
  errors = {},
  disabled = false,
  defaultValue = "",
  Units,
  onChange: propOnChange = () => {},
  ...rest
}) => {
  const [searchValue, setSearchValue] = useState(defaultValue);

  // Check if input is just a number
  const isNumberOnly = /^\d+$/.test(searchValue);

  // Generate options only when pure number is entered
  const dynamicOptions = isNumberOnly
    ? Units.map((unit) => ({
        value: `${searchValue} ${unit.value}`,
        label: `${searchValue} ${unit.label}`,
      }))
    : [];

  return (
    <AntSearchableSelector
      id={id}
      name={name}
      control={control}
      labelName={labelName}
      required={required}
      filterSort={false}
      errors={errors}
      disabled={disabled}
      placeholder="Enter duration (e.g. 2 days)"
      options={dynamicOptions}
      value={searchValue}
      onSearch={setSearchValue}
      onChange={(value) => {
        setSearchValue(value);
        propOnChange(value);
      }}
      showSearch={true}
      filterOption={false}
      suffixIcon={null}
      open={isNumberOnly}
      {...rest}
    />
  );
};

export default SmartDurationSelector;
