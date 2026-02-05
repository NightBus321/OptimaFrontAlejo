"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  DocumentChartBarIcon, 
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const links = [
  {
    icon: <HomeIcon className="h-6 w-6 flex" />,
    name: "Inicio",
    href: "/dashboard",
  },
  {
    icon: <UserIcon className="h-6 w-6 flex" />,
    name: "Tutores",
    href: "/dashboard/tutors",
  },
  {
    icon: <UserGroupIcon className="h-6 w-6 flex" />,
    name: "Estudiantes",
    href: "/dashboard/students",
  },
  {
    icon: <ClipboardDocumentCheckIcon className="h-6 w-6 flex" />,
    name: "Proyectos",
    href: "/dashboard/projects",
  },
  {
    icon: <DocumentChartBarIcon className="h-6 w-6 flex" />,
    name: "Reportes",
    href: "/dashboard/reports",
  }, 
  {
    icon: <BookOpenIcon className="h-6 w-6 flex" />,
    name: "Manual",
    href: "https://optima-docs.vercel.app/",
  },
  {
    icon: <ArrowRightOnRectangleIcon className="h-7 w-7 flex" />,
    name: <span className="mr-2">Salir</span>,
    href: "./",
  }, 
  
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "flex flex-row items-center transition-transform duration-200",
            {
              "text-secondaryColor scale-110": pathname === link.href,
              "text-white hover:text-secondaryColor hover:scale-110":
                pathname !== link.href,
            }
          )}
        >
          {link.icon}
          <span>{link.name}</span>
        </Link>
      ))}
    </>
  );
}
