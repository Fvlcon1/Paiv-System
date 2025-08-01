import { useState, useEffect } from "react"
import ClickableTab from "@components/clickable/clickabletab"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaBell, FaChevronDown, FaPowerOff } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import Menu from "../dropdown/dropdown"
import { DropdownItem } from "@/utils/@types"
import { IoMdSettings } from "react-icons/io"
import Pressable from "@components/button/pressable"
import { useAuth } from "@/app/context/authContext"
import { MdLocalHospital } from "react-icons/md"
import Input from "@components/input/input"
import { FaMagnifyingGlass } from "react-icons/fa6"
import useProfile from "@/app/hooks/useProfile"

const Topbar = () => {
    const [searchValue, setSearchValue] = useState("")
    const { userDetails, logout } = useAuth()
    const { isUserProfileLoading } = useProfile()

    const menuItems: DropdownItem[] = [
        { key: "1", label: "Pages", type: 'title', disabled: true },
        { key: "2", type: 'link', href: "/", label: "Search" },
        { key: "3", type: 'link', href: "/claims", label: "Claims" },
        { key: "4", type: 'link', href: "/encounters", label: "Encounters" },
        { type: "divider", key: "divider-2" },
        { key: "below-1", label: "Settings", icon: <IoMdSettings size={15} className="ml-[-1.5px]" color={theme.colors.text.secondary} /> },
        { key: "below-2", label: "Logout", onClick: () => logout(false), icon: <FaPowerOff size={12} color={theme.colors.text.secondary} /> },
    ]

    const Profile = () => {
        return (
            <div className="flex gap-2 items-center">
                {
                    isUserProfileLoading ?
                        <div className="normal-loader !w-[18px]"></div>
                        :
                        userDetails?.hospitalName &&
                        <Pressable scaleFactor={1.015}>
                            <div className="flex px-2 py-[6px] pr-[10px] border-[1px] border-solid border-border-primary rounded-xl bg-bg-tetiary cursor-pointer hover:bg-bg-quantinary duration-200 h-fit items-center gap-1">
                                <MdLocalHospital color={theme.colors.text.secondary} />
                                <Text>
                                    {userDetails?.hospitalName}
                                </Text>
                            </div>
                        </Pressable>
                }
                {
                    userDetails?.email &&
                    <ClickableTab>
                        <div className="flex gap-1 items-center">
                            <Text>
                                {userDetails?.email}
                            </Text>
                            <FaChevronDown
                                size={10}
                                color={theme.colors.text.tetiary}
                            />
                        </div>
                    </ClickableTab>
                }
            </div>
        )
    }

    return (
        <div className="w-full pl-[250px] h-[60px] border-b-[1px] border-solid border-border-primary fixed top-0 left-0 transition-all duration-300 z-[10]">
            <div className={`w-full h-full flex justify-center bg-bg-primary`}>
                <div className="px-8 w-full h-full flex items-center justify-between">
                    <Profile />
                    <div className="flex items-center gap-2">

                        {/* Search */}
                        <Input
                            value={searchValue}
                            setValue={setSearchValue}
                            placeholder="Search anything..."
                            className="!h-[32px] !px-3 !bg-bg-primary"
                            PreIcon={(
                                <FaMagnifyingGlass
                                    size={13}
                                    color={theme.colors.text.tetiary}
                                />
                            )}
                        />

                        {/* Icons */}
                        <div className="flex items-center gap-1">
                            <ClickableTab>
                                <FaBell
                                    color={theme.colors.text.secondary}
                                />
                            </ClickableTab>
                            <Menu menuItems={menuItems}>
                                <ClickableTab>
                                    <FiMenu color={theme.colors.text.secondary} />
                                </ClickableTab>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar
