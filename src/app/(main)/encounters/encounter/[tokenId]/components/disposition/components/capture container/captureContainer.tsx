import ClickableTab from "@components/clickable/clickabletab"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { IoMdCloseCircle } from "react-icons/io"
import { TbFaceId } from "react-icons/tb"
import Rules from "./components/rules"
import CamContainer from "./components/camContainer"
import CamCapture from "./components/camCapture"
import { useEncounterContext } from "@/app/(main)/encounters/encounter/[tokenId]/context/encounter.context"

const CaptureContainer = () => {
    const {setDispositionViewState} = useEncounterContext()

    return (
        <div>
            <Overlay    
                onClick={()=>setDispositionViewState(null)}
            >
                <div 
                    className="w-[500px] flex flex-col items-center p-2 relative rounded-[20px] border-[1px] border-solid border-border-tetiary h-[650px] bg-bg-primary"
                    style={{
                        backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}                    
                >
                    <CamContainer>
                        <CamCapture setDispositionViewState={setDispositionViewState}/>
                    </CamContainer>
                    <Rules />
                    <div className="absolute top-[15px] right-[15px]">
                        <ClickableTab 
                            className="!rounded-full !px-1 !bg-[#00000045] hover:!bg-bg-tetiary"
                            onClick={()=>setDispositionViewState(null)}
                        >
                            <IoMdCloseCircle color={theme.colors.bg.primary} />
                        </ClickableTab>
                    </div>
                </div>
            </Overlay>
        </div>
    )
}
export default CaptureContainer