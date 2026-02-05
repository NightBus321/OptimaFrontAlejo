import {
  Typography,
  Input,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function InputField({ header, label, value, type, handleChange }) {
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
      <Typography className="-mb-2" variant="h6">
        {header}
      </Typography>
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

export function SelectInputField({
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
      <Typography className="-mb-2" variant="h6">
        {header}
      </Typography>
      <Select size="lg" label={label} value={value} onChange={handleChange}>
        {options.map((value) => (
          <Option value={value} key={value}>
            {value}
          </Option>
        ))}
      </Select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
}

export function ActiveSwitch({ value, handleChange }) {
  console.log("Value in switch" + value);
  return (
    <Switch
      defaultChecked={value}
      value={value}
      onChange={handleChange}
      ripple={false}
      className="h-full p-2 mt-0 w-full checked:bg-[#2ec946]"
      containerProps={{
        className: "w-11 h-6",
      }}
      circleProps={{
        className: "before:hidden mt-0 left-0.5 border-none",
      }}
    />
  );
}
