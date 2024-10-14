import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useAdminContext from "@/custom/pages/Hooks/useAdminContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Import icons

function AddAdminForm() {
  const { register, handleSubmit } = useForm();
  const [gender, setGender] = useState("Male");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const onGenderChange = (value) => {
    setGender(value);
  };

  const { addAdmin } = useAdminContext();

  const onSubmit = (data) => {
    // Ensure age and mono are converted to numbers before submitting
    addAdmin({ 
      ...data, 
      age: Number(data.age), 
      mono: Number(data.mono), 
      gender 
    });
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-2xl flex-col gap-7 items-center"
      >
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-1/4"
              htmlFor="name"
            >
              Name
            </Label>
            <Input
              {...register("name")}
              id="name"
              className="w-full h-8 rounded-md"
              placeholder="Enter name"
            />
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-1/4"
              htmlFor="gender"
            >
              Gender
            </Label>
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
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-1/4"
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
              className="font-semibold text-base text-darkGreen w-1/4"
              htmlFor="mono"
            >
              Mono
            </Label>
            <Input
              {...register("mono")}
              id="mono"
              type="number"
              className="w-full h-8 rounded-md"
              placeholder="Enter mono"
            />
          </div>
          <div className="flex items-center gap-7">
            <Label
              className="font-semibold text-base text-darkGreen w-1/4"
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
          <div className="flex items-center gap-7 relative">
            <Label
              className="font-semibold text-base text-darkGreen w-1/4"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              className="w-full h-8 rounded-md"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button className="bg-darkGreen" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddAdminForm;
