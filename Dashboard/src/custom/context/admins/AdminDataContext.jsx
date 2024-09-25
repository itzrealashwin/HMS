import axios from "axios";
import { URL } from "@base";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState([]);
  const { toast } = useToast();
  const navigate =  useNavigate()

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(`${URL}/api/admin/admins`);
      if (response && response.data) {
        setAdminData(response.data);
      }
    } catch (error) {
      toast({
        type: "error",
        title: "Error fetching admins data",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []); // Add dependency array to run effect only once

  const deleteAdmin = async (AID) => {
    const response = await axios
      .delete(`${URL}/api/admin/deleteAdmin/${AID}`)
      .then((response) => {
        toast({
          title: "Admin Deleted Successfully",
          status: "success",
          duration: 3000,
          className: "bg-green-100",
        });
      })
      .catch((error) => {
        toast({
          title: "Error Deleting Admin",
          status: "error",
          description: `${error.message}`,
          duration: 3000,
          className: "bg-red-100",
        });
      });
    fetchAdminData();
  };

  const updateAdmin = async (newAdminData, AID) => {


  


    try {
      const response = await axios.put(
        `${URL}/api/admin/updateAdmin/${AID}`,
        newAdminData
      );
      if (response && response.data) {
        toast({
          title: "Admin Updated Successfully",
          status: "success",
          duration: 3000,
          className: "bg-green-100",
        });
        fetchAdminData(); 
        navigate(-1)
      }
    } catch (error) {
      toast({
        title: "Error Updating Admin",
        status: "error",
        description: `${error.message}`,
        duration: 3000,
        className: "bg-red-100",
      });
    }
  };
  const addAdmin = async (addAdminData) => {
    const toSentenceCase = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    
    const convertKeysToSentenceCase = (data) => {
      return Object.keys(data).reduce((acc, key) => {
        acc[toSentenceCase(key)] = data[key];
        return acc;
      }, {});
    };

      const formattedAdminData = convertKeysToSentenceCase(addAdminData);
    const data = await axios
      .post(`${URL}/api/admin/addAdmin`, formattedAdminData)
      .then((response) => {
        toast({
          variant: "Success",
          title: "Admin Added Successfully",
          description: `${formattedAdminData.Name} added as admin`,
          status: "Success",
          duration: 3000,
          className: "bg-green-100",
        });
        fetchAdminData();

        navigate(-1)
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
  };

  return (
    <AdminContext.Provider
      value={{ adminData, deleteAdmin, addAdmin, updateAdmin, setAdminData }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
