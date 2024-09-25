import axios from "axios";
import { URL } from "@base";
import { createContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";



const BookAppointmentContext = createContext();

const BookAppointmentProvider = ({ children }) => {
const {toast} = useToast()

async function bookAppointment(PID, AppData){
    console.log(PID, AppData);
    
    const response = await axios.post(`${URL}/api/patients/bookAppointment`,{PID : PID , ...AppData} ).then(()=>{
            toast({
                title: "Success",
                description : "Appointment Successfully Booked. We will notify you whenever your Appointment has been updated",
                className : "bg-white"
            })
    }).catch((err)=>{
        toast({
            title: "Failed",
            description : "Failed to Book Appointment. Please try again later",
            className : "bg-red-100"
        })
        
    })
    
    
}   
    return(
        <BookAppointmentContext.Provider value={{bookAppointment}}>
            {children}
        </BookAppointmentContext.Provider>
    )
}


export {BookAppointmentContext, BookAppointmentProvider}