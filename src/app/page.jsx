"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";

import SelectInputField from "./dashboard/components/formsComponents/SelectInputField";

export default function HomePage() {
  const router = useRouter();

  const [hquarter, setHquarter] = useState("");

  const handleHquarterChange = (event) => {
    setHquarter(event);
  };

  const handleButtonClick = () => {
    if (hquarter) {
      if (typeof window !== "undefined") {
        localStorage.setItem("hquarter", hquarter);
        router.push("/dashboard");
        return;
      }
    }
    toast.error("Debes elegir una sede primero", {
      duration: 1500,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-8">
      <h1 className="text-3xl font-bold text-center text-black">
        BIENVENIDO A OPTIMA
        <br className="max-md:hidden" />
      </h1>
      <div>
        <SelectInputField
          header="Selecciona la sede a la que desea ingresar"
          label="Sede"
          value={hquarter}
          handleChange={handleHquarterChange}
          options={["Medellín", "Pereira"]}
        />
      </div>
      <Button
        className=" bg-secondaryColor hover:bg-primaryColor text-white font-bold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        Ingresar
      </Button>
      <Toaster />
    </div>
  );
}
