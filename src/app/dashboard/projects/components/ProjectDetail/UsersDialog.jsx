import { useState } from "react";
import {
  UserIcon,
  UserMinusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import {
  Typography,
  Button,
  Tooltip, IconButton,
  Dialog,
} from "@material-tailwind/react";
import DeleteUserAlert from "./DeleteUserAlert";
import { Toaster, toast } from "react-hot-toast";

const TABLE_HEAD = ["Identificación", "Nombre", ""];

export default function UsersDialog({ users, userType, code_project }) {
  const handleDeleteUser = (user_ced) => {
    toast((t) => (
      <DeleteUserAlert
        t={t}
        user_Type={userType}
        user_ced={user_ced}
        code_project={code_project}
      />
    ));
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };
  const getUserIcon = () => {
    if (userType === "tutores") {
      return <UserIcon className="h-4 w-4" />;
    } else if (userType === "estudiantes") {
      return <UserGroupIcon className="h-4 w-4" />;
    }
    return null;
  };
  return (
    <div>
      <Tooltip content={"Ver " + userType}>
        <Button onClick={handleOpen} variant="text" className="p-3">
          {getUserIcon()}
        </Button>
      </Tooltip>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="shadow-none z-0"
      >
        <div className=" justify-center item-center  p-6 text-center">
          <Typography variant="h4" color="blue-gray">
            {"Lista de " + userType + " asignados al proyecto"}
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
              {!users || users.length === 0 ? (
                <div className="p-6 justify-center">
                  <Typography size="small" color="black">
                    No hay {userType} en este proyecto
                  </Typography>
                </div>
              ) : (
                users.map(({ ced, name }, index) => {
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={ced}>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {ced}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal  truncate max-w-lg"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col items-center justify-center">
                          <IconButton
                            onClick={() => {
                              handleDeleteUser(ced);
                            }}
                            variant="text"
                            color="red"
                          >
                            <UserMinusIcon className="h-5 w-5" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <Toaster />
      </Dialog>
    </div>
  );
}
