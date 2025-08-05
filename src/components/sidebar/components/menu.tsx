import Divider from "@components/divider/divider"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconType } from "react-icons"
import { FaFlag, FaUsers } from "react-icons/fa"
import { FaAddressCard, FaCediSign, FaCircleCheck, FaFolderClosed, FaGear } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"
import { GoFileSubmodule } from "react-icons/go"
import { HiDocumentReport } from "react-icons/hi"
import { PiFilesFill } from "react-icons/pi"
import { RiDashboardFill, RiHome6Fill } from "react-icons/ri"
import RenderMenuSection from "./renderMenuSection"
import { IoIosBug } from "react-icons/io"
import { HiMiniWrenchScrewdriver } from "react-icons/hi2"
import { BsClipboardCheckFill } from "react-icons/bs"
import { MdDashboard, MdSpaceDashboard } from "react-icons/md"


const Menu = () => {
    const mainMenu = [
        // {
        //     title : "Home",
        //     icon : RiHome6Fill,
        //     path : "/",
        // },
        {
            title : "Dashboard",
            icon : RiDashboardFill,
            path : "/dashboard",
        },
        {
            title : "Patient Verification",
            icon : FaAddressCard,
            path : "/patient-verification",
        },
        {
            title : "Encounters",
            icon : FaUsers,
            path : "/encounters",
        },
        {
            title : "Claims",
            icon : FaFolderClosed,
            path : "/claims",
        },
        {
            title : "Issues",
            icon : HiMiniWrenchScrewdriver,
            path : "/issues",
        },
        {
            title : "Claim Support",
            icon : BsClipboardCheckFill,
            path : '/claim-support',
        },
        // {
        //     title : "Claims",
        //     icon : PiFilesFill,
        //     path : '/claims',
        // },
        
        // {
        //     title : "Imported Claims",
        //     icon : GoFileSubmodule,
        //     path : '/importedencounters',
        // },
    ]

    const otherMenu = [
        {
            title : "Reports",
            icon : HiDocumentReport,
            path : "/reports",
        },
        {
            title : "Settings",
            icon : FaGear,
            path : '/settings',
        },
    ]

    return (
        <div className="flex gap-1 flex-col">
            <div className="flex flex-col">

                {/* Main */}
                <RenderMenuSection 
                    title="Main"
                    menuItems={mainMenu}
                />

                {/* <Divider /> */}

                {/* Other */}
                {/* <RenderMenuSection 
                    title="Other"
                    menuItems={otherMenu}
                /> */}

                {/* <Divider /> */}
            </div>
        </div>
    )
}
export default Menu