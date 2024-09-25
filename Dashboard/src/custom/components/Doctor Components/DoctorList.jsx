import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import ActionButton from "../Doctor Components/ActionButton";
import useDoctorContext from "@/custom/pages/Hooks/useDoctorsContext";

function DoctorList() {
  const { doctorData } = useDoctorContext();

  const mappedDoctorData = doctorData
    ? doctorData.map((doctor, index) => ({
        id: index,
        name: doctor.Name || "N/A", // Fallback to 'N/A' if the name is not defined
        gender: doctor.Gender || "Unknown",
        age: doctor.Age || "Unknown",
        mono: doctor.Mono || "N/A",
        email: doctor.Email || "N/A",
        specialist: doctor.Specialist || "General",
        degrees: doctor.Degrees || [], // Fallback to an empty array if degrees are not defined
        DID : doctor.DID || "N/A", // Fallback to
      }))
    : [];
    

  return (
    <>
      <Card>
        <Table>
          <TableCaption>Doctor Details</TableCaption>
          <TableHeader className="bg-SidebarItemBG rounded-md">
            <TableRow>
              <TableHead className="text-mdDarkGreen px-6 py-4">Sr</TableHead>
              <TableHead className="text-mdDarkGreen px-6 py-4">Name</TableHead>
              <TableHead className="text-mdDarkGreen px-6 py-4">Age</TableHead>
              <TableHead className="w-48 text-mdDarkGreen px-6 py-4">
                Speciality
              </TableHead>
              <TableHead className="text-mdDarkGreen px-6 py-4">
                Degrees
              </TableHead>
              <TableHead className="text-mdDarkGreen px-6 py-4">
                Email
              </TableHead>
              <TableHead className="w-11 text-mdDarkGreen px-6 py-4">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mappedDoctorData.map((doctor, index) => (
              <TableRow key={doctor.id} className="hover:bg-gray-100">
                <TableCell className="text-gray-600 dark:text-gray-300 px-6 py-4">
                  {index + 1}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 px-6 py-4">
                  {doctor.name}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 px-6 py-4">
                  {doctor.age}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 px-6 py-4">
                  {doctor.specialist}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 px-6 py-4">
                  {doctor.degrees.join(", ")}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 px-6 py-4">
                  {doctor.email}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 px-6 py-4 flex items-center justify-center">
                  <ActionButton DID={doctor.DID} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default DoctorList;
