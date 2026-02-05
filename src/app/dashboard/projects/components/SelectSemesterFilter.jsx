import Select from "react-select";
import { useState } from "react";
const minOffset = 0;
const maxOffset = 8;

const year = new Date().getFullYear();

const options = [];

for (let i = minOffset; i <= maxOffset; i++) {
  const yearOption = year - i;
  options.push({ value: yearOption + "-2", label: yearOption + "-2" });
  options.push({ value: yearOption + "-1", label: yearOption + "-1" });
}

export default function SelectSemesterFilter({ onSelectChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (event) => {
    setSelectedValue(event);
    onSelectChange(event);
  };

  return (
    <div className="w-full" style={{ position: "relative", zIndex: 100 }}>
      <Select
        isClearable={true}
        value={selectedValue}
        onChange={handleChange}
        className="basic-single"
        placeholder="Buscar por cohorte"
        name="color"
        options={options}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#e78015",
            primary: "#e78015",
          },
        })}
      />
    </div>
  );
}
