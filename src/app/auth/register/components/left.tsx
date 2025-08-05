import Image from "next/image"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { PiHospitalFill } from "react-icons/pi"
import { FaLocationArrow } from "react-icons/fa"
import { MdContacts } from "react-icons/md"
import { FaLock } from "react-icons/fa"
import { FaCheckCircle } from "react-icons/fa"
import Button from "@components/button/button"
import { useRouter } from "next/navigation"
import ClickableTab from "@components/clickable/clickabletab"
import { useTheme } from "@styles/theme-context"
import { FaArrowLeftLong } from "react-icons/fa6"
import { hexOpacity } from "@/utils/hexOpacity"
import { useState } from "react"
import { useRegisterContext } from "../context/register-context"

const Left = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const { step, setStep } = useRegisterContext()
    
    const Logo = () => {
        const LogoImage = () => (
            <Image
                src={"/assets/prod/logo-light.png"}
                alt="logo"
                width={25}
                height={25}
            />
        )

        return (
            <div className="flex items-center gap-1">
                <LogoImage />
                <Text
                    bold={theme.text.bold.md}
                    size={theme.text.size.body2}
                    textColor={theme.colors.bg.primary}
                >
                    PAIV System
                </Text>
            </div>
        )
    }

    const steps = [
        {
            title: "Facility Information",
            description: "Input the details of your facility",
            icon: PiHospitalFill
        },
        {
            title: "Location Information",
            description: "Address and GPS location",
            icon: FaLocationArrow
        },
        {
            title: "Contact Person Information",
            description: "Contact details of hospital representative",
            icon: MdContacts
        },
        {
            title: "Credentialing Information",
            description: "Certificates and documentation",
            icon: FaLock
        },
        {
            title: "Completed",
            description: "All set! You can now login to your account",
            icon: FaCheckCircle
        }
    ]

    const Bottom = () => {
        return (
            <div className="flex w-full justify-between items-center mt-6">
                <ClickableTab
                    className="hover:!bg-bg-primary/20 !py-1.5"
                    onClick={() => router.push('/')}
                >
                    <div className="flex items-center gap-2">
                        <FaArrowLeftLong size={12} color={theme.colors.bg.primary} />
                        <Text
                            textColor={theme.colors.bg.primary}
                        >
                            Back to home
                        </Text>
                    </div>
                </ClickableTab>
                <Button
                    text="Sign in"
                    onClick={() => router.push('/auth/login')}
                    className="!bg-bg-primary/20 !h-[30px]"
                />
            </div>
        )
    }

    const Steps = () => {
        return (
            <div className="flex flex-col gap-6">
                {
                    steps.map((item, index) => (
                        <div key={index} className={`relative flex items-center gap-2 ${index + 1 > step ? "opacity-40" : ""}`}>
                            <div className="w-[32px] h-[32px] border border-border-primary flex items-center justify-center rounded-full bg-bg-primary">
                                <item.icon size={12} color={theme.colors.text.secondary} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <Text
                                    bold={theme.text.bold.md}
                                    size={theme.text.size.body2}
                                    textColor={theme.colors.bg.primary}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    textColor={theme.colors.bg.primary + hexOpacity(50)}
                                >
                                    {item.description}
                                </Text>
                            </div>
                            {
                                index !== steps.length - 1 && (
                                    <div className="absolute left-4 top-[33px] w-[1px] h-[22px] border-r border-bg-primary border-dashed" />
                                )
                            }
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full flex p-8 flex-col gap-8 justify-center">
            <Logo />
            <div className="flex flex-col gap-4">
                <Text
                    bold={theme.text.bold.md2}
                    size={"35px"}
                    textColor={theme.colors.bg.primary}
                >
                    Let's setup your account
                </Text>
                <Steps />
                <Bottom />
            </div>
        </div>
    )
}
export default Left