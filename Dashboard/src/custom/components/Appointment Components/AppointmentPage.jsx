import { AppointmentProvider } from '@/custom/context/appointments/AppointmentContext';
import React from 'react'
import AppointmentList from './AppointmentList';

function AppointmentPage() {
    const user = "Ashwin";
    return (
        <div>
          <div className="text-mdDarkGreen dark:text-neonGreen space-y-2 p-5">
            <h1 className="text-3xl font-semibold">
              Appointments 
            </h1>
            <h3 className="font-medium">
              View and Manage All Appointments
            </h3>
          </div>
          <div className="bottom flex max-w-full flex-row p-5">
            <div className="WA-Visit-app  w-full gap-9 flex flex-col">
            
             
                <AppointmentList /> {/* Replacing Appointments with AppointmentList */}
             
            </div>
          </div>
        </div>
    );
}

export default AppointmentPage