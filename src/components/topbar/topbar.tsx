import ClickableTab from "@components/clickable/clickabletab"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { FaPowerOff, FaUserCircle } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import Menu from "../dropdown/dropdown"
import Link from "next/link"
import { DropdownItem } from "@/utils/@types"
import { IoMdSettings } from "react-icons/io"
import { TbLogout2 } from "react-icons/tb"
import Pressable from "@components/button/pressable"

const Topbar = () => {
    const navTabs = [
        {
            name : "Add Questions",
            active : true
        },
        {
            name : "Curate Questions",
            active : false
        }
    ]
    const menuItems: DropdownItem[] = [
        { key: "1", label: "Pages", type : 'title', disabled: true },
        { key: "2", type : 'link', href : "/", label: "Search" },
        { key: "3", type : 'link', href : "/claims", label: "Claims" },
        { type: "divider", key: "divider-2" },
        { key: "4", label: "Settings", icon: <IoMdSettings size={15} className="ml-[-1.5px]" color={theme.colors.text.secondary} /> },
        { key: "5", label: "Logout", type : 'link', href : "/auth/login",  icon: <FaPowerOff size={12} color={theme.colors.text.secondary} /> },
    ];

    return (
        <div className="w-full h-[60px] flex justify-center fixed top-0 left-0">
            <div className="max-w-[1024px] w-full h-full flex items-center justify-between">
                <Link className="flex items-center gap-1" href={'/'}>
                    <Image 
                        src={"/assets/prod/logo.png"}
                        alt="Fvlcon logo"
                        width={25}
                        height={25}
                    />
                    <Text
                        bold={TypographyBold.md}
                    >
                        PAIV System
                    </Text>
                </Link>
                <div className="flex items-center gap-2">
                    <Pressable scaleFactor={1.015}>
                        <div className="flex px-2 py-[6px] border-[1px] border-solid border-border-tetiary rounded-full bg-bg-tetiary cursor-pointer hover:bg-bg-quantinary duration-200 h-fit items-center gap-1">
                            <FaUserCircle 
                                color={theme.colors.text.primary}
                            />
                            <Text 
                                textColor={theme.colors.text.primary}
                            >
                                Prince Nedjoh
                            </Text>
                        </div>
                    </Pressable>
                    <Menu
                        menuItems={menuItems}
                    >
                        <ClickableTab>
                            <FiMenu color={theme.colors.text.secondary} />
                        </ClickableTab>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Topbar