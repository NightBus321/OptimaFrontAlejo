"use client";
import { Typography, Input, Select, Option } from "@material-tailwind/react";
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

export function SelectType({ header, label, value, handleChange }) {
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
        <Option value="Docencia Servicio">Docencia Servicio</Option>
        <Option value="Medios Digitales">Medios Digitales</Option>
        <Option value="Institucional">Institucional</Option>
        <Option value="Externo">Externo</Option>
      </Select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
}

export function SelectCategory({ header, label, value, handleChange }) {
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
        <Option value="Cualitativo">Cualitativo</Option>
        <Option value="Cuantitativo">Cuantitativo</Option>
      </Select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
} 

export function SelectHeadquarter({ header, label, value, handleChange }) {
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
        <Option value="Medellín">Medellín</Option>
        <Option value="Pereira">Pereira</Option>
      </Select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
}

export function SelectSemester({ value, handleChange }) {
  const minOffset = 0;
  const maxOffset = 6;
  const year = new Date().getFullYear();
  const options = [];

  for (let i = minOffset; i <= maxOffset; i++) {
    const yearOption1 = `${year - i}-1`;
    options.push(<Option value={yearOption1}>{yearOption1}</Option>);
    const yearOption2 = `${year - i}-2`;
    options.push(<Option value={yearOption2}>{yearOption2}</Option>);
  }
  return (
    <>
      <Typography className="-mb-2" variant="h6">
        Cohorte del proyecto
      </Typography>
      <Select
        error={value === null ? true : false}
        value={value}
        onChange={handleChange}
        size="md"
        label="Selecciona el semestre"
      >
        {options}
      </Select>
    </>
  );
}
