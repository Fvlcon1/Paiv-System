'use client'

import Image from "next/image"
import Text from "@styles/components/text"
import { gradientClass } from "@/utils/constants"
import theme from "@styles/theme"
import Left from "./components/left"
import { useRouter } from "next/navigation"
import ClickableTab from "@components/clickable/clickabletab"
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"
import { useState } from "react"
import { hexOpacity } from "@/utils/hexOpacity"
import FormViewState from "./components/form-viewstate"
import { useRegisterContext } from "./context/register-context"
import Logo from "@components/logo/logo"

const Footer = () => {
    return (
        <div className="w-full justify-center items-center flex">
            <Text
                textColor={theme.colors.text.tetiary}
            >
                © 2025 PAIV Hospital. All rights reserved. | Privacy Policy | Terms of Service
            </Text>
        </div>
    )
}

const Main = () => {
    const { step, setStep } = useRegisterContext()

    const Previous = () => (
        step === 5 ? null : (
            <ClickableTab
                className="!w-fit !py-1.5"
                onClick={() => setStep(step > 1 ? step - 1 : step)}
            >
                <div className="flex items-center gap-2">
                    <FaArrowLeftLong size={12} color={theme.colors.text.secondary} />
                    <Text
                        textColor={theme.colors.text.secondary}
                    >
                        Previous
                    </Text>
                </div>
            </ClickableTab>
        )
    )

    return (
        <div className="w-full max-w-[950px] h-[600px] flex rounded-2xl bg-bg-primary border border-border-primary shadow-xs-2xl shadow-xs-main-primary/20 p-2">
            <div className="flex flex-1 relative h-full rounded-xl overflow-hidden bg-black">
                <Image
                    src={"/assets/prod/auth-bg-3.jpg"}
                    alt="auth-bg"
                    width={1200}
                    height={1200}
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                />
                <Left />
            </div>

            <div className="flex flex-1 relative h-full rounded-xl p-4 justify-center items-center">
                <div className="flex w-[80%] h-full flex-col gap-4 justify-between">
                    <Previous />
                    <FormViewState />
                    <Text
                        textColor={theme.colors.text.tetiary + hexOpacity(50)}
                        size={theme.text.size.HM}
                        bold={theme.text.bold.md2}
                    >
                        Step {step} of 5
                    </Text>
                </div>
            </div>
        </div>
    )
}

const Register2 = () => {
    return (
        <div className="w-full h-full flex-col gap-[60px] flex items-center justify-center bg-main-primary/5">
            <Logo size={70} />
            <Main />
            <Footer />
        </div>
    )
}
export default Register2