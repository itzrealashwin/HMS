import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SignupImg from "@/custom/utils/SignupImg";
import { PatientSignUpContext } from "@/custom/context/auth/PatientSignUpContext";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Add this for the eye icons

function Signup() {
  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    Mono: "",
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState({
    Age: "",
    Mono: "",
    Email: "",
    Password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  const { Signup } = useContext(PatientSignUpContext);
  const navigate = useNavigate()
  const validateAge = (value) => {
    if (value < 1 || value > 120) return "Age must be between 1 and 120.";
    return "";
  };

  const validateMobile = (value) => {
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(value)) return "Mobile number must be 10 digits.";
    return "";
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Please enter a valid email address.";
    return "";
  };

  const validatePassword = (value) => {
    const passPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,}$/;
    if (!passPattern.test(value)) return "Password must be at least 6 characters long, contain at least one letter, one digit, and one special character.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "Age") {
      setErrors({ ...errors, Age: validateAge(value) });
    } else if (name === "Mono") {
      setErrors({ ...errors, Mono: validateMobile(value) });
    } else if (name === "Email") {
      setErrors({ ...errors, Email: validateEmail(value) });
    } else if (name === "Password") {
      setErrors({ ...errors, Password: validatePassword(value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const AgeError = validateAge(formData.Age);
    const MonoError = validateMobile(formData.Mono);
    const EmailError = validateEmail(formData.Email);
    const PasswordError = validatePassword(formData.Password);

    const newErrors = {
      Age: AgeError,
      Mono: MonoError,
      Email: EmailError,
      Password: PasswordError,
    };

    setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors).find(
      (key) => newErrors[key]
    );

    if (firstErrorField) {
      document.getElementById(firstErrorField)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    Signup(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="max-w-6xl w-full flex flex-col md:flex-row overflow-hidden light">
        <div className="w-full md:w-1/2 p-10 flex flex-col">
          <h2 className="text-2xl font-bold mb-5 text-center text-darkGreen">
            Signup
          </h2>
          <NavLink to={()=>navigate(-1)}
            className="text-mdDarkGreen hover:text-darkGreen mb-5 inline-block"
          >
          
            <button
                className="bg-mdDarkGreen hover:bg-lightGreen text-white text-sm font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
               &larr; Back
              </button>
          </NavLink>
          <form autoComplete={"off"} onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-grow">
              <div className="flex flex-col">
                <label
                  className="block text-darkGreen text-sm font-bold mb-2"
                  htmlFor="Name"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mdDarkGreen"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-darkGreen text-sm font-bold mb-2"
                  htmlFor="Age"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="Age"
                  id="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="120"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.Age ? "border-red-500 focus:ring-red-500" : "focus:ring-mdDarkGreen"}`}
                  required
                  // Remove arrows
                  onWheel={(e) => e.target.blur()}
                />
                <p className="text-red-500 text-sm mt-1 h-5">{errors.Age}</p>
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-darkGreen text-sm font-bold mb-2"
                  htmlFor="Mono"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="Mono"
                  id="Mono"
                  value={formData.Mono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength="10"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mdDarkGreen"
                  required
                />
                <p className="text-red-500 text-sm mt-1 h-5">{errors.Mono}</p>
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-darkGreen text-sm font-bold mb-2"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.Email ? "border-red-500 focus:ring-red-500" : "focus:ring-mdDarkGreen"}`}
                  required
                />
                <p className="text-red-500 text-sm mt-1 h-5">{errors.Email}</p>
              </div>
              <div className="col-span-2 flex flex-col">
                <label
                  className="block text-darkGreen text-sm font-bold mb-2"
                  htmlFor="Password"
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    id="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.Password ? "border-red-500 focus:ring-red-500" : "focus:ring-mdDarkGreen"}`}
                    required
                  />
                  <div
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                <p className="text-red-500 text-sm mt-1 h-5">{errors.Password}</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-mdDarkGreen text-white py-2 rounded-md hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-mdDarkGreen"
            >
              Sign Up
            </button>
          </form>
            <p className="mt-4 text-center text-darkGreen">
           
             
              <Link to="/auth/login" className="text-blue-500 hover:underline">
                Login Now
              </Link>
            </p>
        </div>
        <div className="hidden md:block w-1/2">
          <SignupImg className="w-full h-full object-cover rounded-tr-lg rounded-br-lg" />
        </div>
      </Card>
    </div>
  );
}

export default Signup;
