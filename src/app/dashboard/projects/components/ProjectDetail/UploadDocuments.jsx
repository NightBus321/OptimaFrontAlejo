import {
  Button,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
} from "@material-tailwind/react";
import { UploadFile } from "../../../components/InputUploadFiles";
import { useState } from "react";
import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/solid";
import route from "@/app/routes";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import AvalProjectSwitch from "../AvalProjectSwitch";
export default function UploadDocuments({ code, aval }) {
  const [avalChecked, setAvalChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChangeAval = (value) => {
    setAvalChecked(value);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleUpload = async () => {
    const url = route + "/uploadDocument/" + code;
    event.preventDefault();
    let aval = avalChecked == true ? 2 : 1;
    if (selectedFile === null || selectedFile.length === 0) {
      toast.error("Debes Adjuntar un Archivo", { duration: 1000 });
    } else {
      setLoading(true)
      const formData = new FormData();
      formData.append("aval", aval);
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append(i, selectedFile[i]);
      }
      await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          toast.success("Archivos adjuntados existosamente", {
            duration: 1000,
          });
          setLoading(false)
          setTimeout(() => {
            handleOpen();
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          setLoading(false)
          toast.error("Error al adjuntar archivos", { duration: 1000 });
        });
    }
  };

  return (
    <div>
      <Tooltip content={"Subir un documento"}>
        <IconButton onClick={handleOpen} variant="text">
          <ArrowUpOnSquareStackIcon className="h-5 w-5" />
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
            Subir documentos
          </Typography>
          <div className="flex flex-col gap-4 mb-2">
            <UploadFile
              multiple={true}
              accept=""
              value={selectedFile}
              handleChange={handleFileChange}
            />
          </div>
          <div
            className="flex flex-col mb-6"
            hidden={aval === 0 || aval === 2 ? true : false}
          >
            <Typography variant="h6">Requisito de Aval</Typography>
            <AvalProjectSwitch onSelectChange={handleChangeAval} />
          </div>

          <Button className="bg-primaryColor"loading={loading} onClick={handleUpload}>
            Subir documentos
          </Button>
        </div>
        <Toaster />
      </Dialog>
    </div>
  );
}
