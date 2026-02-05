import { TrashIcon } from "@heroicons/react/24/solid";
import {
  IconButton,
  Dialog,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { deleteProject } from "../../API_PROJECTS";

export default function DeleteProjectDialog({ code }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProject(code);
      toast.success("Proyecto eliminado correctamente");
      setTimeout(() => {
        window.location.href = `/dashboard/projects`;
      }, 1000);
    } catch (error) {
      toast.error("Error al eliminar la información del proyecto");
      setTimeout(() => {
        window.location.href = `/dashboard/proyects/${code}`;
      }, 1000);
    }
  };

  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <IconButton className="ml-2 bg-red-500" onClick={handleOpen}>
        <TrashIcon className="h-8 w-8" />
      </IconButton>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none flex items-center justify-center"
        fullWidth
      >
        <Toaster />
        <Card className="p-4 max-w-80">
          <Typography variant="h4" color="blue-gray">
            Eliminar un Proyecto
          </Typography>
          <Typography variant="small" color="gray">
            ¡Esta acción no se puede deshacer!
          </Typography>
          <hr className="my-2" />
          <Typography variant="paragraph" color="blue-gray">
            ¿Estás segur@ de querer eliminar el proyecto{" "}
            <span className="font-bold">{code}</span>?
          </Typography>
          <hr className="my-2" />
          <div className="flex gap-x-2">
            <Button color="red" loading={loading} onClick={handleDelete}>
              Confirmar
            </Button>
            <Button className="bg-secondaryColor" onClick={handleOpen}>
              Cancelar
            </Button>
          </div>
        </Card>
      </Dialog>
    </>
  );
}
