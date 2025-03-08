import { useState, useEffect } from "react"
import ClickableTab from "@components/clickable/clickabletab"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { FaHospitalSymbol, FaPowerOff, FaUserCircle } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import Menu from "../dropdown/dropdown"
import Link from "next/link"
import { DropdownItem } from "@/utils/@types"
import { IoMdSettings } from "react-icons/io"
import Pressable from "@components/button/pressable"
import { useAuth } from "@/app/context/authContext"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"

const Topbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [hospitalName, setHospitalName] = useState('')

    
    const navTabs = [
        { name: "Add Questions", active: true },
        { name: "Curate Questions", active: false }
    ]
    
    const { logout } = useAuth()
    
    const menuItems: DropdownItem[] = [
        { key: "1", label: "Pages", type: 'title', disabled: true },
        { key: "2", type: 'link', href: "/", label: "Search" },
        { key: "3", type: 'link', href: "/claims", label: "Claims" },
        { type: "divider", key: "divider-2" },
        { key: "4", label: "Settings", icon: <IoMdSettings size={15} className="ml-[-1.5px]" color={theme.colors.text.secondary} /> },
        { key: "5", label: "Logout", onClick: () => logout(false), icon: <FaPowerOff size={12} color={theme.colors.text.secondary} /> },
    ]
    
    const getUserProfile = async() => {
        const response = await protectedApi.GET("/user/profile")
        return response
    }
    
    const {mutate : getUserProfileMutation, isPending : isUserProfileLoading} = useMutation({
        mutationFn : getUserProfile,
        onSuccess : (data)=>{
            setHospitalName(data.hospital_name)
        }
    })
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(()=>{
        getUserProfileMutation()
    },[])

    return (
        <div className={`w-full h-[60px] flex justify-center fixed top-0 left-0 transition-all duration-300 z-50
            ${isScrolled ? "bg-bg-secondary" : "bg-transparent"}`}
        >
            <div className="max-w-[1024px] w-full h-full flex items-center justify-between">
                <Link className="flex items-center gap-1" href={'/'}>
                    <Image 
                        src={"/assets/prod/logo.png"}
                        alt="logo"
                        width={25}
                        height={25}
                    />
                    <Text bold={TypographyBold.md}>
                        PAIV System
                    </Text>
                </Link>
                <div className="flex items-center gap-2">
                    {
                        isUserProfileLoading ?
                        <div className="normal-loader !w-[18px]"></div>
                        : hospitalName &&
                        <Pressable scaleFactor={1.015}>
                            <div className="flex px-2 py-[6px] pr-[10px] border-[1px] border-solid border-border-tetiary rounded-full bg-bg-tetiary cursor-pointer hover:bg-bg-quantinary duration-200 h-fit items-center gap-[6px]">
                                <FaHospitalSymbol color={theme.colors.text.primary} />
                                <Text textColor={theme.colors.text.primary}>
                                    {hospitalName}
                                </Text>
                            </div>
                        </Pressable>
                    }
                    <Menu menuItems={menuItems}>
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
