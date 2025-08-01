'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useState } from "react"
import { useIssuesContext } from "../../context/context"

const Chip = ({
    isSelected,
    label,
    onClick
} : {
    isSelected: boolean
    label: string
    onClick: () => void
}) => {
    return (
        <div 
            onClick={onClick}
            className={`px-3 py-1 rounded-full flex duration-500 ${isSelected ? "bg-[#7798A8] border-[1px] border-[#7798A8]" : "border-[1px] border-[#DFE7EA] hover:bg-[#3d6c8329] bg-[#F4F8F9]"} cursor-pointer`}
        >
            <Text 
                textColor={isSelected ? theme.colors.bg.primary : theme.colors.text.secondary}
                bold={isSelected ? theme.text.bold.md : theme.text.bold.sm2}
            >
                {label}
            </Text>
        </div>
    )
}

const Priorities = () => {
    const { selectedPriority, setSelectedPriority } = useIssuesContext()
    const priorities = [
        {
            label: "All Priorities",
            value: "all"
        },
        {
            label: "High",
            value: "high"
        },
        {
            label: "Medium",
            value: "medium"
        },
        {
            label: "Low",
            value: "low"
        }
    ]
    return (
        <div className="flex gap-2">
            {
                priorities.map((priority) => (
                    <Chip 
                        key={priority.value}
                        isSelected={priority.value === selectedPriority}
                        label={priority.label}
                        onClick={() => setSelectedPriority(priority.value)}
                    />
                ))
            }
        </div>
    )
}
export default Priorities