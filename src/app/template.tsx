'use client'

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { noTempalteRoutes } from "@/utils/constants"
import Topbar from "@components/topbar/topbar";
import Disposition from "./components/disposition/disposition";
import NhisDetails from "./components/nhis details/nhisDetails";

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    const pathname = usePathname();
    const showTemplate = !noTempalteRoutes.some(route => pathname.startsWith(route))
    
    return (
        <>
            {
                showTemplate &&
                <Topbar />
            }
            {children}
        </>
    );
};

export default  Template