import {
  Button,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
} from "@material-tailwind/react";
import { UploadFile } from "../../../components/InputUploadFiles";
import { useState } from "react";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "react-hot-toast";
import SelectInputField from "../../../components/formsComponents/SelectInputField";
import TextInputField from "../../../components/formsComponents/TextInputField";
import { createProjectProduction } from "../../API_PROJECTS";

const articleOptions = {
  subcategory: ["A1", "A2", "B", "C", "D"],
};

const presentationOptions = {
  subcategory: ["Oral", "Póster"],
};

const SubCategoryField = ({ category, subCategory, handleChange }) => {
  if (category == "Artículo") {
    return (
      <SelectInputField
        header="Subcategoría"
        label="Subcategoría"
        value={subCategory}
        handleChange={handleChange}
        options={articleOptions.subcategory}
      />
    );
  } else if (category == "Ponencia") {
    return (
      <SelectInputField
        header="Subcategoría"
        label="Subcategoría"
        value={subCategory}
        handleChange={handleChange}
        options={presentationOptions.subcategory}
      />
    );
  }
};

const SubCategoryTextField = ({ category, subCategory, handleChange }) => {
  if (category == "Apropiación Social" || category == "Otro") {
    return (
      <TextInputField
        header="Subcategoría"
        label="Subcategoría"
        value={subCategory}
        type="text"
        handleChange={handleChange}
      />
    );
  }
};

export default function UploadProduction({ code }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event);
  };

  const [subCategory, setSubCategory] = useState("");

  const handleSubCategoryChange = (event) => {
    setSubCategory(event);
  };

  const [subCategoryText, setSubCategoryText] = useState("");

  const handleSubCategoryTextChange = (event) => {
    setSubCategoryText(event.target.value);
  };

  const [type, setType] = useState("");

  const handleTypeChange = (event) => {
    setType(event);
  };

  const handleUpload = async () => {
    if (name == "") {
      toast.error("Debes escribir un nombre", {
        duration: 1500,
      });
      return;
    }
    if (category == "") {
      toast.error("Debes elegir una categoria", {
        duration: 1500,
      });
      return;
    }

    if (type == "") {
      toast.error("Debes elegir un tipo", {
        duration: 1500,
      });
      return;
    }

    if (category == "Artículo" || category == "Ponencia") {
      if (subCategory == "") {
        toast.error("Debes elegir una subcategoria", {
          duration: 1500,
        });
        return;
      }

      var productionInfo = {
        name: name,
        category: category,
        subCategory: subCategory,
        type: type,
      };
    } else {
      if (subCategoryText == "") {
        toast.error("Debes escribir una subcategoria", {
          duration: 1500,
        });
        return;
      }
      var productionInfo = {
        name: name,
        category: category,
        subCategory: subCategoryText,
        type: type,
      };
    }

    try {
      setIsLoading(true);
      await createProjectProduction(productionInfo, selectedFile, code);

      toast.success("Producción subida existosamente", {
        duration: 1500,
      });

      setIsLoading(false);

      setTimeout(() => {
        handleOpen();
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Ha ocurrido un error subiendo la producción", {
        duration: 1500,
      });

      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <Tooltip content={"Subir producción"}>
        <IconButton onClick={handleOpen} variant="text">
          <DocumentCheckIcon className="h-5 w-5" />
        </IconButton>
      </Tooltip>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="shadow-none z-0"
      >
        <div className="p-4 flex flex-col gap-2">
          <Typography variant="h4" color="blue-gray">
            Subir producción
          </Typography>

          <UploadFile
            multiple={true}
            accept=""
            value={selectedFile}
            handleChange={handleFileChange}
          />

          <TextInputField
            header="Producción"
            label="Nombre de la producción"
            value={name}
            type="text"
            handleChange={handleNameChange}
          />

          <SelectInputField
            header="Categoría"
            label="Categoría"
            value={category}
            handleChange={handleCategoryChange}
            options={["Artículo", "Ponencia", "Apropiación Social", "Otro"]}
          />

          <SubCategoryField
            category={category}
            subCategory={subCategory}
            handleChange={handleSubCategoryChange}
          />

          <SubCategoryTextField
            category={category}
            subCategory={subCategoryText}
            handleChange={handleSubCategoryTextChange}
          />

          <SelectInputField
            header="Tipo"
            label="Tipo"
            value={type}
            handleChange={handleTypeChange}
            options={["Internacional", "Nacional", "Local"]}
          />

          <Button onClick={handleUpload} className="bg-primaryColor">
            Subir producción
          </Button>
        </div>
        <Toaster />
      </Dialog>
    </div>
  );
}
