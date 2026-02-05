import { useState } from "react";
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import {
  Typography,
  IconButton,
  Tooltip,
  Dialog,
} from "@material-tailwind/react";
const TABLE_HEAD = ["Código del Proyecto", "Nombre del Proyecto","Tipo del Proyecto","Estado Actual"];
export default function StudentProjectsTableDialog({
  projects,
  actualProject,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };
  return (
    <div>
      <Tooltip content="Ver proyectos">
        <IconButton onClick={handleOpen} variant="text">
          <ClipboardDocumentCheckIcon className="h-4 w-4" />
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
            Lista de Proyectos del Estudiante
          </Typography>
          <br></br>
          <table className="w-full justify-center item-center  text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="bg-primaryColor border-y border-blue-gray-100  p-4"
                  >
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
              {!projects || projects.length === 0 ? (
                <div className="p-6 justify-center">
                  <Typography size="small" color="black">
                    No hay proyectos asignados a este estudiante
                  </Typography>
                </div>
              ) : (
                projects.map(({ project_code, project_name,project_type,project_status }, index) => {
                  const isLast = index === projects.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  const color =
                    project_code === actualProject.project_code && project_status==="Asignado"
                      ? "green"
                      : "blue-gray";
                  return (
                    <tr key={project_code}>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color={color}
                            className="font-normal"
                          >
                            {project_code}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color={color}
                            className="font-normal  truncate max-w-lg"
                          >
                            {project_name}
                          </Typography>
                        </div>
                      
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color={color}
                            className="font-normal  truncate max-w-lg"
                          >
                            {project_type}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color={color}
                            className="font-normal  truncate max-w-lg"
                          >
                            {project_status}
                          </Typography>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Dialog>
    </div>
  );
}
