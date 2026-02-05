import { Select, Option } from "@material-tailwind/react";
export default function FilterBySelection({
  label,
  value,
  handleChange,
  options,
}) {
  return (
    <>
      <Select size="lg" label={label} value={value} onChange={handleChange}>
        {options.map((value) => (
          <Option value={value} key={`${label}${value}`}>
            {value}
          </Option>
        ))}
      </Select>
    </>
  );
}
