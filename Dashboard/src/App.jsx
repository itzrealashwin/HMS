import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./custom/components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { URL } from "../base";
import { adminLoginContext } from "./custom/context/admins/adminLogin";

function App() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  console.log(URL);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row h-screen dark:bg-gray-900">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full w-16  md:w-60">
          <Sidebar />
        </div>

        <main className="ml-16  overflow-hidden  md:ml-60 flex-1 p-4 ">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
