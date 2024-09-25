import {Facebook , Instagram, Mail,Linkedin,Twitter} from "lucide-react";

export default function LastB(){
    return(
        <div className=" max-lg:max-w-4xl flex justify-center items-center bg-[#103126] text-[#B7E4C7] ">    
        <div className=" max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:gap-5 flex content-center justify-center items-center gap-4  ">
        <div className="w-64 py-10 " >
            <h2 className="font-bold  py-3  text-3xl">MedLife</h2>
            <p className="text-sm">MedLife is a comprehensive Saas based HMS that intelligently drives your healthcare
                seamless for providers, patients, and other stakeholders.
            </p>
            <div>
            <ul className="flex gap-5 py-5">
                <li><Facebook/></li>
                <li><Instagram/></li>
                <li><Linkedin/></li>
                <li><Twitter/></li>
                <li><Mail/></li>
            </ul>

            </div>
            <p className="flex items-center font-semibold text-2xl gap-5 "><img src="Assets/qr-code.svg" className="w-40 text-emerald-400" /> 
                SCAN TO CHAT WITH US</p>
        </div>
        <div className="w-90 mx-32 flex flex-col gap-4 ">
            <h4 className="font-semibold text-xl ">Quick Links</h4>
            <a href="/home" className="hover:text-emerald-400">Home</a>
            <a href="/home" className="hover:text-emerald-400">Login</a>
            <a href="/home" className="hover:text-emerald-400">About us</a>
            <a href="/home" className="hover:text-emerald-400">Register</a>
            <a href="/home" className="hover:text-emerald-400">Admin</a>
            <h4 className="font-semibold text-xl">Our Other Solutions</h4>
            <a href="/" className="hover:text-emerald-400">MEDLIFE AI</a>
            <a href="/" className="hover:text-emerald-400">MEDLIFE FHIR</a>
        </div>
        <div className="w-96 flex flex-col gap-4">
            <h4 className="font-semibold text-xl">Our Products</h4>
            <a href="/"className="hover:text-emerald-400">Hospital Software</a>
            <a href="/"className="hover:text-emerald-400">Clinic Software</a>
            <a href="/"className="hover:text-emerald-400">ODP Management</a>
            <a href="/"className="hover:text-emerald-400">Queue & token Management </a>
            <a href="/"className="hover:text-emerald-400">Pharmacy Management</a>
            <a href="/"className="hover:text-emerald-400">Blood Bank Management</a>
        </div>
        <div className="w-6 border-solid border-black rounded-xl	"></div>
    </div>
    </div>
)
}