import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateForm from "../Dashboard Components/UpdateForm";
import { AppointmentProvider } from "@/custom/context/appointments/AppointmentContext";
import useAppointmentContext from "@/custom/pages/Hooks/useAppointmentContext";
function EditAppointment() {
  const location = useLocation();
  console.log(location.state);
  const [dataFromRoute, setData] = useState(location.state.appId);
  const navigate = useNavigate();


  return (
    <div>
      <div className="flex flex-col gap-7 p-5">
        <div className="text-mdDarkGreen dark:text-neonGreen font-semibold  flex flex-col space-y-2 ">
          <h1 className="text-3xl">Edit Appointment </h1>
          <h3 className=" font-medium ">Make modification in Appointment </h3>
        </div>
        <div className="flex ">
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col  ">
              <Button
                onClick={() => navigate(-1)}
                className=" w-fit gap-2 h-9 text-neonGreen bg-darkGreen font-medium flex items-center justify-between  "
              >
                <span>
                  <ArrowLeft size={16} />
                </span>
                Back
              </Button>
            </div>
            <div>
              <Card className="shadow-sm  ">
                <CardHeader className="items-center">
                  <CardTitle className="font-semibold   text-darkGreen text-lg">
                    Update Appointment of {dataFromRoute}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UpdateForm appointmentId={dataFromRoute} />
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default EditAppointment;
