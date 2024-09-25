import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"; 
import Cookies from "js-cookie";
import { URL } from "@base";
import { useNavigate } from "react-router-dom";

const adminLoginContext = createContext();

const AdminLoginProvider = (props) => {
  const [adminInfo, setAdminInfo] = useState({}); // Use null instead of an empty array
  const [adminAuth, setAdminAuth] = useState(false); // Default to false
  const { toast } = useToast();
  const navigate = useNavigate();

  const authAdminLogin = async (formData) => {
    const requestData = { Email: formData.email, Password: formData.password };
    try {
      const response = await axios.post(`${URL}/api/admin/login`, requestData, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;
      console.log(data.admin);
      
      setAdminInfo(data.admin);
      setAdminAuth(true);
      
      
      // Set cookie for 30 days
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      Cookies.set("adminAuth", "true", { expires: expirationDate });
      Cookies.set("Email", formData.email, { expires: expirationDate });
      Cookies.set("Password", formData.password, { expires: expirationDate });
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Login failed:", err);
      toast({
        title: "Login Failed",
        description: "There was an error logging in. Please try again.",
      });
      setAdminAuth(false);
    }
  };
  
 // Empty dependency array ensures this runs only once on mount
  
  const Logout = () => {
    Cookies.remove("adminAuth");
    Cookies.remove("Email");
    Cookies.remove("Password");
    setAdminAuth(false); 
    setAdminInfo(null); // Reset state
  };
  
  return (
    <adminLoginContext.Provider
      value={{
        adminInfo,
        setAdminInfo,
        adminAuth,
        setAdminAuth,
        authAdminLogin, 
        Logout,
      }}
    >
      {props.children}
    </adminLoginContext.Provider>
  );
};

export { adminLoginContext, AdminLoginProvider };
