import ClickableTab from "@components/clickable/clickabletab"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import { FaCheckSquare } from "react-icons/fa"
import { IoMdCloseCircle } from "react-icons/io"
import { TbFaceId } from "react-icons/tb"
import Rules from "./components/rules"
import CamContainer from "./components/camContainer"
import CamCapture from "./components/camCapture"
import { Dispatch, SetStateAction } from "react"
import { ViewState } from "@/app/utils/types"

const CaptureContainer = ({
    setViewState
} : {
    setViewState: Dispatch<SetStateAction<ViewState | null>>
}) => {
    return (
        <div>
            <Overlay    
                onClick={()=>setViewState(null)}
            >
                <div 
                    className="w-[500px] flex flex-col items-center p-2 relative rounded-[20px] border-[1px] border-solid border-border-tetiary h-[650px] bg-[#1F1F28]"
                    style={{
                        backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}                    
                >
                    <CamContainer>
                        <CamCapture setViewState={setViewState}/>
                    </CamContainer>
                    <Rules />
                    <div className="absolute top-[15px] right-[15px]">
                        <ClickableTab 
                            className="!rounded-full !bg-[#00000045] hover:!bg-bg-tetiary"
                            onClick={()=>setViewState(null)}
                        >
                            <IoMdCloseCircle color={theme.colors.text.secondary} />
                        </ClickableTab>
                    </div>
                </div>
            </Overlay>
        </div>
    )
}
export default CaptureContainer