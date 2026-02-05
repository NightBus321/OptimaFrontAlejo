import { useState, useEffect } from "react";

import { Typography, Select, Option } from "@material-tailwind/react";

export default function SelectInputField({
  header,
  label,
  value,
  handleChange,
  options,
}) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (value.trim() === "") {
      setError("Debes seleccionar una opción");
    } else {
      setError("");
    }
  }, [value]);
  return (
    <>
      <Typography variant="h6">{header}</Typography>
      <Select size="lg" label={label} value={value} onChange={handleChange}>
        {options.map((value) => (
          <Option value={value} key={`${header}${value}`}>
            {value}
          </Option>
        ))}
      </Select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
}
