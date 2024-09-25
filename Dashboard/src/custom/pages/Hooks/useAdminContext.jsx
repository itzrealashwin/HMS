import { useContext } from 'react';
import { AdminContext } from '../../context/admins/AdminDataContext';

const useAdminContext = () => {
    const context = useContext(AdminContext);
    
    if (context === undefined) {
        throw new Error('useAdminContext must be used within an AdminContextProvider');
    }

    
    return context;
};

export default useAdminContext;
