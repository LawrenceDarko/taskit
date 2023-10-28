import React, { useState, createContext, useContext, useEffect } from 'react';


interface GeneralContextType {
    openTaskDetails: any, 
    setOpenTaskDetails: any
    activeCategory: any;
    setActiveCategory: any;
    taskDetails: any
    setTaskDetails: any;
    categories: string[];
    addCategory: (category: string) => void;
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

interface GeneralContextProviderProps {
    children: React.ReactNode;
}

export const GeneralContextProvider: React.FC<GeneralContextProviderProps> = ({ children }) => {
    const [openTaskDetails, setOpenTaskDetails] = useState(false) as any
    const [activeCategory, setActiveCategory] = useState('All Tasks')
    const [taskDetails, setTaskDetails] = useState('') as any
    const [categories, setCategories] = useState<string[]>([]);


    const addCategory = (category: string) => {
        setCategories([...categories, category]);
        localStorage.setItem('sidebarRoutes', JSON.stringify([...categories, category]));
    };


    

    return (
        <GeneralContext.Provider value={{
            openTaskDetails, 
            setOpenTaskDetails,
            activeCategory, 
            setActiveCategory,
            taskDetails, 
            setTaskDetails,
            categories, 
            addCategory
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
