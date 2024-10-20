import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, useToast } from "@/components/ui/use-toast";
import useAppointmentContext from "@/custom/pages/Hooks/useAppointmentContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UpdateForm({ appointmentId }) {
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState("Waiting");
  const [timeSlot, setTimeSlot] = useState("Select Time Slot");
  const [doctorId, setDoctorId] = useState(""); // Add doctorId state
  const { updateAppointments, appointments } = useAppointmentContext();
  const { toast } = useToast();
const navigate = useNavigate()
  // Initialize the state with the appointment data if available
  useEffect(() => {
    const app = appointments.find((data) => data.AID === appointmentId);

    if (app) {
      setStatus(app.Status || "Waiting");
      setDoctorId(app.DoctID || "");
      setTimeSlot(app.TimeSlot || "");
    }
  }, [appointments, appointmentId]);

  const onStatusChange = (value) => {
    setStatus(value);
    console.log(value); // Log the new status value
  };

  const onTimeSlotChange = (value) => {
    setTimeSlot(value);
    console.log(value); // Log the new time slot value
  };

  const onDoctorIdChange = (event) => {
    setDoctorId(event.target.value); // Update doctorId state with input value
    console.log(event.target.value); // Log the new doctor ID value
  };

  const onSubmit = () => {
    const data = { status, timeSlot, doctorId };
    const InitialData = appointments.find((data) => data.AID === appointmentId);
    console.log(InitialData);
  
    // Convert Doctor ID to string for proper comparison
    if (
      InitialData &&
      InitialData.Status === status &&
      InitialData.TimeSlot === timeSlot &&
      String(InitialData.DoctID) === String(doctorId)
    ) {
      toast({
        title: "No Changes Detected",
        description: "No changes have been made to update.",
      });
      return;
    }
  
    // Validation checks
    if (
      (status !== "Waiting" && !doctorId) ||
      (status === "Waiting" && doctorId)
    ) {
      const errorMessage =
        status !== "Waiting" && !doctorId
          ? "Doctor ID is required when status is not Waiting."
          : "Status cannot be Waiting if Doctor ID is assigned.";
  
      toast({
        title: "Validation Error",
        description: errorMessage,
      });
      return;
    }
  
    // Proceed with update if validation passes
    updateAppointments({ appointmentId, formData: data });
  };
  
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-7 dark:text-neonGreen items-center"
      >
        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold w-1/4 text-base text-darkGreen dark:text-neonGreen"
              htmlFor="status"
            >
              Status
            </Label>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className="w-3/4">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Waiting">Waiting</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirm">Confirm</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold w-1/4 text-base text-darkGreen dark:text-neonGreen"
              htmlFor="timeSlot"
            >
              Slot
            </Label>
            <Select value={timeSlot} onValueChange={onTimeSlotChange}>
              <SelectTrigger className="w-3/4">
                <SelectValue placeholder="Select Time Slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slot1">Slot 1</SelectItem>
                <SelectItem value="slot2">Slot 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold w-1/4 text-base text-darkGreen dark:text-neonGreen "
              htmlFor="doctorId"
            >
              Doctor Id
            </Label>
            <Input
              {...register("doctorId")}
              id="doctorId"
              value={doctorId} // Bind the input value to the state
              onChange={onDoctorIdChange} // Handle input changes
              className="w-3/4 h-8 rounded-md dark:bg-transparent dark:border-slate-800"
              placeholder="Eg. 101"
            />
          </div>
        </div>

        <Button className="bg-darkGreen" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdateForm;
