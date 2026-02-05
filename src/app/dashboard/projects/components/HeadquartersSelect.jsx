import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";  
export default function HeadquartersSelect({ onSelectChange }) {
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
        label="Selecciona la sede"
      >
        <Option value="Medellín">Medellín</Option>
        <Option value="Pereira">Pereira</Option>
      </Select>
    );
  }