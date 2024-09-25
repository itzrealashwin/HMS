import React, { useContext } from "react";
import VisitHistory from "../components/Dashboard Components/VisitHistory";
import WACount from "../components/Dashboard Components/WACount";
import Appointments from "../components/Dashboard Components/Appointments";
import { AppointmentProvider } from "../context/appointments/AppointmentContext";
import useAdminContext from "./Hooks/useAdminContext";
import { adminLoginContext } from "../context/admins/adminLogin";

function Dashboard() {
  const { adminInfo } = useContext(adminLoginContext);
  console.log(adminInfo);
  

  return (
    <AppointmentProvider>
      
        <div className="flex flex-col p-5  ">
          <div className="welcome text-mdDarkGreen dark:text-neonGreen space-y-2">
            <h1 className="text-3xl font-semibold">
              Welcome <span>{adminInfo.Name}</span>
            </h1>
            <h3 className="font-medium">
              Manage the Appointments with Comprehensive Tools
            </h3>
          </div>
          <div className="bottom flex flex-col gap-9 mt-5">
            <div className="flex flex-col lg:flex-row gap-3 ">
              <WACount />
              <VisitHistory />
            </div>
            <div className="w-fit">
              <Appointments />
            </div>
          </div>   
        </div>
    </AppointmentProvider>
  );
}

export default Dashboard;
