import {
  Button,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
} from "@material-tailwind/react";
import { UploadFile } from "./InputUploadFiles";
import { useState } from "react";
import route from "@/app/routes";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";

export default function UploadUsersExcel({ userType }) {
  let template;
  if (userType === "estudiantes") {
    template = "/templates/templateStudent.xlsx";
  } else if (userType === "tutores") {
    template = "/templates/templateTutor.xlsx";
  }
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleUpload = async () => {
    let url = route;
    if (userType === "estudiantes") {
      url = url + "/studentExcel";
    } else if (userType === "tutores") {
      url = url + "/tutorExcel";
    }
    event.preventDefault();
    const formData = new FormData();
    try {
      setLoading(true);
      formData.append("excel", selectedFile[0]);
      await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          toast.success("Usuarios creados existosamente", { duration: 1000 });
          setLoading(false);
          setTimeout(() => {
            handleOpen();
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          toast.error("Error al subir usuarios", { duration: 1000 });
          setLoading(false);
        });
    } catch (error) {
      toast.error("Adjunta un archivo", { duration: 1000 });
      setLoading(false);
    }
    setSelectedFile(null);
  };

  return (
    <div>
      <Tooltip content={"Añadir desde Excel"}>
        <IconButton
          onClick={handleOpen}
          className="flex items-center gap-3 bg-[#2d572c]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </IconButton>
      </Tooltip>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="shadow-none z-0"
      >
        <div className="p-4 h-fit">
          <Typography variant="h4" color="blue-gray">
            {"Subir excel con la información de los " + userType}
          </Typography>
          <div>
            <Button
              size="sm"
              className="flex items-center gap-3"
              color="blue-gray"
              variant="text"
            >
              <a
                className="hover:underline no-underline gap-3 flex"
                href={template}
                download
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>{" "}
                Descargar PLantilla de Ejemplo
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-4 mb-2">
            <UploadFile
              multiple={false}
              accept=".xlsx"
              value={selectedFile}
              handleChange={handleFileChange}
            />
          </div>

          <Button
            className="bg-primaryColor"
            onClick={handleUpload}
            loading={loading}
          >
            Añadir Usuarios
          </Button>
        </div>
        <Toaster />
      </Dialog>
    </div>
  );
}
