import React from "react";
import { NavLink } from "react-router-dom";
import DoctorList from "../components/Doctor Components/DoctorList";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

function DoctorsPage() {
  return (
    <div className="flex flex-col space-y-2 gap-20 p-5 h-full overflow-y-auto">
      <div className="text-mdDarkGreen dark:text-neonGreen font-semibold flex flex-col space-y-2">
        <h1 className="text-3xl">Doctors</h1>
        <h3 className="font-medium">Make modification in doctor list</h3>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <NavLink to={"addDoctor"}>
            <Button className="w-fit h-9 text-neonGreen bg-darkGreen font-medium flex items-center justify-center gap-4">
              Add Doctor
              <span>
                <User />
              </span>
            </Button>
          </NavLink>
        </div>
        <div>
          <DoctorList />
          {/* <Outlet /> */}
        </div>
      </div>
    </div>
  );
}

export default DoctorsPage;
