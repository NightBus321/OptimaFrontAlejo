"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import route from "@/app/routes";
import Link from "next/link";
//UI
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { ActiveSwitch, InputField, SelectInputField } from "./InputField";
import { updateStudent } from "../API_STUDENTS";
import LoadingBar from "../../components/LoadingBar";
import toast, { Toaster } from "react-hot-toast";
import DeleteStudentDialog from "./DeleteStudentDialog";

export default function StudentDetail({ ced }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [name, setName] = useState("");
  const [cedStudent, setCedStudent] = useState("");
  const [email, setEmail] = useState("");
  const [carreer, setCarreer] = useState("");
  const [hquarter, setHquarter] = useState("");
  const [active, setActive] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCedChange = (event) => {
    setCedStudent(event.target.value);
  };

  const handleCarreerChange = (event) => {
    setCarreer(event);
  };

  const handleHquarterChange = (event) => {
    setHquarter(event);
  };

  const handleActiveChange = () => setActive((cur) => !cur);

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
      value: cedStudent,
      handler: handleCedChange,
    },
  ];

  useEffect(() => {
    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudent = async () => {
    const url = `${route}/student/${ced}`;
    await axios
      .get(url)
      .then((response) => {
        setDataLoaded(true);
        const student = response.data;
        setName(student.name);
        setCedStudent(student.ced);
        setEmail(student.email);
        setCarreer(student.carreer);
        setHquarter(student.hquarter);
        setActive(student.active);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = async () => {
    const student = {
      name: name,
      ced: cedStudent,
      email: email,
      carreer: carreer,
      hquarter: hquarter,
      active: active,
    };
    try {
      await updateStudent(student, ced);
      toast.success("Información de estudiante editada correctamente");
      setTimeout(() => {
        window.location.href = `/dashboard/students/${cedStudent}`;
      }, 1000);
    } catch (error) {
      console.log("Error al actualizar los datos del estudiante:", error);
      setTimeout(() => {
        window.location.href = `/dashboard/students/${ced}`;
      }, 2000);
    }
  };

  return (
    <>
      {!dataLoaded && <LoadingBar />}
      {dataLoaded && (
        <Card className="bg-blue-gray-50 bg-opacity-50 shadow-xl max-w-md mt-2 mx-auto">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3">Estudiante</Typography>
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
            <SelectInputField
              header="Sede"
              label="Sede"
              value={hquarter}
              handleChange={handleHquarterChange}
              options={["Medellín", "Pereira"]}
            />
            <Typography className="-mb-2" variant="h6">
              ¿Estudiante activo?
            </Typography>
            <ActiveSwitch value={active} handleChange={handleActiveChange} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-primaryColor w-35" onClick={handleEdit}>
              Editar información
            </Button>
            <Link href="../students">
              <Button className="bg-secondaryColor ml-3">Atrás</Button>
            </Link>
            <DeleteStudentDialog ced={ced} name={name} />
          </CardFooter>
        </Card>
      )}
      <Toaster />
    </>
  );
}
