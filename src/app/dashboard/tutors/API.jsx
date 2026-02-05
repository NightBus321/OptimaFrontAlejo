import axios from "axios";
import route from "@/app/routes";

let hquarter;
if (typeof window !== "undefined") {
  hquarter = localStorage.getItem("hquarter");
}

const generalURL = `${route}/tutors/${hquarter}`;
const specificURL = `${route}/tutor`;

export async function fetchAllTutors() {
  try {
    const result = await axios.get(generalURL);
    return result.data; // Devolver directamente el resultado desde aquí
  } catch (error) {
    console.log(error);
    return []; // Devolver un valor predeterminado en caso de error
  }
}

export async function fetchActiveTutors() {
  try {
    const result = await axios.get(generalURL);
    const tutors = result.data;
    const tutorsActive = tutors.filter((tutor) => tutor.active === 1);
    return tutorsActive;
  } catch (error) {
    console.log(error);
    return []; // Devolver un valor predeterminado en caso de error
  }
}

export async function fetchInactiveTutors() {
  try {
    const result = await axios.get(generalURL);
    const tutors = result.data;
    const tutorsInactive = tutors.filter((tutor) => tutor.active === 0);
    return tutorsInactive;
  } catch (error) {
    console.log(error);
    return []; // Devolver un valor predeterminado en caso de error
  }
}

export async function updateTutor(tutorInfo, ced) {
  const url = `${specificURL}/${ced}`;
  try {
    const result = await axios.put(url, tutorInfo);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteTutor(ced) {
  const url = `${specificURL}/${ced}`;
  try {
    const result = await axios.delete(url);
  } catch (error) {
    console.log(error);
    return [];
  }
}
