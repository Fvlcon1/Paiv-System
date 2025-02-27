'use client'

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { noTempalteRoutes } from "@/utils/constants"
import Topbar from "@components/topbar/topbar";

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    const pathname = usePathname();
    const showTemplate = !noTempalteRoutes.some(route => pathname.startsWith(route))
    
    return (
        <div>
            {
                showTemplate &&
                <Topbar />
            }
            {children}
        </div>
    );
};

export default  Template