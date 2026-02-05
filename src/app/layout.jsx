import "./styles/globals.css";

export const metadata = {
  title: "Optima",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    
    <body className="antialiased">{children}</body>
  </html>
);

export default RootLayout;
