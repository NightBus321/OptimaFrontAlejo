import { toast } from "react-hot-toast";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import route from "@/app/routes";
import { useState } from "react";
const handleError = () => {
  toast.error("Error al eliminar un usuario del proyecto", {
    duration: 1000,
  });
};

const handleDelete = (user_ced) => {
  toast.success(
    "Usuario con identificación " +
      user_ced +
      " eliminado correctamente del proyecto",
    {
      duration: 1000,
    }
  );
};

function DeleteUserAlert({ t, user_ced, code_project, user_Type }) {
  const [status, setStatus] = useState(false);
  const deleteUser = async () => {
    let url;
    if (user_Type === "estudiantes") {
      url = route + "/project/deleteStudent";
    } else {
      url = route + "/project/deleteTutor";
    }
    setStatus(true);
    await axios
      .post(url, {
        ced: user_ced,
        code: code_project,
      })
      .then((response) => {
        handleDelete(user_ced);
        setTimeout(() => {
          setStatus(false);
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setStatus(false);
        handleError();
      });
  };
  return (
    <div className="flexp-2">
      <p>
        {"¿Quieres eliminar este usuario con identificación " +
          user_ced +
          " del proyecto con código " +
          code_project +
          "?"}
      </p>
      <div className="flex w-max items-end gap-2">
        <Button
          className="bg-primaryColor"
          loading={status}
          size="sm"
          onClick={deleteUser}
        >
          Eliminar
        </Button>
        <Button
          className="ml-2"
          color="red"
          size="sm"
          disabled={status}
          onClick={() => toast.dismiss(t.id)}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default DeleteUserAlert;
