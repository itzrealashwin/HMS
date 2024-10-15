import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import useDoctorContext from "@/custom/pages/Hooks/useDoctorsContext";
import { useNavigate } from "react-router-dom";

function UpdateDoctorForm({ specificDoctor, DID }) {
  const { register, handleSubmit, setValue } = useForm();
  const [specialist, setSpecialist] = useState("Select Specialist");
  const [gender, setGender] = useState("Male");
  const [degrees, setDegrees] = useState([]);
  const [degreeInput, setDegreeInput] = useState("");
  console.log(degreeInput);

  const { updateDoctor } = useDoctorContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (specificDoctor) {
      setValue("name", specificDoctor.Name);
      setValue("age", specificDoctor.Age);
      setValue("mono", specificDoctor.Mono);
      setValue("email", specificDoctor.Email);
      setSpecialist(specificDoctor.Specialist || "Select Specialist");
      setGender(specificDoctor.Gender || "Male");
      setDegrees(specificDoctor.Degrees || []);
    }
  }, [specificDoctor, setValue]);

  const onSpecialistChange = (value) => {
    setSpecialist(value);
  };

  const onGenderChange = (value) => {
    setGender(value);
  };

  const handleDegreeInput = (event) => {
    setDegreeInput(event.target.value);
  };

  const handleDegreeKeyDown = (event) => {
    if (event.key === "Enter" && degreeInput.trim() !== "") {
      event.preventDefault();
      setDegrees([...degrees, degreeInput.trim()]);
      setDegreeInput("");
    }
  };

  const removeDegree = (degreeToRemove) => {
    setDegrees(degrees.filter((degree) => degree !== degreeToRemove));
  };

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      specialist, // Include selected specialist
      gender,     // Include selected gender
      degrees,    // Include entered degrees
    };
  
    updateDoctor(updatedData, DID);
    navigate(-1); // Redirect or navigate after updating
  };
  

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-2xl flex-col gap-7 items-center"
      >
        {/* Container for responsive layout */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-full sm:w-1/4"
              htmlFor="name"
            >
              Name
            </Label>
            <Input
              {...register("name")}
              id="name"
              className="w-full h-8 rounded-md"
              placeholder="Enter name"
              disabled
            />
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-full sm:w-1/4"
              htmlFor="gender"
            >
              Gender
            </Label>
            <RadioGroup
              value={gender}
              onValueChange={onGenderChange}
              className="w-full flex flex-col sm:flex-row gap-2 sm:gap-5"
              disabled
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Others" id="others" />
                <Label htmlFor="others">Others</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-full sm:w-1/4"
              htmlFor="age"
            >
              Age
            </Label>
            <Input
              {...register("age")}
              id="age"
              type="number"
              className="w-full h-8 rounded-md"
              placeholder="Enter age"
            />
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-full sm:w-1/4"
              htmlFor="mono"
            >
              Mono
            </Label>
            <Input
              {...register("mono")}
              id="mono"
              className="w-full h-8 rounded-md"
              placeholder="Enter mono"
            />
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-full sm:w-1/4"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              className="w-full h-8 rounded-md"
              placeholder="Enter email"
            />
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-full sm:w-1/4"
              htmlFor="specialist"
            >
              Specialist
            </Label>
            <Select
              value={specialist}
              onValueChange={onSpecialistChange}
              className="w-full"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Specialist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gastroenterologist">
                  Gastroenterologist
                </SelectItem>
                <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                <SelectItem value="Oncologist">Oncologist</SelectItem>
                <SelectItem value="Pediatricians">Pediatricians</SelectItem>
                <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                <SelectItem value="Neurologist">Neurologist</SelectItem>
                <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                <SelectItem value="Endocrinologist">Endocrinologist</SelectItem>
                <SelectItem value="Rheumatologist">Rheumatologist</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-5">
            <Label
              className="font-semibold text-base text-darkGreen w-full sm:w-1/4 mb-2"
              htmlFor="degrees"
            >
              Degrees
            </Label>
            <div className="flex flex-col w-full">
              <Input
                id="degrees"
                value={degreeInput}
                onChange={handleDegreeInput}
                onKeyDown={handleDegreeKeyDown}
                className="h-8 rounded-md mb-2"
                placeholder="Enter degrees and press Enter"
              />
              <div className="flex flex-wrap gap-2">
                {degrees.map((degree, index) => (
                  <div
                    key={index}
                    className="bg-lightGreen border-zinc-300 border text-darkGreen px-3 py-1 rounded-md flex items-center"
                  >
                    {degree}
                    <button
                      type="button"
                      className="ml-2 text-slate-600"
                      onClick={() => removeDegree(degree)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Button className="bg-darkGreen mt-5" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdateDoctorForm;
