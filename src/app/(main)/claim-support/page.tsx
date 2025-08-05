'use client'

import { useTheme } from "@/app/styles/theme-context"
import Text from "@styles/components/text"
import { gradientClass } from "@/utils/constants"
import Input from "@components/input/input"
import { FaMagnifyingGlass } from "react-icons/fa6"

const TopSection = () => {
    const { theme } = useTheme()
    return (
        <div className="w-full flex flex-col gap-1.5 items-center justify-center h-[250px] bg-main-primary/2 border-b border-border-primary">
            <Text
                size={theme.text.size.HM2}
                bold={theme.text.bold.md2}
                className={gradientClass}
            >
                Claim Support
            </Text>
            <Text
                className="!max-w-[600px]"
                textAlign="center"
                lineHeight={1.3}
            >
                Easily report and track issues related to NHIS claim submissions. Use the in-app ticketing system
                to communicate with support and monitor resolution progress in real time
            </Text>
            <Input
                placeholder="Search ticket by claim token or ticket ID..."
                className="!w-[400px] !rounded-lg !h-[35px] mt-0"
                PreIcon={<FaMagnifyingGlass size={13} color={theme.colors.text.tetiary} />}
                value={''}
                setValue={() => { }}
            />
        </div>
    )
}
const ClaimSupport = () => {
    const { theme } = useTheme()
    return (
        <div className="w-full flex flex-col items-center">
            <TopSection />
        </div>
    )
}
export default ClaimSupport