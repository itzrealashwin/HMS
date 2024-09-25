import React from 'react';
import Hero1 from '../../../../assets/hero1.png';
import Hero2 from '../../../../assets/hero2.png';
import { Button } from '@/components/ui/button';
import { ArrowRightCircle, User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Hero() {
 const navigate =  useNavigate()
  return (
    
    <section className="bg-white py-16 px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Finest Patient Care</h1>
          <p className='text-justify'>
            We take pride in delivering exceptional patient care that combines
            medical expertise, advanced technology, and heartfelt compassion.
            Our dedicated healthcare professionals are committed to providing
            you with the highest quality of care in a welcoming and supportive
            setting.
          </p>
          <p className='text-justify'>
            To make your healthcare journey even more convenient, our
            user-friendly online appointment system allows you to effortlessly
            schedule consultations. With a few simple steps, you can book
            appointments with our specialized doctors, minimizing wait times and
            ensuring you receive prompt medical attention. Trust MedLife for
            top-notch healthcare and an efficient appointment system designed
            with your needs in mind.
          </p>
          <Button onClick={()=>navigate("/bookAppointment")} className="bg-[#103126] text-[#B7E4C7] md:w-1/3 flex gap-2 hover:bg-[#103130]">Book Appointment <span><ArrowRightCircle/></span></Button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src={Hero1} alt="Hero" className="w-full h-auto rounded-lg" />
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4 py-16">
        <div className="md:w-1/2 flex justify-center">
          <img src={Hero2} alt="Hero" className="w-full h-auto rounded-lg" />
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Exceptional Healthcare</h1>
          <p className='text-justify'>
            Experience exceptional healthcare provided by top doctors, combining
            medical excellence, state-of-the-art technology, and genuine
            compassion. Our dedicated healthcare professionals are committed to
            ensuring you receive the highest standard of care in a comfortable
            and supportive environment.
          </p>
          <p className='text-justify'>
            To enhance your healthcare experience, our efficient online
            appointment system allows you to easily schedule consultations. With
            just a few clicks, you can book appointments with our specialized
            doctors, reducing wait times and ensuring timely access to the
            medical attention you need. Rely on MedLife for exceptional
            healthcare and a seamless appointment system tailored to your needs.
          </p>
        <Button onClick={()=>navigate("/aboutUs")} className="bg-[#103126] text-[#B7E4C7] flex gap-2 hover:bg-[#103130] md:w-1/3">About Us <span><User2/></span></Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
