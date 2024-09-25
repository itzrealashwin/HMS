import React from 'react';
import { AppointmentProvider } from '../context/appointments/AppointmentContext';
import { DoctorProvider } from '../context/doctors/DoctorsContext';
import { Outlet } from 'react-router-dom';
import DoctorSlider from '../components/vSlider Components/DoctorSlider';
import { AdminLoginProvider } from '../context/admins/adminLogin';

function DashboardPage() {
  return (
    <AppointmentProvider>
      <DoctorProvider>
      <AdminLoginProvider>

        <div className="flex flex-col lg:flex-row w-full h-screen">
          <div className="lg:w-9/12 w-full h-full overflow-y-auto">
            <Outlet />
          </div>
          <div className="lg:w-3/12 w-full h-full overflow-y-auto">
            <DoctorSlider />
          </div>
        </div>
        </AdminLoginProvider>
      </DoctorProvider>
    </AppointmentProvider>
  );
}

export default DashboardPage;
