'use client'

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { noTempalteRoutes } from "@/utils/constants"
import Topbar from "@components/topbar/topbar";
import Disposition from "./components/disposition/disposition";
import NhisDetails from "./components/nhis details/nhisDetails";
import Sidebar from "@components/sidebar/sidebar";

const MainTemplate = ({
    children
} : {
    children ? : ReactNode
}) => {
    const pathname = usePathname();
    const showTemplate = !noTempalteRoutes.some(route => pathname.startsWith(route))
    
    return (
        <>
            <Sidebar />
            {
                showTemplate &&
                <>
                    <Topbar />
                </>
            }
            <div className="w-full h-full pl-[250px] pt-[60px] relative">
                {children}
            </div>
        </>
    );
};

export default  MainTemplate