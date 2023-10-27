import SidebarMain from "./sidebar"

import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { HiMenuAlt2 } from 'react-icons/hi';
import Logo from "./logo";

export default function TemplateDemo() {
    const [visible, setVisible] = useState<boolean>(false);

    const customIcons = (
        <React.Fragment>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-print" />
            </button>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-search" />
            </button>
        </React.Fragment>
    );

    const customHeader = (
        <div className="pt-5">
            <Logo />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <HiMenuAlt2 onClick={()=> setVisible(true)} className="text-white text-2xl md:hidden"/>
            <Sidebar visible={visible} onHide={() => setVisible(false)} className="text-white pt-3">
                <SidebarMain />
            </Sidebar>
            <Button icon="pi pi-plus" className="text-white" onClick={() => setVisible(true)} />
        </div>
    )
}
        