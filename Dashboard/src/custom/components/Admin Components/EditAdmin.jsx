import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditAdminForm from "./EditAdminForm.jsx";
import useAdminContext from "@/custom/pages/Hooks/useAdminContext.jsx";

function EditAdmin() {
  const [specificAdmin, setSpecificAdmin] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const AID = location.state.AID;
  console.log(AID);
  

  const { adminData } = useAdminContext();

  useEffect(() => {
    if (adminData && adminData.length > 0) {
      const admin = adminData.find((admin) => admin.Aid === AID);
      setSpecificAdmin(admin || null); // If admin is not found, set it to null
    }
  }, [adminData, AID]);

  

  return (
    <div className="flex flex-col gap-7 p-5">
      <div className="text-mdDarkGreen font-semibold flex flex-col space-y-2">
        <h1 className="text-3xl">Update Admin</h1>
        <h3 className="font-medium">Modify the details of the admin</h3>
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
                  Update Admin: {specificAdmin?.Name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EditAdminForm specificAdmin={specificAdmin} AID={AID} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAdmin;
