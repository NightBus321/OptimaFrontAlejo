import "./styles/globals.css";
import NavLinks from "./components/NavLink";

export const metadata = {
  title: "Optima",
};

const Layout = ({ children }) => (
  <body>
    <nav className="navbar">
      <div className="flex flex-row gap-x-4 bg-primaryColor items-center p-2">
        <h1 className="text-5xl font-bold text-white mr-auto">OPTIMA</h1>
        <NavLinks />
      </div>
    </nav>
    <div>{children}</div>
  </body>
);

export default Layout;
