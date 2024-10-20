import axios from "axios";
import { URL } from "@base";
import React, { createContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";



// Create the context
const AppointmentContext = createContext();

// Provider component
const AppointmentProvider = ({ children }) => {
 const {toast} =  useToast()
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [updateApp, setUpdateApp] = useState({appointmentId : null , formData : null });
  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${URL}/api/admin/appointments`);
      setAppointments(response.data); // Correctly set appointments from the response
    } catch (err) {
      setError(err); // Set the error state in case of an error
      toast({
        title: "Unknown Error Occured",
        description: "There was an error in Fetching Appoinments.",
      });
      console.error("Error fetching appointments:", err);
    }
  };
  
  const updateAppointments = async ({ appointmentId, formData }) => {
    try {
      const response = await axios.put(`${URL}/api/admin/appointments/${appointmentId}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      const data = response.data;
  
      toast({
        title: "Update Appointment Success",
        description: "Updated Info",
        className: "bg-green-100",
      });
  
      return data;
    } catch (err) {
      toast({
        title: "Update Appointment Failed",
        description: "There was an error in Updating Appointments.",
      });
      console.error("Error occurred", err);
    }
    fetchAppointments()
  }

  const deleteAppointments = async (appointmentId)=>{
    console.log(appointmentId);
    
    try {
      await axios.delete(`${URL}/api/admin/deleteAppointment/${appointmentId}`);
      toast({
        title: "Delete Appointment Success",
        description: "Appointment Deleted",
        className: "bg-red-100",

      });
      fetchAppointments()
    } catch (err) {
      toast({
        title: "Delete Appointment Failed",
        description: "There was an error in Deleting Appointments.",
      });
      console.error("Error occurred", err);
    }
  }
  

  useEffect(() => {
    console.log("hello");

    fetchAppointments();
    
  }, []);


// useEffect(()=>{
//   updateAppointments()
// }, [updateApp])


  return (
    <AppointmentContext.Provider value={{ appointments, setUpdateApp, error , deleteAppointments, updateAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export { AppointmentProvider, AppointmentContext };
