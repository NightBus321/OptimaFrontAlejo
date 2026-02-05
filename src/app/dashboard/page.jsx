import React from 'react';
import Link from 'next/link'; // Importa el componente Link
import { UserIcon } from '@heroicons/react/24/solid';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { UserGroupIcon } from '@heroicons/react/24/solid';

const Title = () => {
  return (
    <div className="text-center mr-10 mt-16">
      <h1 className="text-6xl font-bold">OPTIMA</h1>
      <p className="text-2xl text-gray-600">Eficiencia, coordinación y resultados es nuestra idea OPTIMA</p>
    </div>
  );
};

const Card = ({ icon, title, buttonLink, buttonText }) => {
  return (
    <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0 items-center ">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center mb-4">
          <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {icon}
          </svg>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <Link href={buttonLink}>
          <button className="bg-primaryColor hover:bg-secondaryColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

const TutorIcon = () => (
  <UserIcon className="h-6 w-6 text-primaryColor" />
);

const StudentsIcon = () => (
  <UserGroupIcon className="h-6 w-6 text-primaryColor" />
);

const ProjectsIcon = () => (
  <ClipboardDocumentCheckIcon className="h-6 w-6 text-primaryColor" />
);

const Home = () => {
  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-center">
        <div className="mt-20">
          <Title />
        </div>
      </div>
      <div className="flex flex-wrap mx-1 mt-20 mr-10">
        {/* Pasamos el botón de texto y la ruta como propiedades */}
        <Card icon={<TutorIcon />} title="Tutores" buttonText="Vamos" buttonLink="/dashboard/tutors" />
        <Card icon={<StudentsIcon />} title="Estudiantes" buttonText="Vamos" buttonLink="/dashboard/students" />
        <Card icon={<ProjectsIcon />} title="Proyectos" buttonText="Vamos" buttonLink="/dashboard/projects" />
      </div>
    </div>
  );
};

export default Home;