import React, { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { routeContext } from "../../context/routes/routesContext";
import { Card } from "@/components/ui/card";
import LoginImg from "@/custom/utils/LoginImg";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminLoginContext } from "@/custom/context/admins/adminLogin";
import Cookies from "js-cookie";

// Custom hook to manage form state
const useAdminAuth = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  return { formData, handleChange, setFormData };
};

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const { formData, setFormData, handleChange } = useAdminAuth();
  const { authAdminLogin, adminAuth, setAdminAuth } = useContext(adminLoginContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    await authAdminLogin(formData); // Execute login logic
    
  };

  useEffect(() => {
    const adminAuthCookie = Cookies.get("adminAuth");
    if (adminAuthCookie) {
      const emailCookie = Cookies.get("Email");
      const passwordCookie = Cookies.get("Password");
      authAdminLogin({ email: emailCookie, password: passwordCookie });
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="flex max-w-4xl rounded-lg w-full dark:bg-white">
        {/* Left side with form */}
        <div className="md:w-1/2 w-full p-10">
          <div className="flex flex-col mb-6">
         
          
            <button
                className="bg-mdDarkGreen w-fit hover:bg-lightGreen text-white text-sm font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={()=>navigate(-1)}
              >
               &larr; Back
              </button>
     
          </div>
          <form autoComplete={"off"} className="flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-5 text-darkGreen text-center">Admin Login</h2>
            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-mdDarkGreen text-white py-2 rounded-md hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <p className="mt-4 text-center text-darkGreen">
              <NavLink to="/auth/login" className="text-blue-500 hover:underline">
                Login as Patient
              </NavLink>
            </p>
          </form>
        </div>
        {/* Right side with image */}
        <div className="hidden md:block md:w-1/2">
          <LoginImg className="w-full h-full object-cover rounded-tr-lg rounded-br-lg" />
        </div>
      </Card>
    </div>
  );
};


// FormField component for reusable form inputs
const FormField = ({ label, type, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-darkGreen text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

export default AdminLoginForm;
