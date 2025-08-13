import Pressable from "@components/button/pressable"
import { Checkbox, Tooltip } from "antd"
import { ReactNode } from "react"
import { FaTrashCan } from "react-icons/fa6"
import theme from "@styles/theme"

const PrimaryChip = ({
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
            <Tooltip
                title="Primary diagnosis"
            >
                <div 
                    className="flex px-2 py-1 gap-1 items-center rounded-full bg-main-primary hover:opacity-[0.7] duration-150"
                >
                    <Checkbox checked />
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
                            color={"#db3e1f"}
                            size={11}
                        />
                    </div>
                </div>
            </Tooltip>
        </Pressable>
    )
}
export default PrimaryChip