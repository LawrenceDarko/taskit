import React from 'react';
import { GoTasklist } from 'react-icons/go';

interface SidebarItemProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20
                ${isActive && "text-white bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"} 
            `}
        >
            <div className="flex items-center py-4 gap-x-2">
                <GoTasklist className='text-[15px]'/>
                {label}
            </div>
            <div
                className={`ml-auto opacity-0 border-2 border-sky-700 h-full transition-all ${isActive && 'opacity-100'}`}
            />
        </button>
    );
}

export default SidebarItem;
