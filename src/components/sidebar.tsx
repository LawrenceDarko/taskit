'use client'

import React, { useState, useEffect } from "react";
import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import { useGeneralContext } from "../context/GeneralContext";

const Sidebar: React.FC = () => {
    const { addCategory } = useGeneralContext()
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState("");


    const handleAddCategory = () => {
        setShowCategoryInput(true);
    };

    const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(e.target.value);
    };

    const handleSaveCategory = () => {
        if (newCategory.trim() !== '') {
            addCategory(newCategory);
            setNewCategory('');
            setShowCategoryInput(false);
        }
    };

    return (
        <div className="relative flex flex-col h-full overflow-y-auto bg-[#22262F] shadow-sm">
            <div className="p-6">
                {/* <Logo /> */}
                <p className="text-xl font-bold tracking-widest text-white f">TASKIT</p>
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
            {showCategoryInput ? (
                <div className="absolute text-white bottom-5 left-3">
                    <input
                        type="text"
                        placeholder="Enter category name"
                        className="w-[90%] outline-none p-2 bg-[#333945]"
                        value={newCategory}
                        onChange={handleCategoryInputChange}
                    />
                    <button onClick={handleSaveCategory}>Save</button>
                </div>
            ) : (
                <div
                    className="absolute text-sm text-white cursor-pointer bottom-5 left-3"
                    onClick={handleAddCategory}
                >
                    + Add Category
                </div>
            )}
        </div>
    );
};

export default Sidebar;
