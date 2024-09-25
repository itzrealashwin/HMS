import { useContext } from 'react';
import { DoctorContex } from '../../context/doctors/DoctorsContext';

const useDoctorContext = () => {
    const context = useContext(DoctorContex);
    if (context === undefined) {
        throw new Error('useAppointmentContext must be used within an AppointmentProvider');
    }

    
    return context;
};

export default useDoctorContext;
