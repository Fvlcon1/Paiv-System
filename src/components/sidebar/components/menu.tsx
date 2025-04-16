import Divider from "@components/divider/divider"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconType } from "react-icons"
import { FaFlag, FaUsers } from "react-icons/fa"
import { FaCediSign, FaCircleCheck, FaGear } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"
import { GoFileSubmodule } from "react-icons/go"
import { HiDocumentReport } from "react-icons/hi"
import { PiFilesFill } from "react-icons/pi"
import { RiHome6Fill } from "react-icons/ri"
import RenderMenuSection from "./renderMenuSection"


const Menu = () => {
    const mainMenu = [
        {
            title : "Home",
            icon : RiHome6Fill,
            path : "/",
        },
        {
            title : "Claims",
            icon : PiFilesFill,
            path : '/claims',
        },
        {
            title : "Encounters",
            icon : FaUsers,
            path : '/encounters',
        },
        {
            title : "Imported Claims",
            icon : GoFileSubmodule,
            path : '/importedencounters',
        },
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
        <div className="flex gap-1 flex-col pt-1">
            <div className="flex flex-col">

                {/* Main */}
                <RenderMenuSection 
                    title="Main"
                    menuItems={mainMenu}
                />

                <Divider />

                {/* Other */}
                <RenderMenuSection 
                    title="Other"
                    menuItems={otherMenu}
                />

                <Divider />
            </div>
        </div>
    )
}
export default Menu