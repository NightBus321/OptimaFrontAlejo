import { TrashIcon } from "@heroicons/react/24/solid";
import {
  IconButton,
  Dialog,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { deleteStudent } from "../API_STUDENTS";
import { Toaster, toast } from "react-hot-toast";

export default function DeleteStudentDialog({ ced, name }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteStudent(ced);
      toast.success("Estudiante eliminado correctamente");
      setTimeout(() => {
        window.location.href = `/dashboard/students`;
      }, 1000);
    } catch (error) {
      console.log("Error al eliminar la información del estudiante:", error);
      setTimeout(() => {
        window.location.href = `/dashboard/students/${ced}`;
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
        fullWidth // Hace que el diálogo ocupe todo el ancho de la pantalla
      >
        <Toaster />
        <Card className="p-4 max-w-80">
          <Typography variant="h4" color="blue-gray">
            Eliminar un estudiante
          </Typography>
          <Typography variant="small" color="gray">
            ¡Esta acción no se puede deshacer!
          </Typography>
          <hr className="my-2" />
          <Typography variant="paragraph" color="blue-gray">
            ¿Estás segur@ de querer eliminar al estudiante{" "}
            <span className="font-bold">{name}</span>?
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
