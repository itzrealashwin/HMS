import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import LoginImg from "@/custom/utils/LoginImg";
import { PatientSignUpContext } from "@/custom/context/auth/PatientSignUpContext";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function LoginForm() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useContext(PatientSignUpContext);
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send formData with correct property names to handleLogin
    const loginRes = handleLogin({
      Email: formData.Email,
      Password: formData.Password,
    });
    setErrors(loginRes);
  };

  return (
    <div className="flex items-center justify-center h-screen md:p-0 sm:sp-10 bg-green-100">
      <Card className="flex max-w-4xl rounded-lg max-h-7xl">
        {/* Left side with form */}
        <div className="md:w-1/2 w-full p-10">
          {/* Back Button */}
          <NavLink
            to="/"
            className="text-mdDarkGreen hover:text-darkGreen mb-5 inline-block"
          >
          
            <button
                className="bg-mdDarkGreen hover:bg-lightGreen text-white text-sm font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
               &larr; Back
              </button>
          </NavLink>

          <form autoComplete="off" className="flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-5 text-darkGreen text-center">
              Login
            </h2>
            <div className="mb-4">
              <label
                className="block text-darkGreen text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="Email"
                id="email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6 relative">
              <label
                className="block text-darkGreen text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                id="password"
                value={formData.Password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {/* Password toggle icon */}
              <span
                className="absolute inset-y-0 right-0 flex items-center top-7  pr-3 text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-mdDarkGreen text-white py-2 rounded-md hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <p className="mt-4 text-center text-darkGreen">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>{" "}
              or{" "}
              <Link to="/auth/adminLogin" className="text-blue-500 hover:underline">
                Login as Admin
              </Link>
            </p>
          </form>
        </div>
        {/* Right side with image */}
        <div className="w-0 md:w-1/2 md:block hidden">
          <LoginImg className="w-full h-full object-cover rounded-tr-lg rounded-br-lg" />
        </div>
      </Card>
    </div>
  );
}

export default LoginForm;
