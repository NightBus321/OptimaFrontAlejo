import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";

const minOffset = 0;
const maxOffset = 6;

const year = new Date().getFullYear();
export default function YearSelect({ onSelectChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event);
    onSelectChange(event);
  };

  const options = [];

  for (let i = minOffset; i <= maxOffset; i++) {
    const yearOption = year - i;
    options.push(<Option value={yearOption}>{yearOption}</Option>);
  }
  return (
    <Select
      error={selectedValue === null ? true : false}
      value={selectedValue}
      onChange={handleChange}
      size="md"
      label="Selecciona el año"
    >
      {options}
    </Select>
  );
}
