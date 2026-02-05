import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
export default function SelectSemester({ onSelectChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event);
    onSelectChange(event);
  };
  return (
    <Select
      error={selectedValue === null ? true : false}
      value={selectedValue}
      onChange={handleChange}
      size="md"
      label="Selecciona el semestre"
    >
      <Option value="1">1</Option>
      <Option value="2">2</Option>
    </Select>
  );
}
