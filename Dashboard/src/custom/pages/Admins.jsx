import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/Admin Components/ActionButton";
import useAdminContext from "./Hooks/useAdminContext";

function Admins() {
  const navigate = useNavigate();


  const {adminData} = useAdminContext()
 

  const handleAddAdmin = () => {
    // Navigate to the add admin page
    navigate("addAdmin");
  };



  return (
    <div className="flex flex-col gap-7 p-5 h-full  overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-mdDarkGreen dark:text-neonGreen">Admin List</h1>
        <Button
          onClick={handleAddAdmin}
          className="flex items-center gap-2 h-9 text-neonGreen bg-darkGreen font-medium"
        >
          <Plus size={16} />
          Add Admin
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {adminData.map((admin) => (
          <Card key={admin._id} className="shadow-sm">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="font-semibold text-darkGreen dark:text-emerald-600 text-lg">
                {admin.Name}
              </CardTitle>
              <ActionButton
                adminID={admin.Aid}
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p><span className="font-semibold">Age:</span> {admin.Age}</p>
              <p><span className="font-semibold">Phone:</span> {admin.Mono}</p>
              <p><span className="font-semibold">Email:</span> {admin.Email}</p>
              <p><span className="font-semibold">Gender:</span> {admin.Gender}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Admins;
