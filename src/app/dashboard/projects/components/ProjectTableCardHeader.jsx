import {
  CardHeader,
  Typography,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  FILTER_PROJECT_HEADER,
  PROJECT_TABLE_HEADER,
} from "../headers/headers";
import SearchBar from "../../components/SearchBar";
import CreateProjectDialog from "./CreateProjectDialog";
import { useState } from "react";
import SelectSemesterFilter from "./SelectSemesterFilter";

import FilterBySelection from "../../components/filterComponents/FilterBySelection";
import SearchByKeyword from "../../components/filterComponents/SearchByKeyword";

export const ProjectTableHeader = () => {
  return (
    <thead className="sticky top-[135px] bg-[#e78015] z-1">
      <tr>
        {PROJECT_TABLE_HEADER.map((head) => (
          <th
            key={head}
            className="bg-[#e78015] border-y border-blue-gray-100  p-4"
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
  );
};
export const ProjectTableCardHeader = ({
  avalFilter,
  setAvalFilter,
  tipologyFilter,
  setTipologyFilter,
  statusFilter,
  setStatusFilter,
  setFilterCode,
  setFilterSemester,
}) => {
  const handleValueSemesterFilter = (event) => {
    if (event != null) {
      setFilterCode(null);
      setTipologyFilter(null);
      setStatusFilter(null);
      setAvalFilter(null);
      setFilterSemester(event.value);
      return;
    }
    setTipologyFilter("Todos");
    setStatusFilter("Todos");
    setAvalFilter("Todos");
    setFilterSemester(null);
  };

  const handleValueCodeFilter = (event) => {
    if (event != null) {
      setFilterSemester(null);
      setTipologyFilter(null);
      setStatusFilter(null);
      setAvalFilter(null);
      setFilterCode(event.value);
      return;
    }
    setTipologyFilter("Todos");
    setStatusFilter("Todos");
    setAvalFilter("Todos");
    setFilterCode(null);
  };

  const handleAvalFilter = (value) => {
    setFilterCode(null);
    setFilterSemester(null);
    setTipologyFilter(null);
    setStatusFilter(null);
    setAvalFilter(value);
  };

  const handleTipologyFilter = (value) => {
    setFilterCode(null);
    setFilterSemester(null);
    setAvalFilter(null);
    setStatusFilter(null);
    setTipologyFilter(value);
  };

  const handleStatusFilter = (value) => {
    setFilterCode(null);
    setFilterSemester(null);
    setAvalFilter(null);
    setTipologyFilter(null);
    setStatusFilter(value);
  };

  let hquarter;
  if (typeof window !== "undefined") {
    hquarter = localStorage.getItem("hquarter");
  }
  return (
    <>
      <CardHeader floated={false} shadow={false} className="rounded-none ">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Proyectos Formativos
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Aquí hay detalles de los proyectos formativos
            </Typography>
          </div>

          <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
            <CreateProjectDialog />
          </div>
        </div>
      </CardHeader>
      <div className="sticky top-[63px] bg-white z-10 p-2 flex flex-col items-center justify-between gap-4 md:flex-row">
        <SearchByKeyword
          link={`/projects/${hquarter}`}
          onSelectChange={handleValueCodeFilter}
        />
        <FilterBySelection
          handleChange={handleAvalFilter}
          label={"Aval"}
          options={["Todos", "Con aval", "Sin aval"]}
          value={avalFilter}
        />
        <FilterBySelection
          handleChange={handleTipologyFilter}
          label={"Tipología"}
          options={[
            "Todos",
            "Docencia Servicio",
            "Medios Digitales",
            "Institucional",
            "Externo",
          ]}
          value={tipologyFilter}
        />
        <FilterBySelection
          handleChange={handleStatusFilter}
          label={"Etapa"}
          options={[
            "Todos",
            "Anteproyecto",
            "En Ejecución",
            "En Pausa",
            "Finalizado",
            "Cancelado",
          ]}
          value={statusFilter}
        />
        <SelectSemesterFilter onSelectChange={handleValueSemesterFilter} />
      </div>
    </>
  );
};
