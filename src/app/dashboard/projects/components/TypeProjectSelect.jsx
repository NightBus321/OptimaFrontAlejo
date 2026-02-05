import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
export default function TypeProjectSelect({ onSelectChange }) {
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
      label="Selecciona tipología"
    >
      <Option value="Docencia Servicio">Docencia Servicio</Option>
      <Option value="Medios Digitales">Medios Digitales</Option>
      <Option value="Institucional">Institucional</Option>
      <Option value="Externo">Externo</Option>
    </Select>
  );
}
