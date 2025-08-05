import { useState, useEffect } from "react"
import ClickableTab from "@components/clickable/clickabletab"
import Text from "@styles/components/text"
import { FaChevronDown } from "react-icons/fa"
import Pressable from "@components/button/pressable"
import { useAuth } from "@/app/context/authContext"
import { MdLocalHospital } from "react-icons/md"
import useProfile from "@/app/hooks/useProfile"
import { useTheme } from "@/app/styles/theme-context"
import { PiWarningOctagonFill } from "react-icons/pi"
import { FaBell } from "react-icons/fa6"
import { hexOpacity } from "@/utils/hexOpacity"
import { usePathname } from "next/navigation"

const Profile = () => {
    const { userDetails, logout } = useAuth()
    const { isUserProfileLoading } = useProfile()
    const {theme} = useTheme()
    const pathname = usePathname()

    const pageMapping : Record<string, string> = {
        "/patient-verification" : "Patient Verification",
        "/encounters" : "Encounters",
        "/claims" : "Claims",
        "/issues" : "Issues",
        "/claim-support" : "Claim Support",
        "/reports" : "Reports",
        "/settings" : "Settings",
    }

    return (
        <div className="flex gap-2 items-center">
            <Text
                size={theme.text.size.body2}
                bold={theme.text.bold.md}
            >
                {pageMapping[pathname]}
            </Text>
            {
                // isUserProfileLoading ?
                //     <div className="normal-loader !w-[18px]"></div>
                //     :
                //     userDetails?.hospitalName &&
                //     <Pressable scaleFactor={1.015}>
                //         <div className="flex px-2 py-[6px] pr-[10px] border-[1px] border-solid border-border-primary rounded-xl bg-bg-tetiary cursor-pointer hover:bg-bg-quantinary duration-200 h-fit items-center gap-1">
                //             <MdLocalHospital color={theme.colors.text.secondary} />
                //             <Text>
                //                 {userDetails?.hospitalName}
                //             </Text>
                //         </div>
                //     </Pressable>
            }
            {
                // userDetails?.email &&
                // <ClickableTab>
                //     <div className="flex gap-1 items-center">
                //         <Text>
                //             {userDetails?.email}
                //         </Text>
                //         <FaChevronDown
                //             size={10}
                //             color={theme.colors.text.tetiary}
                //         />
                //     </div>
                // </ClickableTab>
            }
        </div>
    )
}

const Right = () => {
    const {theme} = useTheme()
    return (
        <div className="flex items-center">
            <ClickableTab>
                <PiWarningOctagonFill
                    color={theme.colors.text.tetiary}
                    size={19}
                />
            </ClickableTab>
            <ClickableTab>
                <div className="relative">
                    <FaBell 
                        color={theme.colors.text.tetiary}
                        size={17}
                    />
                    <div className="absolute top-[-3] right-[-2] w-[11px] h-[11px] rounded-full border-[2px] border-bg-primary bg-main-primary" />
                </div>
            </ClickableTab>
            <div className="flex mx-4 h-[20px] w-[1px] bg-border-primary" />
            <div className="flex gap-1 items-center">
                <div className="flex items-center gap-1">
                    <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-main-primary/80">
                        <Text 
                            textColor={theme.colors.bg.primary + hexOpacity(80)}
                            bold={theme.text.bold.md}
                        >
                            PN
                        </Text>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <Text bold={theme.text.bold.md}>
                            Prince Nedjoh
                        </Text>
                        <Text textColor={theme.colors.text.tetiary}>
                            princenedjoh@gmail.com
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Topbar = () => {
    return (
        <div className="w-full pl-[250px] h-[50px] border-b-[1px] border-solid border-border-primary fixed top-0 left-0 transition-all duration-300 z-[10]">
            <div className={`w-full h-full flex justify-center bg-bg-primary`}>
                <div className="px-8 w-full h-full flex items-center justify-between">
                    <Profile />
                    <Right />
                </div>
            </div>
        </div>
    )
}

export default Topbar
