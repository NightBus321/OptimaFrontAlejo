"use client";

import {
  Card,
  CardFooter,
  Button,
  Typography,
  Chip,
} from "@material-tailwind/react";
import ProjectDocuments from "./ProjectDocuments";
import DeleteProjectDialog from "./DeleteProjectDialog";
import LoadingBar from "@/app/dashboard/components/LoadingBar";
import axios from "axios";
import route from "@/app/routes";
import { useState, useEffect } from "react";
import Link from "next/link";
import UsersDialog from "./UsersDialog";
import {
  InputField,
  SelectCategory,
  SelectSemester,
  SelectType,
  SelectHeadquarter,
} from "./InputDetail";
import UploadDocuments from "./UploadDocuments";
import AssignNewUsers from "./AssignNewUsers";
import { updateProject } from "../../API_PROJECTS";
import { toast, Toaster } from "react-hot-toast";
import UploadProduction from "./UploadProduction";
import ProjectProduction from "./ProjectProduction";
import SelectInputField from "@/app/dashboard/components/formsComponents/SelectInputField";

export default function ProjectDetail({ code }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [hquarter, setHquarter] = useState("");
  const handleHeadquarterChange = (event) => {
    setHquarter(event);
  };

  const [type, setType] = useState("");
  const handleTypeChange = (event) => {
    setType(event);
  };

  const [category, setCategory] = useState("");
  const handleCategoryChange = (event) => {
    setCategory(event);
  };

  const [semester, setSemester] = useState("");
  const handleSemesterChange = (event) => {
    setSemester(event);
  };

  const [students, setStudents] = useState([]);
  const handleStudentsChange = (event) => {
    setStudents(event);
  };

  const [documents, setDocuments] = useState([]);
  const handleDocumentsChange = (event) => {
    setDocuments(event);
  };

  const [production, setProduction] = useState([]);
  const handleProductionChange = (event) => {
    setProduction(event);
  };

  const [tutors, setTutors] = useState([]);
  const handleSTutorsChange = (event) => {
    setTutors(event);
  };

  const [aval, setAval] = useState(false);
  const handleAvalChange = (event) => setAval((cur) => !cur);

  const [active, setActive] = useState(false);

  const [status, setStatus] = useState("");
  const handleStatusChange = (event) => {
    setStatus(event);
    if (event == "Anteproyecto" || event == "En Ejecución") {
      setActive(true);
      return;
    }
    setActive(false);
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProject = async () => {
    const url = `${route}/project/${code}`;
    await axios
      .get(url)
      .then((response) => {
        setDataLoaded(true);
        const project = response.data;
        setTutors(project.tutors);
        setStudents(project.students);
        setName(project.name);
        setType(project.type);
        setCategory(project.category);
        setHquarter(project.hquarter);
        setSemester(project.semester);
        setAval(project.aval);
        setActive(project.active);
        setStatus(project.status);
        setDocuments(project.documents);
        setProduction(project.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = async () => {
    const project = {
      name: name,
      category: category,
      semester: semester,
      type: type,
      hquarter: hquarter,
      status: status,
      active: active,
    };
    try {
      await updateProject(project, code);
      toast.success("Información de proyecto editada correctamente");
      setTimeout(() => {
        window.location.href = `/dashboard/projects/${code}`;
      }, 1000);
    } catch (error) {
      toast.error("Error al editar la información del proyecto");
      setTimeout(() => {
        window.location.href = `/dashboard/projects/${code}`;
      }, 2000);
    }
  };
  let color = "gray";
  if (aval == 1) {
    color = "red";
  } else if (aval == 2) {
    color = "green";
  }
  let avalInfo = "Este proyecto no requiere aval";
  if (aval == 1) {
    avalInfo = "Proyecto pendiente de aval";
  } else if (aval == 2) {
    avalInfo = "El aval ya está subido";
  }

  const activeInfo = active ? "Activo" : "Inactivo";
  const activeColor = active ? "green" : "red";

  let statusColor = "amber";
  if (status == "Anteproyecto" || status == "En Ejecución") {
    statusColor = "light-green";
  }

  return (
    <>
      {!dataLoaded && <LoadingBar />}
      {dataLoaded && (
        <main className="flex flex-col justify-center items-center m-2 w-full">
          <div className="flex flex-col w-full">
            <Card className="mb-6 w-full p-4">
              <Typography variant="h4" color="blue-gray">
                Proyecto
              </Typography>
              <div className="flex flex-row gap-x-2">
                <Chip value={activeInfo} color={activeColor}></Chip>
                <Chip value={status} color={statusColor}></Chip>
              </div>
              <div className="flex flex-row justify-between">
                <Typography color="gray" className="mt-1 font-normal">
                  {code}
                </Typography>
                <Typography
                  color={color}
                  className="mt-1 font-normal text-right"
                >
                  {avalInfo}
                </Typography>
                <div className="flex flex-row ">
                  <UploadProduction code={code} />
                  <UploadDocuments code={code} />
                  <ProjectDocuments documents={documents} aval={aval} />
                  <UsersDialog
                    userType={"tutores"}
                    users={tutors}
                    code_project={code}
                  />
                  <UsersDialog
                    userType={"estudiantes"}
                    users={students}
                    code_project={code}
                  />
                  <AssignNewUsers
                    code_project={code}
                    name_project={name}
                    semester_project={semester}
                    type_project={type}
                    hquarter_project={hquarter}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <InputField
                  header="Nombre del proyecto"
                  label="Nombre del proyecto"
                  type="text"
                  value={name}
                  handleChange={handleNameChange}
                />

                <SelectType
                  header="Tipología del proyecto"
                  label="Tipología del proyecto"
                  value={type}
                  handleChange={handleTypeChange}
                />
                <SelectCategory
                  header="Categoria del proyecto"
                  label="Categoria del proyecto"
                  value={category}
                  handleChange={handleCategoryChange}
                />
                <SelectHeadquarter
                  header="Sede del proyecto"
                  label="Sede del proyecto"
                  value={hquarter}
                  handleChange={handleHeadquarterChange}
                />
                <SelectSemester
                  value={semester}
                  handleChange={handleSemesterChange}
                />
                <SelectInputField
                  header={"Cambiar etapa del proyecto"}
                  label={"Etapa del proyecto"}
                  value={status}
                  handleChange={handleStatusChange}
                  options={[
                    "Anteproyecto",
                    "En Ejecución",
                    "En Pausa",
                    "Finalizado",
                    "Cancelado",
                  ]}
                />
              </div>
              <CardFooter className="p-0 mt-2">
                <Button className="bg-primaryColor" onClick={handleEdit}>
                  Editar información
                </Button>
                <Link href="../projects">
                  <Button className="bg-secondaryColor ml-2">Atrás</Button>
                </Link>
                <DeleteProjectDialog code={code} />
              </CardFooter>
            </Card>
          </div>

          <ProjectProduction production={production} />

          <Toaster />
        </main>
      )}
    </>
  );
}
