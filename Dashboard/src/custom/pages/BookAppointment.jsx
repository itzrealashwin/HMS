import React, { useContext, useEffect, useState } from "react";
import { BookAppointmentContext } from "../context/appointments/BookAppointmentContext";
import { PatientSignUpContext } from "../context/auth/PatientSignUpContext";
import Cookies from "js-cookie"; // Import js-cookie

const diseaseMapping = {
  "Heart issue": "Cardiologist",
  "Mental health issue": "Psychiatrist",
  Cancer: "Oncologist",
  "Children’s health": "Pediatricians",
  "Neurological issue": "Neurologist",
  "Skin issue": "Dermatologist",
  "Hormonal issue": "Endocrinologist",
  "Joint issue": "Rheumatologist",
  Other: "Other",
};

const diseaseLabels = [
  { label: "Heart issue", value: "Cardiologist" },
  { label: "Mental health issue", value: "Psychiatrist" },
  { label: "Cancer", value: "Oncologist" },
  { label: "Children’s health", value: "Pediatricians" },
  { label: "Neurological issue", value: "Neurologist" },
  { label: "Skin issue", value: "Dermatologist" },
  { label: "Hormonal issue", value: "Endocrinologist" },
  { label: "Joint issue", value: "Rheumatologist" },
  { label: "Other", value: "Other" },
];

const strengthOptions = [
  { value: "Major", label: "Major" },
  { value: "Other", label: "Other" },
];

function BookAppointment() {
  const { bookAppointment } = useContext(BookAppointmentContext);
  const { patientData } = useContext(PatientSignUpContext);

  const [formState, setFormState] = useState({
    name: "",
    age: "",
    strength: "",
    diseaseType: "",
    description: "",
    slotPreference: "Slot 1",
    appointmentDate: "",
  });

  const [errors, setErrors] = useState({}); // Error state

  // Load name from patientData or cookies when the component mounts
  useEffect(() => {
    const storedName = patientData?.Name || Cookies.get("Name");
    setFormState((prevState) => ({
      ...prevState,
      name: storedName || "",
    }));
  }, [patientData]);

  const validateForm = () => {
    const newErrors = {};
  
    // Name validation (only letters and spaces allowed)
    if (!formState.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formState.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }
  
    // Age validation (only digits allowed, between 1 and 120)
    const age = parseInt(formState.age, 10);
    if (!age || age < 1 || age > 120) {
      newErrors.age = "Please enter a valid age between 1 and 120.";
    } else if (!/^\d+$/.test(formState.age)) {
      newErrors.age = "Age can only contain digits.";
    }
  
    // Disease Type validation (only if strength is 'Major')
    if (formState.strength === "Major" && !formState.diseaseType) {
      newErrors.diseaseType = "Please select a disease type.";
    }
  
    // Date validation
    if (!formState.appointmentDate) {
      newErrors.appointmentDate = "Please select an appointment date.";
    } else {
      const today = new Date();
      const appointmentDate = new Date(formState.appointmentDate);
  
      // Prevent selecting Slot 1 for today's date if the current time is past 1 PM
      if (
        formState.slotPreference === "Slot 1" &&
        appointmentDate.toDateString() === today.toDateString() &&
        today.getHours() >= 13
      ) {
        newErrors.appointmentDate = "Slot 1 is not available after 1 PM today.";
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  
    // Validate name immediately
    if (e.target.name === "name") {
      if (!e.target.value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required." }));
      } else if (!/^[A-Za-z\s]+$/.test(e.target.value)) {
        setErrors((prevErrors) => ({ ...prevErrors, name: "Name can only contain letters and spaces." }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, name: undefined }));
      }
    }
  
    // Validate age immediately
    if (e.target.name === "age") {
      const age = parseInt(e.target.value, 10);
      if (!/^\d+$/.test(e.target.value)) {
        setErrors((prevErrors) => ({ ...prevErrors, age: "Age can only contain digits." }));
      } else if (!age || age < 1 || age > 120) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: "Please enter a valid age between 1 and 120.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, age: undefined }));
      }
    }
  
    // Validate other fields
    if (e.target.name === "appointmentDate") {
      setErrors((prevErrors) => ({ ...prevErrors, appointmentDate: undefined }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const backendValue = diseaseMapping[formState.diseaseType] || "";

    const formData = {
      Description: formState.description,
      Disease: backendValue,
      Preference: formState.slotPreference,
      Date: formState.appointmentDate,
    };

    bookAppointment(patientData.pid, formData);

    setFormState({
      name: "",
      age: "",
      strength: "",
      diseaseType: "",
      description: "",
      slotPreference: "Slot 1",
      appointmentDate: "",
    });
  };

 

  const handleStrengthChange = (newStrength) => {
    setFormState({ ...formState, strength: newStrength, diseaseType: "" });
    if (newStrength === "Other") {
      setErrors((prevErrors) => ({ ...prevErrors, diseaseType: undefined }));
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 p-4 md:p-8 lg:p-12">
      <h1 className="text-center mt-2 text-4xl sm:text-5xl font-bold font-poppins">
        Book Appointment
      </h1>
      <div className="flex justify-center flex-col items-center text-[#103126] font-semibold">
        {/* Description Card */}
        <div className="w-full max-w-4xl bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-darkGreen font-bold text-center mb-6">
            Why Book an Appointment?
          </h2>
          <p className="text-gray-600 text-center mb-6 text-sm md:text-base lg:text-lg">
            Booking an appointment allows you to consult with our specialized
            doctors at a time that suits you. Please provide the required
            details to schedule your appointment efficiently. Make sure to
            select your preferred time slot and provide any relevant information
            about your health condition to help us serve you better.
          </p>
          <p className="text-gray-600 text-center mb-6 text-sm md:text-base lg:text-lg">
            This form will guide you through the process of scheduling an
            appointment and help us gather the necessary information for a
            smooth consultation.
          </p>
        </div>

        {/* Appointment Form */}
        <div className="w-full max-w-4xl bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-darkGreen font-bold text-center mb-6">
            Schedule Your Appointment
          </h2>
          <p className="text-gray-600 text-center mb-6 text-sm md:text-base lg:text-lg">
            Please fill out this form to book an appointment with our
            specialists.
          </p>
          <form autoComplete="off" noValidate={true} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Patient Name
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  id="name"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  pattern="[a-zA-Z\s]+"
                  />
                {errors.name && (
                  <p className="text-red-500 font-normal text-xs mt-2">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.age ? "border-red-500" : ""
                  }`}
                  id="age"
                  type="number"
                  name="age"
                  value={formState.age}
                  onChange={handleChange}
                  required
                />
                {errors.age && (
                  <p className="text-red-500 font-normal text-xs mt-2">
                    {errors.age}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="strength"
                >
                  Strength
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="strength"
                  name="strength"
                  value={formState.strength}
                  onChange={(e) => handleStrengthChange(e.target.value)}
                  required
                >
                  <option value="">Select Strength</option>
                  {strengthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="diseaseType"
                >
                  Disease Type
                </label>
                <select
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.diseaseType ? "border-red-500" : ""
                  }`}
                  id="diseaseType"
                  name="diseaseType"
                  value={formState.diseaseType}
                  onChange={handleChange}
                  disabled={formState.strength === "Other"}
                  required={formState.strength === "Major"}
                >
                  <option value="">Select Disease Type</option>
                  {diseaseLabels.map((disease) => (
                    <option key={disease.value} value={disease.label}>
                      {disease.label}
                    </option>
                  ))}
                </select>
                {errors.diseaseType && (
                  <p className="text-red-500 font-normal text-xs mt-2">
                    {errors.diseaseType}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="Briefly describe your condition"
                rows="4"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="slotPreference"
                >
                  Slot Preference
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="slotPreference"
                  name="slotPreference"
                  value={formState.slotPreference}
                  onChange={handleChange}
                  required
                >
                  <option value="Slot 1">Slot 1 (10 AM - 1 PM)</option>
                  <option value="Slot 2">Slot 2 (4 PM - 8 PM)</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="appointmentDate"
                >
                  Appointment Date
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.appointmentDate ? "border-red-500" : ""
                  }`}
                  id="appointmentDate"
                  type="date"
                  name="appointmentDate"
                  value={formState.appointmentDate}
                  onChange={handleChange}
                  required
                />
                {errors.appointmentDate && (
                  <p className="text-red-500 font-normal text-xs mt-2">
                    {errors.appointmentDate}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-darkGreen hover:bg-lightGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
