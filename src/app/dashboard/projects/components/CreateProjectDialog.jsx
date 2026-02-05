"use client";
import { useState } from "react";
import React, { useRef } from "react";

import { Toaster, toast } from "react-hot-toast";

import route from "@/app/routes";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import TypeProjectSelect from "./TypeProjectSelect";
import CategoryProjectSelect from "./CategoryProjectSelect";
import AvalProjectSwitch from "./AvalProjectSwitch";
import axios from "axios";
import MultiSearchBar from "./MultiSearchBar";
import YearSelect from "./YearSelect";
import SelectSemester from "./SelectSemester";
import MultiSearchBarTutor from "./MultiSearchBarTutor";

export default function CreateProjectDialog() {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [part, setPart] = useState("");
  const [avalChecked, setAvalChecked] = useState(false);
  const [status, setStatus] = useState(true);
  const [studentList, setStudentList] = useState([]);
  const [tutorList, setTutorList] = useState([]);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleYearChange = (value) => {
    setYear(value);
  };

  const handleSemesterChange = (value) => {
    setPart(value);
  };

  const handleStudentList = (value) => {
    setStudentList(value);
  };

  const handleTutorList = (value) => {
    console.log(value);

    setTutorList(value);
  };

  const handleChangeAval = (value) => {
    setAvalChecked(value);
  };

  function validationForm(...items) {
    return items.some(
      (item) => !item || item.length === 0 || /[{},]/.test(item)
    );
  }

  function formatAssignedUser(users, code) {
    users = users.map((object) => {
      return { ced: object.value, name: object.label, project_code: code };
    });
    return users;
  }

  const handleSubmit = async (event) => {
    if (validationForm(name, type, category, year, part)) {
      toast.error(
        "Debes llenar todos los campos, si ya están llenos, recuerda que el nombre del proyecto no puede tener estos caracteres: ,  {  }"
      );
    } else {
      setDisabled(true);
      let students = formatAssignedUser(studentList);
      let tutors = formatAssignedUser(tutorList);
      let aval = 0;

      let hquarter;
      if (typeof window !== "undefined") {
        hquarter = localStorage.getItem("hquarter");
      }

      avalChecked == true ? (aval = 1) : (aval = 0);
      const url = route + "/project";
      event.preventDefault();
      setStatus(false);
      await axios
        .post(url, {
          name: name,
          type: type,
          category: category,
          documentsQuantity: 0,
          studentsQuantity: students.length,
          studentList: students,
          tutorList: tutors,
          tutorsQuantity: tutors.length,
          productsQuantity: 0,
          aval: aval,
          year: year,
          part: part,
          hquarter: hquarter,
        })
        .then(async (response) => {
          let code = response.data.code;
          setName("");
          setType("");
          setCategory("");
          setAvalChecked(false);
          setDisabled(false);
          toast.success(
            "Proyecto registrado exitosamente con código " + code + "!",
            { duration: 1000 }
          );
          setTimeout(() => {
            setStatus(true);
            handleOpen();
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          toast.error("Error al registrar un proyecto" + error, {
            duration: 1000,
          });
        });
    }
  };

  let hquarter;
  if (typeof window !== "undefined") {
    hquarter = localStorage.getItem("hquarter");
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="bg-[#004f80] flex items-center gap-3"
        size="sm"
      >
        <PlusIcon strokeWidth={2} className="h-4 w-4" /> Registrar Proyecto
      </Button>
      <Dialog
        size="xxl"
        open={open}
        handler={handleOpen}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/35 shadow-lg p-6"
        onClick={handleOpen}
      >
        <div
          ref={dialogRef}
          className="bg-white rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()} // Evitar el cierre al hacer clic dentro
        >
          <Card className="mx-auto">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Registrar Proyecto
              </Typography>
              <Typography
                className="font-normal"
                variant="paragraph"
                color="gray"
              >
                Llena los siguientes campos para crear un proyecto.
              </Typography>
              <Typography className="-mb-1" variant="h6">
                Nombre del Proyecto
              </Typography>
              <Input
                required
                label="Nombre"
                value={name}
                error={name === "" ? true : false}
                onChange={handleNameChange}
              />
              <table className="w-full min-w-max table-auto text-left">
                <tbody>
                  <tr>
                    <th>
                      <Typography className="p-2" variant="h6">
                        Tipología del Proyecto
                      </Typography>
                      <TypeProjectSelect onSelectChange={handleTypeChange} />
                    </th>
                    <th>
                      <Typography className="p-2" variant="h6">
                        Categoría del Proyecto
                      </Typography>
                      <CategoryProjectSelect
                        onSelectChange={handleCategoryChange}
                      />
                    </th>
                    <th>
                      <Typography className="p-2" variant="h6">
                        Año del Proyecto
                      </Typography>
                      <YearSelect onSelectChange={handleYearChange} />
                    </th>
                    <th>
                      <Typography className="p-2" variant="h6">
                        Cohorte del Proyecto
                      </Typography>
                      <SelectSemester onSelectChange={handleSemesterChange} />
                    </th>
                    <th>
                      <div className="p-2">
                        <Typography variant="h6">Requisito de Aval</Typography>
                        <AvalProjectSwitch onSelectChange={handleChangeAval} />
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
              <div className="w-full flex flex-col  gap-2  justify-center ">
                <div className="w-full p-1">
                  <Typography variant="h6">Asignar Estudiantes</Typography>
                  <MultiSearchBar
                    urlReq={`/studentNoAssigned/${hquarter}`}
                    onSelectChange={handleStudentList}
                    userType="del estudiante"
                  />
                </div>
                <div className="w-full p-1">
                  <Typography variant="h6">Asignar Tutores</Typography>
                  <MultiSearchBar
                    urlReq={`/tutorNoAssigned/${hquarter}`}
                    onSelectChange={handleTutorList}
                    userType="del tutor"
                  />
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <div className=" flex flex-col  gap-4 md:flex-row md:items-center">
                <Button
                  onClick={handleOpen}
                  color="red"
                  className=" flex flex-row "
                >
                  Cancelar
                </Button>
                <Button
                  disabled={disabled}
                  type="submit"
                  className=" flex flex-row bg-[#004f80]"
                  onClick={handleSubmit}
                  loading={!status}
                >
                  Registrar Proyecto
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <Toaster />
      </Dialog>
    </div>
  );
}
