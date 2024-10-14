import React, { useState } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { URL } from '@base';
import { toast } from '@/components/ui/use-toast';

const diseaseTypes = [
  { value: 'Gastroenterologist', label: 'Gastroenterologist' },
  { value: 'Psychiatrist', label: 'Psychiatrist' },
  { value: 'Oncologist', label: 'Oncologist' },
  { value: 'Pediatricians', label: 'Pediatricians' },
  { value: 'Cardiologist', label: 'Cardiologist' },
  { value: 'Neurologist', label: 'Neurologist' },
  { value: 'Dermatologist', label: 'Dermatologist' },
  { value: 'Endocrinologist', label: 'Endocrinologist' },
  { value: 'Rheumatologist', label: 'Rheumatologist' },
  { value: 'Other', label: 'Other' },
];

function FeedbackFormPage() {
  const [formState, setFormState] = useState({
    Name: '',
    Email: '',
    DiseaseType: '',
    Rating: 0,
    ShortDescription: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);

    try {
      await axios.post(`${URL}/api/patients/feedback`, formState);
      toast({
        title: "Thank You for your feedback",
        description: "Your feedback has been submitted successfully.",
      });

      // Reset form state after submission
      setFormState({
        Name: '',
        Email: '',
        DiseaseType: '',
        Rating: 0,
        ShortDescription: '',
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your feedback.",
      });
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setFormState({ ...formState, Rating: newRating });
  };

  return (
    <>
      <div className='flex flex-col gap-8 md:gap-12 lg:gap-16 p-4 md:p-8 lg:p-12'>
        <h1 className="text-center mt-2 text-4xl sm:text-5xl font-bold font-poppins">
          Feedback
        </h1>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="w-full lg:w-8/12 flex flex-col gap-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
              Delivering Excellence in Patient Care
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold">And Appointments</span>
            </h1>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
              We take pride in delivering exceptional patient care that combines
              medical expertise, advanced technology, and heartfelt compassion.
              Our dedicated healthcare professionals are committed to providing
              you with the highest quality of care in a welcoming and supportive
              setting.
            </p>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
              To make your healthcare journey even more convenient, our
              user-friendly online appointment system allows you to effortlessly
              schedule consultations. With a few simple steps, you can book
              appointments with our specialized doctors, minimizing wait times and
              ensuring you receive prompt medical attention. Trust MedLife for
              top-notch healthcare and an efficient appointment system designed
              with your needs in mind.
            </p>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
              MedLife is dedicated to continuously improving its services, and your
              feedback plays a crucial role in this process. By sharing your experiences 
              and suggestions, you help us identify areas where we can enhance our care, 
              making it even more responsive to your needs. We value your input and use it to 
              guide our efforts in providing the best possible healthcare experience.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center text-[#103126] font-semibold">
          <div className="w-full max-w-4xl bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-darkGreen font-bold text-center mb-6">
              Share Your Feedback to Help Us Improve
            </h2>
            <p className="text-gray-600 text-center mb-6 text-sm md:text-base lg:text-lg">
              We value your feedback! Please fill out this form to help us improve our services and better meet your needs.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
                    Name
                  </label>
                  <input
                    className="shadow text-sm font-normal  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Name"
                    type="text"
                    name="Name"
                    value={formState.Name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                    Email
                  </label>
                  <input
                    className="shadow text-sm font-normal  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Email"
                    type="email"
                    name="Email"
                    value={formState.Email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DiseaseType">
                  Disease Type
                </label>
                <select
                  className="shadow text-sm font-normal  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="DiseaseType"
                  name="DiseaseType"
                  value={formState.DiseaseType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Disease Type</option>
                  {diseaseTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating (1-5)
                </label>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <Star
                        key={ratingValue}
                        size={24}
                        className={`cursor-pointer ${
                          ratingValue <= formState.Rating
                            ? 'text-orange-500 fill-current'
                            : 'text-gray-300'
                        }`}
                        onClick={() => handleRatingChange(ratingValue)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ShortDescription">
                  Short Description
                </label>
                <textarea
                  className="shadow text-sm font-normal  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="ShortDescription"
                  name="ShortDescription"
                  value={formState.ShortDescription}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-[#103126] rounded-md hover:bg-[#103136] text-[#B7E4C7] font-bold py-2 px-6  focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackFormPage;
