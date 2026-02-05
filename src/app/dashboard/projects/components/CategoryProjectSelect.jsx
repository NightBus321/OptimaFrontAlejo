import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
export default function CategoryProjectSelect({ onSelectChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event);
    console.log(event);
    onSelectChange(event);
  };
  return (
    <Select
      error={selectedValue === null ? true : false}
      value={selectedValue}
      onChange={handleChange}
      size="md"
      label="Selecciona categoría"
    >
      <Option value="Cualitativo">Cualitativo</Option>
      <Option value="Cuantitativo">Cuantitativo</Option>
    </Select>
  );
}
