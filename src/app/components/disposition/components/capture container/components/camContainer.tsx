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
            <div className="absolute left-[-3px] top-[-3px] w-[70px] h-[70px] rounded-tl-[20px] border-t-[5px] border-l-[5px] border-solid border-[#3C3C53]">

            </div>
            <div className="absolute right-[-3px] bottom-[-3px] w-[70px] h-[70px] rounded-br-[20px] border-b-[5px] border-r-[5px] border-solid border-[#3C3C53]">

            </div>
            <div className="w-full relative rounded-[10px] h-full border-[1px] border-solid border-border-secondary bg-[#4f4f631d]">
                <div className="w-full h-full flex justify-center items-center">
                    {/* <TbFaceId
                        color={theme.colors.text.tetiary}
                        size={50}
                    /> */}
                    {children}
                </div>
                <div className="absolute left-[50px] top-[50px] w-[50px] h-[50px] rounded-tl-[20px] border-t-[2px] border-l-[2px] border-solid border-[#686887]">

                </div>
                <div className="absolute right-[50px] top-[50px] w-[50px] h-[50px] rounded-tr-[20px] border-t-[2px] border-r-[2px] border-solid border-[#686887]">

                </div>
                <div className="absolute right-[50px] bottom-[50px] w-[50px] h-[50px] rounded-br-[20px] border-b-[2px] border-r-[2px] border-solid border-[#686887]">

                </div>
                <div className="absolute left-[50px] bottom-[50px] w-[50px] h-[50px] rounded-bl-[20px] border-b-[2px] border-l-[2px] border-solid border-[#686887]">

                </div>
            </div>
        </>
    )
}
export default CamContainer