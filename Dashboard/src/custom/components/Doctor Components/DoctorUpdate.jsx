import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import UpdateDoctorForm from "./UpdateDoctorForm";
import useDoctorContext from "@/custom/pages/Hooks/useDoctorsContext";

function UpdateDoctor() {
  const [specificDoctor, SetSpecificDoctor] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const DID = location.state.DID;

  const { doctorData } = useDoctorContext();

  useEffect(() => {
    if (doctorData && doctorData.length > 0) {
      const doctor = doctorData.find((doctor) => doctor.DID === DID);
      
      SetSpecificDoctor(doctor || null); // If doctor is not found, set it to null
    }
  }, [doctorData, DID]);
  return (
    <div className="flex flex-col gap-7 p-5">
      <div className="text-mdDarkGreen font-semibold flex flex-col space-y-2">
        <h1 className="text-3xl">Update Doctor</h1>
        <h3 className="font-medium">Modify the details of the doctor</h3>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col">
            <Button
              onClick={() => navigate(-1)}
              className="w-fit gap-2 h-9 text-neonGreen bg-darkGreen font-medium flex items-center justify-between"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          </div>
          <div>
            <Card className="shadow-sm">
              <CardHeader className="items-center">
                <CardTitle className="font-semibold text-darkGreen text-lg">
                  Update Doctor: {specificDoctor?.Name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UpdateDoctorForm specificDoctor={specificDoctor} DID={DID} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDoctor;
