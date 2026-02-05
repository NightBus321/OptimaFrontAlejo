import { useState } from "react";
import { DocumentIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Button,
  Tooltip,
  Dialog,
} from "@material-tailwind/react";
import DonwloadDocumentLink from "@/app/dashboard/components/DonwloadDocumentLink";
const TABLE_HEAD = ["Enlace de Descarga del Archivo"];
export default function ProjectDocuments({ documents }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };
  return (
    <div>
      <Tooltip content={"Ver Documentos Subidos"}>
        <Button onClick={handleOpen} variant="text" className="p-3">
          <DocumentIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="shadow-none z-0"
      >
        <div className="overflow-scroll max-h-[calc(100vh-200px)] justify-center item-center  p-6 text-center">
          <Typography variant="h4" color="blue-gray">
            {"Lista de documentos"}
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
              {!documents || documents.length === 0 ? (
                <div className="p-6 justify-center">
                  <Typography size="small" color="black">
                    No hay documentos subidos en este proyecto
                  </Typography>
                </div>
              ) : (
                documents.map(({ document }, index) => {
                  const isLast = index === documents.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={document.code}>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <DonwloadDocumentLink
                            fileContent={document.file}
                            fileName={document.name}
                          />
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
