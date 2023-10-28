import SidebarMain from "./sidebar"

import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { HiMenuAlt2 } from 'react-icons/hi';
import Logo from "./logo";

export default function TemplateDemo() {
    const [visible, setVisible] = useState<boolean>(false);


    return (
        <div className="flex card justify-content-center">
            <HiMenuAlt2 onClick={()=> setVisible(true)} className="text-2xl text-white md:hidden"/>
            <Sidebar visible={visible} onHide={() => setVisible(false)} className="pt-3 text-white">
                <SidebarMain />
            </Sidebar>
            <Button icon="pi pi-plus" className="text-white" onClick={() => setVisible(true)} />
        </div>
    )
}
        