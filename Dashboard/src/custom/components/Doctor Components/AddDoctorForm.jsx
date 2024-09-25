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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import useDoctorContext from "@/custom/pages/Hooks/useDoctorsContext";
import { useNavigate } from "react-router-dom";

function AddDoctorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [specialist, setSpecialist] = useState("Select Specialist");
  const [gender, setGender] = useState("Male");
  const [degrees, setDegrees] = useState([]);
  const [degreeInput, setDegreeInput] = useState("");
  const { addDoctor } = useDoctorContext();
const navigate = useNavigate()
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

  const toSentenceCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (match) => match.toUpperCase());
  };

  const onSubmit = (data) => {
    const formattedData = Object.keys(data).reduce((acc, key) => {
      acc[toSentenceCase(key)] = data[key];
      return acc;
    }, {});

    formattedData.Mono = Number(formattedData.Mono);
    formattedData.Age = Number(formattedData.Age);

    addDoctor({
      ...formattedData,
      Specialist: specialist,
      Gender: gender,
      Degrees: degrees,
      
    });
    navigate(-1);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-2xl flex-col gap-7 items-center"
      >
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="flex items-center gap-7">
            <Label className="font-semibold text-base text-darkGreen w-1/4" htmlFor="name">
              Name
            </Label>
            <div className="flex flex-col gap-1 w-full">
              {errors.name && <span className="text-red-700 text-xs ">{errors.name.message}</span>}
              <Input
                {...register("name", { required: "Name is required" })}
                id="name"
                className="w-full h-8 rounded-md"
                placeholder="Enter name"
              />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <Label className="font-semibold text-base text-darkGreen w-1/4" htmlFor="gender">
              Gender
            </Label>
            <div className="flex flex-col gap-1  w-full">
              {errors.gender && <span className="text-red-700 text-xs ">{errors.gender.message}</span>}
              <RadioGroup
                defaultValue="Male"
                onValueChange={onGenderChange}
                className="w-full flex items-center space-x-5"
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
          </div>

          <div className="flex items-center gap-7">
            <Label className="font-semibold text-base text-darkGreen w-1/4" htmlFor="age">
              Age
            </Label>
            <div className="flex flex-col  gap-1  w-full">
              {errors.age && <span className="text-red-700 text-xs ">{errors.age.message}</span>}
              <Input
                {...register("age", {
                  required: "Age is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Age must be a positive number",
                })}
                id="age"
                type="number"
                className="w-full h-8 rounded-md"
                placeholder="Enter age"
              />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <Label className="font-semibold text-base text-darkGreen w-1/4" htmlFor="mono">
              Mono
            </Label>
            <div className="flex flex-col gap-1  w-full">
              {errors.mono && <span className="text-red-700 text-xs ">{errors.mono.message}</span>}
              <Input
                {...register("mono", {
                  required: "Mobile number is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    String(value).length === 10 || "Mobile number must be 10 digits",
                })}
                id="mono"
                type="number"
                className="w-full h-8 rounded-md"
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <Label className="font-semibold text-base text-darkGreen w-1/4" htmlFor="email">
              Email
            </Label>
            <div className="flex flex-col gap-1  w-full">
              {errors.email && <span className="text-red-700 text-xs ">{errors.email.message}</span>}
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                className="w-full h-8 rounded-md"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="flex items-center   gap-7">
            <Label className="font-semibold text-base text-darkGreen w-1/4" htmlFor="specialist">
              Specialist
            </Label>
            <div className="flex flex-col w-full">
              {errors.specialist && <span className="text-red-700 text-xs ">{errors.specialist.message}</span>}
              <Select onValueChange={onSpecialistChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Specialist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gastroenterologist">Gastroenterologist</SelectItem>
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
          </div>

          <div className="flex flex-row gap-5">
            <Label className="font-semibold text-base text-darkGreen w-1/4 mb-2" htmlFor="degrees">
              Degrees
            </Label>
            <div className="flex flex-col gap-1  w-full">
              {errors.degrees && <span className="text-red-700 text-xs ">{errors.degrees.message}</span>}
              <Input
                id="degrees"
                value={degreeInput}
                onChange={handleDegreeInput}
                onKeyDown={handleDegreeKeyDown}
                className="h-8 rounded-md mb-2 w-full max-w-xs"
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
                      className="ml-2 focus:outline-none"
                      onClick={() => removeDegree(degree)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="bg-green-800 text-white hover:bg-green-900">
          Add Doctor
        </Button>
      </form>
    </div>
  );
}

export default AddDoctorForm;
