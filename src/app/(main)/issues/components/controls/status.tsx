'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
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

const Status = () => {
    const { selectedStatus, setSelectedStatus } = useIssuesContext()
    const status = [
        {
            label: "All Status",
            value: "all"
        },
        {
            label: "Completed",
            value: "completed"
        },
        {
            label: "Pending",
            value: "pending"
        },
        {
            label: "Unassigned",
            value: "unassigned"
        }
    ]
    return (
        <div className="flex gap-2">
            {
                status.map((status) => (
                    <Chip 
                        key={status.value}
                        isSelected={status.value === selectedStatus}
                        label={status.label}
                        onClick={() => setSelectedStatus(status.value)}
                    />
                ))
            }
        </div>
    )
}
export default Status