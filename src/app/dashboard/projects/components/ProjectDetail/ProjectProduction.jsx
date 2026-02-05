"use client";
import { useState } from "react";

import { Badge, Button, Dialog, Typography } from "@material-tailwind/react";

import { DocumentIcon } from "@heroicons/react/24/solid";

import DonwloadDocumentLink from "@/app/dashboard/components/DonwloadDocumentLink";

const TABLE_HEAD = [
  "Nombre",
  "Categoría",
  "Subcategoría",
  "Tipo",
  "Documentos",
];

export default function ProjectProduction({ production }) {
  return (
    <div className="flex flex-col justify-start w-full shadow-xl p-4">
      <Typography className="mb-2" variant="h4" color="blue-gray">
        Producción
      </Typography>

      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b  bg-primaryColor p-4">
                <Typography
                  variant="small"
                  color="white"
                  className="font-semibold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {production.map(({ product }, index) => (
            <tr
              key={`${product.name}${index}`}
              className="even:bg-blue-gray-50/50"
            >
              <td className="p-4">
                <_CustomTableData text={product.name} />
              </td>
              <td className="p-4">
                <_CustomTableData text={product.category} />
              </td>
              <td className="p-4">
                <_CustomTableData text={product.subCategory} />
              </td>
              <td className="p-4">
                <_CustomTableData text={product.type} />
              </td>
              <td className="p-4">
                <_CustomDocuments files={product.files} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function _CustomTableData({ text }) {
  return (
    <Typography variant="small" color="blue-gray" className="font-normal">
      {text}
    </Typography>
  );
}

function _CustomDocuments({ files }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  return (
    <>
      <Button variant="text" onClick={handleOpen} disabled={files.length == 0}>
        <Badge
          content={<p>{files.length}</p>}
          overlap="circular"
          placement="bottom-end"
          className="bg-secondaryColor text-xs"
        >
          <DocumentIcon className="size-8 text-primaryColor" />
        </Badge>
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="p-4 flex flex-col gap-y-4">
          <Typography variant="h4" color="blue-gray">
            Documentos de la producción
          </Typography>
          <div className="flex flex-col gap-y-4">
            {files.map((file, index) => {
              const isLast = index === files.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <div className={classes} key={`${file.name}${index}`}>
                  <DonwloadDocumentLink
                    fileContent={file.contentFile}
                    fileName={file.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Dialog>
    </>
  );
}
