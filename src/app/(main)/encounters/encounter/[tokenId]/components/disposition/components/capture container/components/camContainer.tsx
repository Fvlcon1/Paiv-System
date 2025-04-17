import theme from "@styles/theme"
import { ReactNode } from "react"
import { TbFaceId } from "react-icons/tb"

const CamContainer = ({
    children
} : {
    children? : ReactNode
}) => {
    return (
        <>
            <div className="w-full relative rounded-[10px] h-full border-[1px] border-solid border-border-secondary bg-[#4f4f631d]">
                <div className="w-full h-full flex justify-center items-center">
                    {children}
                </div>
                <div className="absolute left-[50px] top-[50px] w-[50px] h-[50px] rounded-tl-[20px] border-t-[2px] border-l-[2px] border-solid border-main-primary">

                </div>
                <div className="absolute right-[50px] top-[50px] w-[50px] h-[50px] rounded-tr-[20px] border-t-[2px] border-r-[2px] border-solid border-main-primary">

                </div>
                <div className="absolute right-[50px] bottom-[50px] w-[50px] h-[50px] rounded-br-[20px] border-b-[2px] border-r-[2px] border-solid border-main-primary">

                </div>
                <div className="absolute left-[50px] bottom-[50px] w-[50px] h-[50px] rounded-bl-[20px] border-b-[2px] border-l-[2px] border-solid border-main-primary">

                </div>
            </div>
        </>
    )
}
export default CamContainer