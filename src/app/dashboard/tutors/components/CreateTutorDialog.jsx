import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import {
  InputField,
  OptionalInputField,
  SelectInputField,
  CampusSelectInputField,
} from "./InputField";
import { toast, Toaster } from "react-hot-toast";
import route from "@/app/routes";

export function ButtonCreateTutor({ onCreateTutor }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [ced, setCed] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [cvlac, setCvlac] = React.useState("");
  const [isLoading, setIsloading] = React.useState(false);

  const handleOpen = () => {
    setOpen((cur) => !cur);
    clearFields();
  };

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
    setGrade(event);
  };

  const handleCvlacChange = (event) => {
    setCvlac(event.target.value);
  };

  const clearFields = () => {
    setName("");
    setCed("");
    setEmail("");
    setGrade("");
    setCvlac("");
  };

  const createTutor = () => {
    if (name === "" || email === "" || ced === "" || grade == "") {
      toast.error("Debes rellenar todos los campos primero");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.log("Debes ingresar un correo electronico valido");
    } else {
      let url = route + "/tutor";
      const hquarter = localStorage.getItem("hquarter");

      setIsloading(true);
      axios
        .post(url, {
          name: name,
          ced: ced,
          email: email,
          grade: grade,
          cvlac: cvlac,
          hquarter: hquarter,
        })
        .then(function (response) {
          toast.success(`Tutor ${response.data.name} registrado con éxito`, {
            duration: 1000,
          });
          setTimeout(() => {
            handleOpen();
            setIsloading(false);
            clearFields();
            window.location.reload();
          }, 1000);
        })
        .catch(function (error) {
          if (error.response.data.code === 11000) {
            toast.error(
              "Un tutor con este documento de identificación ya está registrado"
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
      <Button className="bg-[#004f80]" onClick={handleOpen}>
        Añadir un tutor
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto">
          <CardBody className="flex flex-col gap-2 overflow-scroll max-h-[80vh]">
            <Typography variant="h4" color="blue-gray">
              Añade un tutor
            </Typography>
            <Typography
              className="mb-2 font-normal"
              variant="paragraph"
              color="gray"
            >
              Ingresa los datos del tutor para crearlo
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
              header="Profesión"
              label="Profesión"
              value={grade}
              handleChange={handleCarreerChange}
            />
            <Typography className="-mb-2" variant="h6">
              CvLac
            </Typography>
            <OptionalInputField
              label="CvLac"
              type="text"
              value={cvlac}
              handleChange={handleCvlacChange}
            />
            <p className="text-green-500 text-xs italic">
              Este campo es opcional
            </p>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-[#004f80]"
              onClick={createTutor}
              fullWidth
              loading={isLoading}
            >
              Crear tutor
            </Button>
          </CardFooter>
        </Card>
        <Toaster />
      </Dialog>
    </>
  );
}
