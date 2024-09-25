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
import React, { useState, useEffect, useRef } from "react";
import ActionButton from "../Dashboard Components/ActionButton";
import useAppointmentContext from "@/custom/pages/Hooks/useAppointmentContext";

function AppointmentList() {
  const { appointments } = useAppointmentContext();
  const [expandedRows, setExpandedRows] = useState({});
  const [showReadMore, setShowReadMore] = useState({});

  const descriptionRefs = useRef([]);

  const toggleReadMore = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    appointments.forEach((_, index) => {
      if (descriptionRefs.current[index]) {
        const descriptionHeight = descriptionRefs.current[index].scrollHeight;
        // Define the max-height before showing the Read More button
        const maxHeight = 48; // Example: max-height for 3 lines of text (can be adjusted)

        if (descriptionHeight > maxHeight) {
          setShowReadMore((prev) => ({ ...prev, [index]: true }));
        } else {
          setShowReadMore((prev) => ({ ...prev, [index]: false }));
        }
      }
    });
  }, [appointments]);

  return (
    <>
      <Card className="w-full">
        <Table>
          <TableCaption>Recent Appointments</TableCaption>
          <TableHeader className="bg-SidebarItemBG rounded-md">
            <TableRow>
              <TableHead className="text-mdDarkGreen dark:text-neonGreen">Sr</TableHead>
              <TableHead className="text-mdDarkGreen dark:text-neonGreen">Name</TableHead>
              <TableHead className="text-mdDarkGreen dark:text-neonGreen">Type of Disease</TableHead>
              <TableHead className="text-mdDarkGreen dark:text-neonGreen">Doctor</TableHead>
              <TableHead className="text-mdDarkGreen w-32 dark:text-neonGreen">Date</TableHead>
              <TableHead className="text-mdDarkGreen dark:text-neonGreen">Status</TableHead>
              <TableHead className="text-mdDarkGreen dark:text-neonGreen">Description</TableHead>
              <TableHead className="w-11 text-mdDarkGreen dark:text-neonGreen">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-600 dark:text-gray-300">{index + 1}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300">{item.PatientName}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300">{item.Disease}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300">{item.DoctorName || "N/A"}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300">{item.Date}</TableCell>
                <TableCell
                  className={`text-gray-600 dark:text-gray-300 ${
                    item.Status === "Waiting"
                      ? "text-red-500"
                      : item.Status === "Pending"
                      ? "text-yellow-500"
                      : item.Status === "Confirm"
                      ? "text-blue-500"
                      : item.Status === "Completed"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {item.Status}
                </TableCell>
                <TableCell className="text-gray-600  dark:text-gray-300">
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedRows[index] ? "max-h-96" : "max-h-12"
                    }`}
                    ref={(el) => (descriptionRefs.current[index] = el)} // Store reference to each description
                  >
                    <p>{item.Description}</p>
                  </div>
                  {showReadMore[index] && (
                    <button
                      onClick={() => toggleReadMore(index)}
                      className="text-blue-500 ml-2 transition-colors duration-300 hover:text-blue-700"
                    >
                      {expandedRows[index] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <ActionButton appId={item.AID} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default AppointmentList;
