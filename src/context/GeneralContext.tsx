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

    useEffect(() => {
        // Check if the component mounts for the first time
        if (categories.length === 0) {
            const storedCategories = localStorage.getItem('sidebarRoutes');
            if (!storedCategories) {
                // 'sidebarRoutes' is empty, add 'All Tasks' category
                addCategory('All Tasks');
            } else {
                // 'sidebarRoutes' is not empty, parse and set the stored categories
                setCategories(JSON.parse(storedCategories));
            }
        }
      }, []); // The empty dependency array ensures this runs only on component mount


    

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
