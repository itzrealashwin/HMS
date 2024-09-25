import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AddDoctorForm from "../components/Doctor Components/AddDoctorForm";
function AddDoctor() {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex flex-col gap-7 p-5">
        <div className="text-mdDarkGreen font-semibold flex flex-col space-y-2">
          <h1 className="text-3xl">Add Doctor</h1>
          <h3 className="font-medium">Enter details to add a new doctor</h3>
        </div>
        <div className="flex">
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col">
              <Button
                className="w-fit gap-2 h-9 text-neonGreen bg-darkGreen font-medium flex items-center justify-between"
                onClick={() => navigate(-1)}
              >
                <span>
                  <ArrowLeft size={16} />
                </span>
                Back
              </Button>
            </div>
            <div>
              <Card className="shadow-sm">
                <CardHeader className="items-center">
                  <CardTitle className="font-semibold text-darkGreen text-lg">
                    Add New Doctor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AddDoctorForm /> {/* Render the AddDoctorForm component */}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-[24rem]"></div>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
