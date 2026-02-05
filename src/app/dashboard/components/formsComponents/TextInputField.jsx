import { useState, useEffect } from "react";

import { Typography, Input } from "@material-tailwind/react";

export default function InputField({
  header,
  label,
  value,
  type,
  handleChange,
}) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (value.trim() === "") {
      setError("Este campo es obligatorio");
    } else if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Por favor, ingresa un correo electrónico válido");
    } else {
      setError("");
    }
  }, [value, type]);

  return (
    <>
      <Typography variant="h6">{header}</Typography>
      <Input
        label={label}
        size="lg"
        type={type}
        value={value}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
}
