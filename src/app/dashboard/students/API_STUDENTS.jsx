import axios from "axios";

import route from "@/app/routes";

let hquarter;
if (typeof window !== "undefined") {
  hquarter = localStorage.getItem("hquarter");
}

const generalURL = `${route}/students/${hquarter}`;
const specificURL = `${route}/student`;

export async function fetchAllStudents() {
  try {
    const result = await axios.get(generalURL);
    return result.data; // Devolver directamente el resultado desde aquí
  } catch (error) {
    console.log(error);
    return []; // Devolver un valor predeterminado en caso de error
  }
}

export async function fetchActiveStudents() {
  try {
    const result = await axios.get(generalURL);
    const students = result.data;
    const studentsActive = students.filter((student) => student.active == true);
    return studentsActive;
  } catch (error) {
    console.log(error);
    return []; // Devolver un valor predeterminado en caso de error
  }
}

export async function fetchInactiveStudents() {
  try {
    const result = await axios.get(generalURL);
    const students = result.data;
    const studentsInactive = students.filter(
      (student) => student.active == false
    );
    return studentsInactive;
  } catch (error) {
    console.log(error);
    return []; // Devolver un valor predeterminado en caso de error
  }
}

export async function updateStudent(studentInfo, ced) {
  const url = `${specificURL}/${ced}`;
  try {
    const result = await axios.put(url, studentInfo);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteStudent(ced) {
  const url = `${specificURL}/${ced}`;
  try {
    const result = await axios.delete(url);
  } catch (error) {
    console.log(error);
    return [];
  }
}
