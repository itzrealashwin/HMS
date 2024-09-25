import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import { URL } from "@base";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const PatientSignUpContext = createContext();

function PatientSignUpProvider({ children }) {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state

  const { toast } = useToast();



  async function Signup(PatientData) {
    try {
      const response = await axios.post(
        `${URL}/api/patients/signup`,
        PatientData
      );

      setPatientData(response.data);
    

      setIsLoggedIn(true);
      navigate("/");

      toast({
        type: "success",
        title: "Login Successful",
        description: `Welcome ${response.data.Name}`,
      });
    } catch (error) {
      toast({
        type: "error",
        title: "Error Signing Up",
        description: error.message,
      });
    }
  }

  async function handleLogin(data) {
    try {
      const response = await axios.post(`${URL}/api/patients/login`, data);
      setIsLoggedIn(true);
      console.log(response.data);
      Cookies.set("patientLogin", "true", { expires: 7 }); // Set the login cookie for 7 days
      Cookies.set("PatientEmail", data.Email , { expires: 7 }); // Set the login cookie for 7 days
      Cookies.set("PatientPassword", data.Password, { expires: 7 }); // Set the login cookie for 7 days
      

      setPatientData(response.data);
      navigate("/")

  
    } catch (error) {
      toast({
        type: "error",
        title: "Login Failed, Please Relogin",
        description: error.message,
        className:"bg-red-200"
      });


    }
  }


  useEffect(()=>{

    if(Cookies.get("patientLogin")){
    const Email =   Cookies.get("PatientEmail")
    const Password = Cookies.get("PatientPassword")
    handleLogin({Email, Password})
    }
    
  }, [])

  return (
    <PatientSignUpContext.Provider
      value={{ Signup, patientData, setPatientData, isLoggedIn,setIsLoggedIn, handleLogin }}
    >
      {children}
    </PatientSignUpContext.Provider>
  );
}

export { PatientSignUpContext, PatientSignUpProvider };
