'use client'

import { useTheme } from "@/app/styles/theme-context"
import Text from "@styles/components/text"

const Chip = ({
    onClick,
    value,
    icon,
    isSelected,
    className
}: {
    onClick: () => void,
    value: string,
    icon?: React.ReactNode,
    isSelected?: boolean,
    className?: string
}) => {
    const { theme } = useTheme()

    return (
        <div
            className={`flex rounded-full duration-300 items-center max-w-[240px] gap-1 px-3 py-1.5 cursor-pointer border-[1px] border-border-secondary ${isSelected ? "bg-main-primary/70 border-main-primary/0" : "hover:bg-main-primary/10"} ${className}`}
            onClick={onClick}
        >
            {icon}
            <Text
                ellipsis
                textColor={isSelected ? theme.colors.bg.primary : theme.colors.text.secondary}
                bold={isSelected ? theme.text.bold.md : theme.text.bold.sm2}
            >
                {value}
            </Text>
        </div>
    )
}
export default Chip