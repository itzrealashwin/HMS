import { Card, CardContent, CardTitle } from '@/components/ui/card';
import useDoctorContext from '@/custom/pages/Hooks/useDoctorsContext';
import React from 'react';

function DoctorSlider() {
  const { dctAvailable } = useDoctorContext();
  console.log(dctAvailable);

  return (
    <div className="flex flex-row ml-5  md:m-0 md:flex-col items-stretch w-full md:max-w-xs  h-fit lg:max-h-screen overflow-y-auto">
      {dctAvailable.map((doctor, index) => (
        <Card key={index} className="bg-white p-4 min-w-fit  shadow-md mb-4">
          <CardTitle className="text-mdDarkGreen text-lg font-semibold">
            {doctor.doctorName}
          </CardTitle>
          <CardContent className="text-darkGreen  text-sm">
            <p><strong>ID:</strong> {doctor.doctorID}</p>
            <p><strong>Speciality:</strong> {doctor.doctorSpeciality}</p>
            <p><strong>Slot 1:</strong> {doctor.slot1}</p>
            <p><strong>Slot 2:</strong> {doctor.slot2}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DoctorSlider;
