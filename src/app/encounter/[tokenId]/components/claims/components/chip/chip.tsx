import Pressable from "@components/button/pressable"
import { ReactNode } from "react"
import { FaTrashCan } from "react-icons/fa6"

const Chip = ({
    children,
    onClick
} : {
    children? : ReactNode
    onClick? : ()=>void
}) => {
    return (
        <Pressable
            onClick={onClick && onClick}
        >
            <div 
                className="flex px-2 py-1 gap-1 items-center rounded-full bg-bg-quantinary hover:opacity-[0.7] duration-150"
            >
                {children}
                <div className="">
                    <FaTrashCan 
                        color="#db3e1f"
                        size={11}
                    />
                </div>
            </div>
        </Pressable>
    )
}
export default Chip