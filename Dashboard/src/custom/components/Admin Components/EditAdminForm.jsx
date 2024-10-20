import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useAdminContext from "@/custom/pages/Hooks/useAdminContext";

function UpdateAdminForm({ specificAdmin, AID }) {
  const { register, handleSubmit, setValue } = useForm();
  const [gender, setGender] = useState("Male");


  
  const { updateAdmin } = useAdminContext();

  useEffect(() => {
    if (specificAdmin) {
      setValue("name", specificAdmin.Name);
      setValue("age", specificAdmin.Age);
      setValue("mono", specificAdmin.Mono);
      setValue("email", specificAdmin.Email);
      setGender(specificAdmin.Gender || "Male");
    }
  }, [specificAdmin, setValue]);

  const onGenderChange = (value) => {
    setGender(value);
  };

  const onSubmit = (data) => {
    updateAdmin({ ...data, gender }, AID);

    
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
        </div>

        <Button className="bg-darkGreen mt-5" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdateAdminForm;
