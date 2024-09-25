import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#103126] text-[#B7E4C7] py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-6">
          <h1 className="text-3xl font-bold">MedLife</h1>
          <p className="mt-2 font-medium">
            MedLife is a Hospital Management System (HMS) that streamlines patient care through features like appointment scheduling, electronic health records, and efficient billing.
          </p>
        </div>
        <div className="w-full md:w-1/4 mb-6">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="mt-2 font-medium flex flex-col gap-3">
            <li>Home</li>
            <li>LogIn</li>
            <li>About Us</li>
            <li>Book Appointment</li>
            <li>FeedBack</li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-6">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <ul className="mt-2 flex font-medium gap-4">
            <li><Facebook /></li>
            <li><Instagram /></li>
            <li><Mail /></li>
            <li><Twitter /></li>
            <li><Linkedin /></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-6">
          <h2 className="text-xl font-semibold">Address</h2>
          <div className='font-medium'>          <p className="mt-2">
            India: 2/642, 1st Floor, Habeeba Street, East Coast Road, Neelangarai, Chennai - 600115. +91 93316-93316
          </p>
          <p>
            UK: 7 Offord Grove, Leavesden, Watford - WD25 7NF U.K. +44-1923 593492
          </p>
          <p>
            UAE: Office 604, Al Tayer Commercial Building 17 street-Al Raffa, Dubai -UAE +971 50 145 1401
          </p>
          <p>
            Ireland: +353 85 164 9796
          </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
