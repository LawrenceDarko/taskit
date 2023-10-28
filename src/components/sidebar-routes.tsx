import { useGeneralContext } from "../context/GeneralContext";
import SidebarItem from "./sidebar-item";
import { useState } from "react";

export const SidebarRoutes = () => {
    const { setActiveCategory } = useGeneralContext()
    const [activeItem, setActiveItem] = useState<string | null>('All Tasks');

    // Read the routes from local storage or use an empty array if none are available
    const storedRoutes = localStorage.getItem('sidebarRoutes');
    const routes = storedRoutes ? JSON.parse(storedRoutes) : [];

    const handleItemClick = (label: string) => {
        if (label === activeItem) {
            // If the clicked category is already active, do nothing.
            return;
        }
        setActiveItem(label);
        setActiveCategory(label);
    };


    return (
        <div className="flex flex-col w-full">
            {routes.map((route: string, index: number) => (
                <SidebarItem
                    key={index}
                    label={route} // Provide a default label if missing
                    isActive={route === activeItem}
                    onClick={() => handleItemClick(route)}
                />
            ))}
        </div>
    );
};
