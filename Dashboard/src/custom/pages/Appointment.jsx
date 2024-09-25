import React from "react";
import { Outlet } from "react-router-dom";
import { AppointmentProvider } from "../context/appointments/AppointmentContext";
import DoctorSlider from "../components/vSlider Components/DoctorSlider";
import { DoctorProvider } from "../context/doctors/DoctorsContext";

function Appointment() {
  return (
    <AppointmentProvider>
      <DoctorProvider>
        <div className="flex w-full  h-screen overflow-hidden flex-col md:flex-row ">
          <div className="md:w-9/12 w-full  overflow-y-auto mb-2">
            <Outlet />
          </div>
          <div className="md:w-3/12 w-full md:p-5  h-screen overflow-y-auto">
            <DoctorSlider />
          </div>
        </div>
      </DoctorProvider>
    </AppointmentProvider>
  );
}

export default Appointment;
