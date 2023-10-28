import React, { useState, createContext, useContext, useEffect } from 'react';


interface GeneralContextType {
    openTaskDetails: any, 
    setOpenTaskDetails: any
    activeCategory: any;
    setActiveCategory: any;
    taskDetails: any
    setTaskDetails: any;
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

interface GeneralContextProviderProps {
    children: React.ReactNode;
}

export const GeneralContextProvider: React.FC<GeneralContextProviderProps> = ({ children }) => {
    const [openTaskDetails, setOpenTaskDetails] = useState(false) as any
    const [activeCategory, setActiveCategory] = useState(null)
    const [taskDetails, setTaskDetails] = useState('') as any


    

    return (
        <GeneralContext.Provider value={{
            openTaskDetails, 
            setOpenTaskDetails,
            activeCategory, 
            setActiveCategory,
            taskDetails, 
            setTaskDetails
        }}>
        {children}
        </GeneralContext.Provider>
    );
    }

    export const useGeneralContext = (): GeneralContextType => {
    const context = useContext(GeneralContext);
    
    if (!context) {
        throw new Error('useGeneralContext must be used within a GeneralContextProvider');
    }
    
    return context;
};
