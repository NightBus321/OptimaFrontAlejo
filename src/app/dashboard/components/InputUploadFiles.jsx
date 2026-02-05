"use client";
import { Typography, Input } from "@material-tailwind/react";

export function UploadFile({ value, multiple, accept, handleChange }) {
  return (
    <>
      <Typography className="-mb-2" variant="h6">
        Subir archivo
      </Typography>
      <Input
        label="Sube un archivo"
        size="lg"
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
      />
    </>
  );
}
