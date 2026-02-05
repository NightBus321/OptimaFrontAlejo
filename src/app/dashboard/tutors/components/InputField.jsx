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
  const handleNumberChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || /^[0-9]+$/.test(inputValue)) {
      handleChange(e); // Solo permitir números positivos
    }
  };

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
       onChange={type === "number" ? handleNumberChange : handleChange} 
       className={`w-full h-12 $`} 
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
}

export function OptionalInputField({ label, value, type, handleChange }) {
  return (
    <>
      <Input
        label={label}
        size="lg"
        type={type}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}

export function SelectInputField({ header, label, value, handleChange }) {
  const [error, setError] = useState("");
  const [showOtherField, setShowOtherField] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  useEffect(() => {
    if (value.trim() === "") {
      setError("Debes seleccionar una opción");
    } else {
      setError("");
    }
  }, [value]);

  const handleSelectChange = (newValue) => {
    handleChange(newValue);
    if (newValue === "Otro") {
      setShowOtherField(true);
    } else {
      setShowOtherField(false);
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
    handleChange(event.target.value);
  };

  return (
    <>
      <Typography className="-mb-2" variant="h6">
        {header}
      </Typography>
      <Select
        size="lg"
        label={label}
        value={value}
        onChange={handleSelectChange} 
        className={`w-full h-11`}
      >
        <Option value="Odontología">Ortodoncista</Option>
        <Option value="Ortodoncia">Odontólogo</Option>
        <Option value="Ortodoncia">Cirujano</Option>
        <Option value="Otro">Otro</Option>
      </Select>
      {showOtherField && (
        <Input
          label="Especifique la profesión"
          size="lg"
          type="text"
          value={otherValue}
          onChange={handleOtherInputChange}
        />
      )}
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
} 

export function CampusSelectInputField({ header, label, value, handleChange }) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (value.trim() === "") {
      setError("Debes seleccionar una ciudad");
    } else {
      setError("");
    }
  }, [value]);

  return (
    <>
      <Typography className="-mb-2" variant="h6">
        {header}
      </Typography>
      <Select
        size="lg"
        label={label}
        value={value}
        onChange={handleChange} 
        className={`w-full h-11`}
      >
        <Option value="Medellín">Medellín</Option>
        <Option value="Pereira">Pereira</Option>
      </Select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
}

export function ActiveSwitch({ value, handleChange }) {
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
