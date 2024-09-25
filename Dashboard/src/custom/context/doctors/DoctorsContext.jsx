import axios from "axios";
import { URL } from "@base";
import { createContext, useEffect, useState } from "react";
import {  useToast } from "@/components/ui/use-toast";
const DoctorContex = createContext();

const DoctorProvider = ({ children }) => {
  const [doctorData, setDoctorData] = useState([]);
  const [dctAvailable, setDctAvailable ] = useState([])
  const { toast } = useToast();


  useEffect(() => {
    const fetchDoctor = async () => {
      console.log("USeEffect Load");

      const data = await axios
        .get(`${URL}/api/admin/doctors`)
        .then((response) => {
          setDoctorData(response.data);
        })
        .catch((err) => {
          toast({
            title: "Unknown Error : ",
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
      console.log("USeEffect Load");

      const data = await axios
        .get(`${URL}/api/admin/getDoctorAvailability`)
        .then((response) => {
          setDctAvailable(response.data);
        })
        .catch((err) => {
          toast({
            title: "Unknown Error : ",
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
    doctorAvailability()
    fetchDoctor();
  }, []);


  
  const addDoctor = async (addDoctorData) => {
    const data = await axios
      .post(`${URL}/api/admin/addDoctor`, addDoctorData)
      .then((response) => {
        toast({
          variant: "Success",
          title: "Doctor Added Successfully",
          description: `Name: ${addDoctorData.Name} Speciality: ${addDoctorData.Specialist}`,
          status: "Success",
          duration: 3000,
          className: "bg-white",
        });
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
      fetchDoctor()
  };
  const updateDoctor = async (data, DID) => {
    const currDoct = doctorData.find((doctor) => doctor.DID === DID);

    // Normalize keys to lowercase
    const normalizeKeys = (obj) => {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = obj[key];
        return acc;
      }, {});
    };

    const normalizedCurrentDoctor = normalizeKeys(currDoct);
    const normalizedData = normalizeKeys(data);

    // Filter out any extra properties from normalizedCurrentDoctor that are not in normalizedData
    const filteredCurrentDoctor = Object.keys(normalizedData).reduce(
      (acc, key) => {
        if (key in normalizedCurrentDoctor) {
          acc[key] = normalizedCurrentDoctor[key];
        }
        return acc;
      },
      {}
    );

    // Compare only relevant fields
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
    const response = await axios
      .put(`${URL}/api/admin/updateDoctor/${DID}`, data)
      .then((response) => {
        toast({
          title: "Success",
          description: "Doctor Updated Successfully",
        });
      })
      .catch((error) => {
        console.error("Error updating doctor:", error);
      });

      fetchDoctor()

  };

  const deleteDoctor = async (DID) => {
    const response = await axios
      .delete(`${URL}/api/admin/deleteDoctor/${DID}`)
      .then((response) => {
        toast({
          title: "Doctor Deleted Successfully",
          status: "success",
          duration: 3000,
          className: "bg-green-100",
        });
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
      fetchDoctor()
  };

  return (
    <DoctorContex.Provider value={{ doctorData,dctAvailable, deleteDoctor, updateDoctor, addDoctor }}>
      {children}
    </DoctorContex.Provider>
  );
};

export { DoctorContex, DoctorProvider };
