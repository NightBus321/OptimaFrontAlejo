"use client";
import { useEffect, useState } from "react";

import { Card, CardBody } from "@material-tailwind/react";

import {
  ProjectTableCardHeader,
  ProjectTableHeader,
} from "./ProjectTableCardHeader";
import TableProjectContent from "./ProjectTableContent";
import {
  fetchAllProjects,
  fetchAvalProjects,
  fetchCodeProject,
  fetchUnavalProjects,
  fetchSemesterProject,
  fetchProjectsByTipology,
  fetchProjectsByStatus,
  fetchProjectsByAval,
} from "../API_PROJECTS";

export default function ProjectTable() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState(false);
  const [avalFilter, setAvalFilter] = useState("Todos");
  const [tipologyFilter, setTipologyFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [filterCode, setFilterCode] = useState(null);
  const [filterSemester, setFilterSemester] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setStatus(true);
      try {
        let projectsData;
        if (
          avalFilter === "Todos" ||
          statusFilter === "Todos" ||
          tipologyFilter === "Todos"
        ) {
          projectsData = await fetchAllProjects();
        } else if (filterCode != null) {
          projectsData = await fetchCodeProject(filterCode);
        } else if (filterSemester != null) {
          projectsData = await fetchSemesterProject(filterSemester);
        } else if (tipologyFilter != null) {
          projectsData = await fetchProjectsByTipology(tipologyFilter);
        } else if (statusFilter != null) {
          projectsData = await fetchProjectsByStatus(statusFilter);
        } else if (avalFilter != null) {
          projectsData = await fetchProjectsByAval(avalFilter);
        }

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchData();
  }, [avalFilter, filterCode, filterSemester, statusFilter, tipologyFilter]);

  return (
    <Card className="w-full h-full p-6 ">
      <ProjectTableCardHeader
        avalFilter={avalFilter}
        setAvalFilter={setAvalFilter}
        tipologyFilter={tipologyFilter}
        setTipologyFilter={setTipologyFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setFilterCode={setFilterCode}
        setFilterSemester={setFilterSemester}
      />
      <CardBody className="px-0 py-0">
        <div className="relative table-container">
          <table className="w-full text-left table-auto min-w-max">
            <ProjectTableHeader />
            <tbody>
              {projects.map(
                (
                  {
                    code,
                    name,
                    type,
                    category,
                    status,
                    semester,
                    students,
                    tutors,
                    documents,
                  },
                  index
                ) => {
                  const isLast = index === projects.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <TableProjectContent
                      key={code}
                      code={code}
                      name={name}
                      type={type}
                      category={category}
                      status={status}
                      semester={semester}
                      classes={classes}
                      students={students}
                      tutors={tutors}
                      documents={documents}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
