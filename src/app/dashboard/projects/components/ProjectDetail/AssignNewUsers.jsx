import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import route from "@/app/routes";
import axios from "axios";
import {
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  Button,
} from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import MultiSearchBar from "../MultiSearchBar";
import MultiSearchBarTutor from "../MultiSearchBarTutor";

export default function AssignNewUsers({
  code_project,
  name_project,
  type_project,
  semester_project,
}) {
  let hquarter;
  if (typeof window !== "undefined") {
    hquarter = localStorage.getItem("hquarter");
  }

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [tutorList, setTutorList] = useState([]);
  function formatAssignedUser(users, code) {
    users = users.map((object) => {
      return { ced: object.value, name: object.label, project_code: code };
    });
    return users;
  }
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };
  const handleStudentList = (value) => {
    setStudentList(value);
  };
  const handleTutorList = (value) => {
    setTutorList(value);
  };

  const handleSubmit = async (event) => {
    let students = formatAssignedUser(studentList);
    let tutors = formatAssignedUser(tutorList);
    if (students.length === undefined && tutors.length === undefined) {
      toast.error("Selecciona Usuarios para el Proyecto!!! ", {
        duration: 1000,
      });
    } else {
      setDisabled(true);
      const url = route + "/project/assignUsers";
      event.preventDefault();
      await axios
        .post(url, {
          code: code_project,
          name: name_project,
          studentList: students,
          tutorList: tutors,
          type: type_project,
          semester: semester_project,
        })
        .then(async (response) => {
          setDisabled(false);
          toast.success("Usuarios registrados correctamente!!! ", {
            duration: 1000,
          });
          setTimeout(() => {
            handleOpen();
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          setDisabled(false);
          toast.error("Error al registrar un proyecto" + error, {
            duration: 1000,
          });
        });
    }
  };
  return (
    <div>
      <Tooltip content={"Asignar usuarios"}>
        <IconButton onClick={handleOpen} variant="text">
          <UserPlusIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="shadow-none z-0"
      >
        <div className=" justify-center item-center  p-6 text-center">
          <Typography variant="h4" color="blue-gray">
            {"Asigna Usuarios al Proyecto"}
          </Typography>
          <br></br>
          <div className="w-full flex flex-col  gap-2  justify-center mb-2 ">
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
              <MultiSearchBarTutor
                urlReq={`/tutorNoAssigned/${hquarter}`}
                onSelectChange={handleTutorList}
                userType="del tutor"
                projectCode={code_project}
              />
            </div>
          </div>
          <Button
            className="bg-primaryColor"
            loading={disabled}
            onClick={handleSubmit}
          >
            Asignar Usuarios
          </Button>
        </div>
        <Toaster />
      </Dialog>
    </div>
  );
}
