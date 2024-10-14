import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./custom/pages/Dashboard.jsx";
import Doctor from "./custom/pages/Doctor.jsx";
import AddDoctor from "./custom/pages/AddDoctor.jsx";
import EditAppointment from "./custom/components/Common/EditAppointment.jsx";
import Home from "./custom/pages/Home.jsx";
import AdminLoginForm from "./custom/components/Auth Components/AdminLogin.jsx";
import RoutesContextProvider from "./custom/context/routes/routesContext.jsx";

import { Toaster } from "./components/ui/toaster.jsx";
import {AdminLoginProvider} from "./custom/context/admins/adminLogin.jsx";
import Aboutus from "./custom/pages/Aboutus.jsx";
import BookAppointment from "./custom/pages/BookAppointment.jsx";
import Signup from "./custom/components/Auth Components/Signup.jsx";
import LoginForm from "./custom/components/Auth Components/Login.jsx";
import AuthPage from "./custom/pages/AuthPage.jsx";
import UpdateDoctor from "./custom/components/Doctor Components/DoctorUpdate.jsx";
import Admins from "./custom/pages/Admins.jsx";
import AddAdmin from "./custom/pages/AddAdmin.jsx";
import DoctorsPage from "./custom/pages/DoctorsPage.jsx";
import Appointment from "./custom/pages/Appointment.jsx";
import AppointmentPage from "./custom/components/Appointment Components/AppointmentPage.jsx";
import { AppointmentProvider } from "./custom/context/appointments/AppointmentContext.jsx";
import { WACountProvider } from "./custom/context/dashboard/WACountContext.jsx";
import { VisitHistoryProvider } from "./custom/context/dashboard/VisitHistoryContext.jsx";
import { DoctorProvider } from "./custom/context/doctors/DoctorsContext.jsx";
import { AdminContextProvider } from "./custom/context/admins/AdminDataContext.jsx";
import EditAdmin from "./custom/components/Admin Components/EditAdmin.jsx";
import FeebackFormPage from "./custom/pages/FeebackFormPage.jsx";
import Feedback from "./custom/pages/Feedback.jsx";
import PatientSide from "./custom/pages/PatientSide.jsx";
import DashboardPage from "./custom/pages/DashboardPage.jsx";
import { BookAppointmentProvider } from "./custom/context/appointments/BookAppointmentContext.jsx";
import { PatientSignUpProvider } from "./custom/context/auth/PatientSignUpContext.jsx";
import Settings from "./custom/pages/Settings.jsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Navigate to="/admin/Dashboard" />,
  // },

  {
    path: "/",
    element: (
      <PatientSignUpProvider>
        <PatientSide />
      </PatientSignUpProvider>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/aboutUs",
        element: <Aboutus />,
      },
      {
        path: "/bookAppointment",
        element: (
          <BookAppointmentProvider>
            {" "}
            <BookAppointment />{" "}
          </BookAppointmentProvider>
        ),
      },
      {
        path: "/feedback",
        element: <FeebackFormPage />,
      },
    ],
  },

  {
    path: "/auth",
    element: (
      <PatientSignUpProvider>
        {" "}
        <AdminLoginProvider>
          <AuthPage />
        </AdminLoginProvider>{" "}
      </PatientSignUpProvider>
    ),
    children: [
      {
        path: "/auth",
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "adminLogin",
        element: <AdminLoginForm />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLoginProvider> <App /> </AdminLoginProvider> ,
    children: [
      {
        path: "/admin",
        element: <Navigate to="/admin/Dashboard" />,
      },
      {
        path: "Dashboard",
        element: (
          <WACountProvider>
            <VisitHistoryProvider>
              <DashboardPage />
            </VisitHistoryProvider>
          </WACountProvider>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "editAppointment",
            element: (
              <AppointmentProvider>
                <EditAppointment />{" "}
              </AppointmentProvider>
            ),
          },
        ],
      },

      {
        path: "Doctors",
        element: (
          <DoctorProvider>
            <Doctor />
          </DoctorProvider>
        ),
        children: [
          {
            path: "",
            element: <DoctorsPage />,
          },
          {
            path: "addDoctor",
            element: <AddDoctor />,
          },
          {
            path: "updateDoctor",
            element: <UpdateDoctor />,
          },
        ],
      },

      {
        path: "Admins",
        element: (
          <AdminContextProvider>
            <Admins />
          </AdminContextProvider>
        ),
      },
      {
        path: "Admins/addAdmin",
        element: <AddAdmin />,
      },
      {
        path: "Admins/editAdmin",
        element: (
          <AdminContextProvider>
            <EditAdmin />
          </AdminContextProvider>
        ),
      },
      {
        path: "Appointments",
        element: <Appointment />,
        children: [
          {
            path: "",
            element: <AppointmentPage />,
          },
          {
            path: "editAppointment",
            element: (
              <AppointmentProvider>
                <EditAppointment />
              </AppointmentProvider>
            ),
          },
        ],
      },
      {
        path: "Feedbacks",
        element: <Feedback />,
      },
      {
        path: "settings",
        element: (
          <AdminLoginProvider>
            {" "}
            <Settings />{" "}
          </AdminLoginProvider>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RoutesContextProvider>
    <RouterProvider router={router} />
    <Toaster />
    
  </RoutesContextProvider>
);
