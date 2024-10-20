import axios from "axios";
import { URL } from "@base";
import { createContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const DoctorContex = createContext();

const DoctorProvider = ({ children }) => {
  const [doctorData, setDoctorData] = useState([]);
  const [dctAvailable, setDctAvailable] = useState([]);
  const { toast } = useToast();

  // Move fetchDoctor outside of useEffect
  const fetchDoctor = async () => {
    console.log("Fetching Doctors");

    await axios
      .get(`${URL}/api/admin/doctors`)
      .then((response) => {
        setDoctorData(response.data);
      })
      .catch((err) => {
        toast({
          title: "Unknown Error: ",
          status: "Failed",
          description: `${err.message}`,
          duration: 3000,
          className: "bg-green-100",
        });
      })
      .finally(() => {
        console.log(doctorData);
      });
  };

  const doctorAvailability = async () => {
    console.log("Fetching Doctor Availability");

    await axios
      .get(`${URL}/api/admin/getDoctorAvailability`)
      .then((response) => {
        setDctAvailable(response.data);
      })
      .catch((err) => {
        toast({
          title: "Unknown Error: ",
          status: "Failed",
          description: `${err.message}`,
          duration: 3000,
          className: "bg-green-100",
        });
      })
      .finally(() => {
        console.log(dctAvailable);
      });
  };

  useEffect(() => {
    doctorAvailability();
    fetchDoctor(); // Now you can call it inside useEffect
  }, []);

  const addDoctor = async (addDoctorData) => {
    await axios
      .post(`${URL}/api/admin/addDoctor`, addDoctorData)
      .then((response) => {
        toast({
          variant: "Success",
          title: "Doctor Added Successfully",
          description: `Name: ${addDoctorData.Name} Speciality: ${addDoctorData.Specialist}`,
          status: "Success",
          duration: 3000,
          className: "bg-green-100",
        });
        fetchDoctor(); // Fetch the latest doctors after adding
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: "Error Sending Doctor Data",
          status: "error",
          description: `${error.message}`,
          duration: 3000,
          className: "bg-red-100",
        });
      });

      fetchDoctor(); // Now you can call it inside useEffect

  };

  const updateDoctor = async (data, DID) => {
    console.log("Data to update:", data); // Log the data
    
    const currDoct = doctorData.find((doctor) => doctor.DID === DID);
  
    // Helper function to convert string to sentence case (capitalize first letter)
    const toSentenceCase = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
  
    // Normalize the keys by converting them to sentence case
    const normalizeKeys = (obj) => {
      return Object.keys(obj).reduce((acc, key) => {
        const sentenceCaseKey = toSentenceCase(key);
        acc[sentenceCaseKey] = obj[key];
        return acc;
      }, {});
    };
  
    const normalizedCurrentDoctor = normalizeKeys(currDoct);
    const normalizedData = normalizeKeys(data);
  
    const filteredCurrentDoctor = Object.keys(normalizedData).reduce(
      (acc, key) => {
        if (key in normalizedCurrentDoctor) {
          acc[key] = normalizedCurrentDoctor[key];
        }
        return acc;
      },
      {}
    );
  
    const isSame =
      JSON.stringify(filteredCurrentDoctor) === JSON.stringify(normalizedData);
  
    if (isSame) {
      toast({
        title: "No Changes Detected",
        description: "No changes made to doctor",
        status: "error",
        duration: 3000,
        className: "bg-red-200",
      });
      return;
    }
  
  
    await axios
      .put(`${URL}/api/admin/updateDoctor/${DID}`, data, {
        headers: {
          "Content-Type": "application/json", // Explicitly set the content type
        },
      })
      .then((response) => {
        toast({
          title: "Success",
          description: "Doctor Updated Successfully",
          className: "bg-green-100",
        });
        fetchDoctor(); // Fetch the latest doctors after updating
      })
      .catch((error) => {
        console.error("Error updating doctor:", error);
      });
  };
  

  const deleteDoctor = async (DID) => {
    await axios
      .delete(`${URL}/api/admin/deleteDoctor/${DID}`)
      .then((response) => {
        toast({
          title: "Doctor Deleted Successfully",
          status: "success",
          duration: 3000,
          className: "bg-green-100",
        });
        fetchDoctor(); // Fetch the latest doctors after deletion
      })
      .catch((error) => {
        toast({
          title: "Error Deleting Doctor",
          status: "error",
          description: `${error.message}`,
          duration: 3000,
          className: "bg-red-100",
        });
      });
  };

  return (
    <DoctorContex.Provider value={{ doctorData, dctAvailable, deleteDoctor, updateDoctor, addDoctor }}>
      {children}
    </DoctorContex.Provider>
  );
};

export { DoctorContex, DoctorProvider };
