import React, { useContext, useEffect, useState } from "react";
import stethoscope from "../../../../assets/stethoscope.svg";
import { StretchHorizontal, User2Icon, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { PatientSignUpContext } from "@/custom/context/auth/PatientSignUpContext";
import Logo from "@/custom/utils/Logo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit, LogOut } from "lucide-react";
import Cookies from "js-cookie";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn,handleLogin, setIsLoggedIn, patientData } = useContext(PatientSignUpContext);
  
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };
const handleLogOut = ()=>{
  Cookies.remove("patientLogin")
  Cookies.remove("Email")
  Cookies.remove("Password")
  Cookies.remove("Name")
  setIsLoggedIn(false)
  

}



  return (
    <header className="w-full h-72 md:h-96 bg-header-bg bg-no-repeat bg-center bg-cover text-[#D8F3DC] flex flex-col md:flex-row items-start">
      <div className="container flex md:flex-row justify-between items-start md:items-center py-3 px-6">
        <div className="max-w-80 min-w-28 rounded-full">
          <Logo className="w-80" />
        </div>
        <div className="flex flex-row md:flex-col items-stretch gap-7">
          <nav className="hidden md:flex gap-10 flex-shrink justify-between items-center text-[#D8F3DC] font-semibold">
            <div className="flex gap-16">
              <NavLink to="/" className="hover:text-white duration-200">
                Home
              </NavLink>
              <NavLink to="aboutUs" className="hover:text-white duration-200">
                About Us
              </NavLink>
              <NavLink
                to="bookAppointment"
                className="hover:text-white duration-200"
              >
                Book Appointment
              </NavLink>
              <NavLink to="feedback" className="hover:text-white duration-200">
                Feedback
              </NavLink>
            </div>
            <div className="flex items-stretch gap-4">
              {!isLoggedIn ? (
                <>
                  <NavLink to="auth/signup">
                    <Button className="bg-darkGreen hover:bg-green-950 text-white py-2 px-4 rounded">
                      SignUp
                    </Button>
                  </NavLink>
                  <NavLink to="auth/login">
                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-opacity-50 hover:text-[#103126] text-white py-2 px-4 rounded"
                    >
                      LogIn
                    </Button>
                  </NavLink>
                </>
              ) : (
                  <span className="flex gap-4">
                    <Popover >
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="bg-transparent hover:bg-green-100 flex gap-3">
                         <span> <User2Icon /></span>
                         <span className="text-lg"> {patientData.Name}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit  p-4">
                        <div className="flex flex-col gap-2">
                       
                          <Button
                            variant="outline"
                            className="w-fit border-none flex items-center gap-2 mt-2"
                            onClick={handleLogOut}
                          >
                            <LogOut className="text-red-800" />
                            Logout
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
              )}
            </div>
          </nav>
          <div className="flex flex-col md:flex-row gap-0 items-center">
            <div className="flex flex-col gap-2 text-justify text-[#D8F3DC]">
              <h1 className="text-3xl cursor-pointer font-semibold flex flex-col gap-2">
                Welcome to MEDLIFE
                <span className="text-base font-normal">
                  Advance Care Hospital!
                </span>
              </h1>
              <p>
                At MedLife, your health and well-being are our top priority. Our
                expert team offers exceptional care with state-of-the-art
                services in a compassionate environment.
              </p>
              <p>
                Ready to take the next step towards better health? Book your
                appointment online today and experience the MedLife difference.
                Your health journey starts here!
              </p>
            </div>
            <div className="hidden md:flex">
              <img src={stethoscope} alt="Stethoscope" />
            </div>
          </div>
        </div>

        <button
          className="block md:hidden text-2xl mt-4"
          onClick={handleMenuToggle}
        >
          <StretchHorizontal />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 text-darkGreen z-10 flex flex-col items-center pt-16 transition-transform duration-300 w-1/3 ease-in-out transform  ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={handleCloseMenu}
        >
          <X />
        </button>
        <div className="mt-16 flex flex-col items-center w-full">
          <NavLink
            to="/"
            className="py-2 text-lg w-full text-center"
            onClick={handleCloseMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="aboutUs"
            className="py-2 text-lg w-full text-center"
            onClick={handleCloseMenu}
          >
            About
          </NavLink>
          <NavLink
            to="bookAppointment"
            className="py-2 text-lg w-full text-center"
            onClick={handleCloseMenu}
          >
            Book Appointment
          </NavLink>
          <NavLink
            to="feedback"
            className="py-2 text-lg w-full text-center"
            onClick={handleCloseMenu}
          >
            Feedback
          </NavLink>
          {!isLoggedIn ? (
            <>
              <NavLink to="auth/signup" className="w-1/3">
                <Button
                  className="bg-green-950 hover:bg-darkGreen text-white py-2 px-4 rounded mt-4"
                  onClick={handleCloseMenu}
                >
                  SignUp
                </Button>
              </NavLink>
              <NavLink to="auth/login" className="w-1/3">
                <Button
                  variant="outline"
                  className="bg-transparent hover:bg-gray-100 hover:text-[#103126] text-darkGreen py-2 px-5 rounded mt-2"
                  onClick={handleCloseMenu}
                >
                  LogIn
                </Button>
              </NavLink>
            </>
          ) : (
            <div className="flex flex-col items-center w-full mt-4">
              <span className="flex gap-2 items-center text-lg">
                <User2Icon />
                {patientData.Name}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
