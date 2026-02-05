"use client";
import { useEffect, useState } from "react";
import { LinkIcon, PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import route from "@/app/routes";
import Link from "next/link";

//UI
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";

import {
  ActiveSwitch,
  InputField,
  OptionalInputField,
  SelectInputField, 
  CampusSelectInputField,
} from "./InputField";
import { updateTutor } from "../API";
import LoadingBar from "../../components/LoadingBar";
import toast, { Toaster } from "react-hot-toast";
import DeleteTutorDialog from "./DeleteTutorDialog";
export default function TutorDetail({ ced }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [name, setName] = useState("");
  const [cedTutor, setCedTutor] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [active, setActive] = useState(true);
  const [cvlac, setCvlac] = useState("");
  const [hquarter, setCampus] = useState("");
  const [editingGrade, setEditingGrade] = useState(false); 
  const [editingCampus, setEditingCampus] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCedChange = (event) => {
    setCedTutor(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event);
  };

  const handleCvlacChange = (event) => {
    setCvlac(event.target.value);
  }; 

  const handleCampusChange = (event) => {
    setCampus(event.target.value);
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
      value: cedTutor,
      handler: handleCedChange,
    },
  ];

  useEffect(() => {
    fetchTutor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTutor = async () => {
    const url = `${route}/tutor/${ced}`;
    await axios
      .get(url)
      .then((response) => {
        setDataLoaded(true);
        const tutor = response.data;
        setName(tutor.name);
        setCedTutor(tutor.ced);
        setEmail(tutor.email);
        setGrade(tutor.grade); 
        setCampus(tutor.hquarter);
        setActive(tutor.active); 
        setCvlac(tutor.cvlac); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = async () => {
    const tutor = {
      name: name,
      ced: cedTutor,
      email: email,
      grade: grade, 
      hquarter: hquarter,
      active: active,
      cvlac: cvlac,
    };
    try {
      await updateTutor(tutor, ced);
      toast.success("Información del tutor editada correctamente");
      setTimeout(() => {
        window.location.href = `/dashboard/tutors/${cedTutor}`;
      }, 1000);
    } catch (error) {
      console.log("Error al actualizar los datos del tutor:", error);
      setTimeout(() => {
        window.location.href = `/dashboard/tutors/${ced}`;
      }, 2000);
    }
  };

  return (
    <>
      {!dataLoaded && <LoadingBar />}
      {dataLoaded && (
        <Card className="bg-blue-gray-50 bg-opacity-50 shadow-xl max-w-md mt-2 mx-auto">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3">Tutor</Typography>
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
            <Typography className="-mb-2" variant="h6">
              Profesión
            </Typography>
            {!editingGrade && (
              <div className="flex items-center gap-2">
                <Input
                  header="Profesión"
                  label="Profesión"
                  size="lg"
                  type="text"
                  value={grade}
                  disabled
                />
                <IconButton
                  variant="text"
                  onClick={() => setEditingGrade(true)}
                >
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </div>
            )}
            {editingGrade && (
              <SelectInputField
                label="Profesión"
                value={grade}
                handleChange={(newValue) => {
                  setGrade(newValue);
                  setEditingGrade(true);
                }}
              />
            )}  
            <Typography className="-mb-2" variant="h6">
              Sede
            </Typography>
            {!editingCampus && (
              <div className="flex items-center gap-2">
                <Input
                  header="Sede"
                  label="Sede"
                  size="lg"
                  type="text"
                  value={hquarter}
                  disabled
                />
                <IconButton
                  variant="text"
                  onClick={() => setEditingCampus(true)}
                >
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </div>
            )}
            {editingCampus && (
              <CampusSelectInputField
                label="Sede"
                value={hquarter}
                handleChange={(newValue) => {
                  setCampus(newValue);
                  setEditingCampus(true);
                }}
              />
            )} 
            <Typography className="-mb-2" variant="h6">
              CvLac
            </Typography>
            <div className="flex items-center gap-2">
              <OptionalInputField
                label="CvLac"
                type="text"
                value={cvlac}
                handleChange={handleCvlacChange}
              />
              <a href={cvlac} target="_blank" rel="noopener noreferrer">
                <IconButton variant="text">
                  <LinkIcon className="h-4 w-4" />
                </IconButton>
              </a>
            </div>
            <Typography className="-mb-2" variant="h6">
              ¿Tutor activo?
            </Typography>
            <ActiveSwitch value={active} handleChange={handleActiveChange} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-primaryColor w-35" onClick={handleEdit}>
              Editar información
            </Button>
            <Link href="../tutors">
              <Button className="bg-secondaryColor ml-3">Atrás</Button>
            </Link>
            <DeleteTutorDialog ced={ced} name={name} />
          </CardFooter>
        </Card>
      )}
      <Toaster />
    </>
  );
}
