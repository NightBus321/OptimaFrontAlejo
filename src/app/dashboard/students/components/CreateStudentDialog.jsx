"use client";
import React from "react";
import axios from "axios";
import route from "@/app/routes";

import { toast, Toaster } from "react-hot-toast";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { InputField, SelectInputField } from "./InputField";

export function ButtonCreateStudent({ onCreateStudent }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [ced, setCed] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [carreer, setCarreer] = React.useState("");

  const [isLoading, setIsloading] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCedChange = (event) => {
    setCed(event.target.value);
  };

  const handleCarreerChange = (event) => {
    setCarreer(event);
  };

  const clearFields = () => {
    setName("");
    setCed("");
    setEmail("");
    setCarreer("");
  };

  const createStudent = () => {
    if (name === "" || email === "" || ced === "" || carreer == "") {
      toast.error("Debes rellenar todos los campos primero");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Debes ingresar un correo electronico valido");
    } else {
      setIsloading(true);

      const hquarter = localStorage.getItem("hquarter");
      let url = route + "/student";
      axios
        .post(url, {
          name: name,
          ced: ced,
          email: email,
          carreer: carreer,
          hquarter: hquarter,
        })
        .then(function (response) {
          toast.success(
            `Estudiante ${response.data.name} registrado con éxito`,
            { duration: 1500 }
          );

          setTimeout(() => {
            handleOpen();
            clearFields();
            window.location.reload();
          }, 1500);

          onCreateStudent();
          setIsloading(false);
        })
        .catch(function (error) {
          if (error.response.data.code === 11000) {
            toast.error(
              "Un estudiante con este documento de identificación ya está registrado"
            );
            setIsloading(false);
            clearFields();
          } else {
            toast.error("Ha ocurrido un error inesperado");
            clearFields();
            setIsloading(false);
            handleOpen();
          }
        });
    }
  };

  const inputProps = [
    {
      header: "Nombre",
      label: "Nombre",
      type: "text",
      value: name,
      handler: handleNameChange,
    },
    {
      header: "Correo Electrónico",
      label: "Email",
      type: "email",
      value: email,
      handler: handleEmailChange,
    },
    {
      header: "Cédula",
      label: "Cédula",
      type: "number",
      value: ced,
      handler: handleCedChange,
    },
  ];
  return (
    <>
      <Button className="bg-primaryColor" onClick={handleOpen}>
        Añadir un estudiante
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        fullWidth // Hace que el diálogo ocupe todo el ancho de la pantalla
      >
        <Card className="mx-auto">
          <CardBody className="flex flex-col gap-2 overflow-scroll max-h-[80vh]">
            <Typography variant="h4" color="blue-gray">
              Añade un estudiante
            </Typography>
            <Typography
              className="mb-1 font-normal"
              variant="paragraph"
              color="gray"
            >
              Ingresa los datos del estudiante para crearlo
            </Typography>
            {inputProps.map(({ header, label, type, value, handler }) => (
              <InputField
                key={header}
                header={header}
                label={label}
                type={type}
                value={value}
                handleChange={handler}
              />
            ))}

            <SelectInputField
              header="Carrera"
              label="Carrera"
              value={carreer}
              handleChange={handleCarreerChange}
              options={["Odontología", "Ortodoncia"]}
            />

            <Button
              className="bg-primaryColor"
              onClick={createStudent}
              fullWidth
              loading={isLoading}
            >
              Crear estudiante
            </Button>
          </CardBody>
        </Card>
        <Toaster />
      </Dialog>
    </>
  );
}
