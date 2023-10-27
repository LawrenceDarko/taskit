// import NavbarRoutes from "@/components/navbar-routes"
import MobileSidebar from "./mobile-sidebar"

export const Navbar = () => {
    return (
        <div className="flex items-center h-full p-4 bg-[#22262F] shadow-sm">
            <MobileSidebar />
        </div>
    )
}