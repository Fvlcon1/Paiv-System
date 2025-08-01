import { hexOpacity } from "@/utils/hexOpacity"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useState } from "react"
import toast from "react-hot-toast"
import { BsShieldCheck } from "react-icons/bs"
import { GiPadlock } from "react-icons/gi"
import { IoShieldCheckmark, IoShieldCheckmarkOutline } from "react-icons/io5"

const Notice = () => {
    return (
        <div className="w-full relative max-w-[700px] mb-[50px] pl-6 ml-[7px] bg-[linear-gradient(135deg,#e3f2fd93_0%,#f3e5f593_100%)] flex flex-col gap-1 px-3 py-3 rounded-xl">
            <div className="w-full flex items-center gap-2">
                <IoShieldCheckmark
                    size={15}
                    color={theme.colors.main.primary}
                />
                <Text
                    size={theme.text.size.body2}
                    textColor={theme.colors.main.primary}
                    bold={theme.text.bold.md}
                >
                    Enhanced Security Active
                </Text>
            </div>
            <Text>
                For your security, we use your location to help verify your identity during login. By continuing, you consent to sharing your approximate location. This helps us detect and prevent unauthorized access.
            </Text>
            <div
                className="flex items-center gap-1 rounded-full px-2 py-1 pr-3 w-fit"
                style={{
                    backgroundColor: theme.colors.main.primary + hexOpacity(10)
                }}
            >
                <GiPadlock
                    color={theme.colors.main.primary}
                    size={14}
                />
                <Text
                    textColor={theme.colors.main.primary}
                >
                    Privacy Protected
                </Text>
            </div>

            <div className="absolute left-0 top-0 w-[7px] h-full bg-main-primary rounded-l-md" />
        </div>
    )
}
export default Notice