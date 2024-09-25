import ThirdB from "./ThirdB";
export default function ThirdB1(){
    return(
        <div className="flex text-[#2D6A4F] font-semibold justify-center">

        <div className="w-90 flex justify-center items-center flex-col">
        <div>
        <h2 className="font-bold   my-10 text-5xl  text-center"><span className="text-[#438B7B] mx-4"> MedLife</span>Testimonials</h2>
        </div>
        <div className="w-2/3 min-w-2/3 flex justify-center  gap-8 	m-6 items-center flex-wrap ">
        <ThirdB URL="https://www.youtube.com/embed/GiEP28hJxJs?si=Xr5B-xhLMzXGz5cL"/>
        <ThirdB URL="https://www.youtube.com/embed/lMvSMpj5Ltc?si=3djcedROBkC2akZF"/>
        <ThirdB URL="https://www.youtube.com/embed/_Y6S9P6zfxo?si=ew0YcDgIaunnq1YU"/>
        </div>
    </div>
    </div>)
}