import { Typography, Tooltip, Button } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import UsersDialog from "./ProjectDetail/UsersDialog";
import Link from "next/link";
import ProjectDocuments from "./ProjectDetail/ProjectDocuments";
const TableProjectContent = ({
  code,
  name,
  type,
  category,
  status,
  semester,
  classes,
  tutors,
  students,
  documents,
}) => {
  return (
    <tr key={code}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography variant="small" color="blue-gray" className="font-bold">
            {code}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal truncate max-w-xs"
        >
          {name}
        </Typography>
      </td>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <img
            className="h-9 w-12 p-1"
            src={
              category === "Cuantitativo"
                ? "https://www.svgrepo.com/show/117736/numbers-sequence-verification-symbol.svg"
                : "https://www.svgrepo.com/show/1560/abc-verification-symbol.svg"
            }
            alt="Imagen"
          />

          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal capitalize"
            >
              {type}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {category}
            </Typography>
          </div>
        </div>
      </td>

      <td className={classes}>
        <div className={
              status === "Terminado"
                ? "w-max border border-green-400 rounded p-1"
                : status === "En Progreso"
                ? "w-max border border-amber-400 rounded p-1"
                : "w-max border border-red-400 rounded p-1"
            }>
          <Typography
            variant="small"
            color={
              status === "Terminado"
                ? "green"
                : status === "En Progreso"
                ? "amber"
                : "red"
            }
          >
            {status}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {semester}
        </Typography>
      </td>
      <td className={classes}>
        <div className="flex flex-row">
          <Link href={`/dashboard/projects/${code}`}>
            <Tooltip className="opacity-75" content="Editar proyecto">
              <Button variant="text" className="p-3">
                <PencilIcon className="h-4 w-4" />
              </Button>
            </Tooltip>
          </Link>
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

          <ProjectDocuments documents={documents} />
        </div>
      </td>
    </tr>
  );
};
export default TableProjectContent;
