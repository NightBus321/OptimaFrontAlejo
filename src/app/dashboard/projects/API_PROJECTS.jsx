import route from "@/app/routes";
import axios from "axios";

let hquarter;

if (typeof window !== "undefined") {
  hquarter = localStorage.getItem("hquarter");
}

const generalURL = `${route}/projects/${hquarter}`;
const specificURL = `${route}/project`;

// Consultas de proyectos en general
export async function fetchAllProjects() {
  try {
    const result = await axios.get(generalURL);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchProjectsByTipology(tipology) {
  try {
    const result = await axios.get(generalURL);
    const projects = result.data;
    const projectsActive = projects.filter(
      (project) => project.type == tipology
    );
    return projectsActive;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchProjectsByAval(aval) {
  try {
    const result = await axios.get(generalURL);
    const projects = result.data;
    let projectsActive;
    if (aval === "Con aval") {
      projectsActive = projects.filter((project) => project.aval == 2);
    }
    if (aval === "Sin aval") {
      projectsActive = projects.filter((project) => project.aval == 1);
    }
    return projectsActive;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchProjectsByStatus(status) {
  try {
    const result = await axios.get(generalURL);
    const projects = result.data;
    const projectsActive = projects.filter(
      (project) => project.status == status
    );
    return projectsActive;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchAvalProjects() {
  try {
    const result = await axios.get(generalURL);
    const projects = result.data;
    const projectsActive = projects.filter((project) => project.aval == 1);
    return projectsActive;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchCodeProject(code) {
  try {
    const result = await axios.get(generalURL);
    const projects = result.data;
    const projectsActive = projects.filter((project) => project.code === code);
    return projectsActive;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchSemesterProject(semester) {
  try {
    const result = await axios.get(generalURL);
    const projects = result.data;
    const projectsSemester = projects.filter(
      (project) => project.semester === semester
    );
    return projectsSemester;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchUnavalProjects() {
  try {
    const result = await axios.get(generalURL);
    const projects = result.data;
    const projectsInactive = projects.filter((project) => project.aval == 2);
    return projectsInactive;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Consultas de un proyecto en específico
export async function updateProject(projectInfo, code) {
  const url = `${specificURL}/${code}`;
  try {
    const result = await axios.put(url, projectInfo);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteProject(code) {
  const url = `${specificURL}/${code}`;
  try {
    const result = await axios.delete(url);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createProjectProduction(productionInfo, files, code) {
  const url = `${route}/uploadProduct/${code}`;
  const formData = new FormData();

  if (files) {
    console.log("files if");

    for (let i = 0; i < files.length; i++) {
      formData.append(i, files[i]);
    }
  }

  formData.append("name", productionInfo.name);
  formData.append("category", productionInfo.category);
  formData.append("subCategory", productionInfo.subCategory);
  formData.append("type", productionInfo.type);

  try {
    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw new Error("Error desde API PROJECTS");
  }
}
