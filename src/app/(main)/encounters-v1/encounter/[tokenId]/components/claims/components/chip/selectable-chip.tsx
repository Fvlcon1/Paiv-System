import Pressable from "@components/button/pressable"
import theme from "@styles/theme"
import { Checkbox, Tooltip } from "antd"
import { ReactNode } from "react"
import { FaTrashCan } from "react-icons/fa6"

const SelectableChip = ({
    children,
    onClick,
    handleDelete
} : {
    children? : ReactNode
    onClick? : ()=>void
    handleDelete?: ()=>void
}) => {
    return (
        <Pressable
            onClick={onClick}
        >
            <div 
                className="flex px-2 py-1 gap-1 items-center rounded-full bg-bg-tetiary border-[1px] border-border-primary hover:opacity-[0.7] duration-150"
            >
                <Checkbox checked={false} />
                {children}
                <div 
                    className="bg-bg-primary rounded-full p-1"
                    onClick={(e) => {
                        e.stopPropagation()
                        if(handleDelete)
                            handleDelete()
                    }}
                >
                    <FaTrashCan 
                        color="#db3e1f"
                        size={11}
                    />
                </div>
            </div>
        </Pressable>
    )
}
export default SelectableChip