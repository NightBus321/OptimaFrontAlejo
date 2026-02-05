"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import TutorProjectsTableDialog from "./TutorProjectsTable";
import "./styles/styles.css";
import {
  Card,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { ButtonCreateTutor } from "./CreateTutorDialog";
import Link from "next/link";
import { fetchActiveTutors, fetchAllTutors, fetchInactiveTutors } from "../API";
import UploadUsersExcel from "../../components/UploadUsersExcel";
const TABS = [
  {
    label: "Todos",
    value: 0,
  },
  {
    label: "Activos",
    value: 1,
  },
  {
    label: "Inactivos",
    value: 2,
  },
];

const TABLE_HEAD = [
  "Tutor",
  "Profesion",
  "Estado",
  "Asignado",
  "Cantidad de royectos",
  "",
];

export function TutorsTable() {
  const [tutors, setTutors] = useState([]);
  const [filter, setFilter] = useState(1);

  const fetchData = async () => {
    try {
      let tutorsData;
      if (filter === 0) {
        tutorsData = await fetchAllTutors();
      } else if (filter === 1) {
        tutorsData = await fetchActiveTutors();
      } else {
        tutorsData = await fetchInactiveTutors();
      }
      setTutors(tutorsData);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleCreateTutor = () => {
    fetchData();
  };

  return (
    <Card className="h-full w-full p-6">
      <div className="mb-4 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Lista de tutores
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Observa información de los tutores
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outlined" size="sm">
            Ver todos
          </Button>
          <ButtonCreateTutor onCreateTutor={handleCreateTutor} />
          <UploadUsersExcel userType="tutores" />
        </div>
      </div>
      <div className="sticky top-[63px] bg-[#ffffff] z-10 p-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value={filter} className="w-full md:w-max">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={() => setFilter(value)}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Buscar tutor"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      <CardBody className="px-0 py-0">
        <div className="table-container relative">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="sticky top-[136px] bg-[#e78015] z-10">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y border-blue-gray-100  p-4">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-bold leading-none "
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tutors.map(
                (
                  {
                    _id,
                    name,
                    email,
                    grade,
                    ced,
                    active,
                    projects,
                    actualProject,
                  },
                  index
                ) => {
                  const isLast = index === tutors.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={
                              "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
                            }
                            alt={name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal truncate max-w-xs"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal truncate max-w-xs opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {grade}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={active ? "Activo" : "Inactivo"}
                            color={active ? "green" : "red"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={
                              actualProject.length === 0
                                ? "No Asignado"
                                : "Asignado"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <td className="flex flex-row">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal pt-2.5"
                          >
                            {projects.length}
                          </Typography>

                          <TutorProjectsTableDialog
                            projects={projects}
                            actualProject={actualProject}
                          />
                        </td>
                      </td>
                      <td className={classes}>
                        <Link href={`/dashboard/tutors/${ced}`}>
                          <Tooltip content="Editar tutor">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
