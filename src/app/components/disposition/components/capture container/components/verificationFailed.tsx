import { mainContext } from "@/app/context/context"
import { DispositionViewState, ViewState } from "@/app/utils/types"
import Button from "@components/button/button"
import OutlineButton from "@components/button/outlineButton"
import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import { useContext, useEffect, useState } from "react"
import { MdSmsFailed } from "react-icons/md"
import { TbFaceIdError } from "react-icons/tb"

const VeficationFailed = () => {
    const [isVisible, setIsVisible] = useState(true)
    const {nhisDetails, setCaptureImageUrl, capturedImageUrl, setDispositionViewState} = useContext(mainContext)

    useEffect(()=>{
        if(!isVisible)
            setDispositionViewState(null)
    },[isVisible])

    return (
        <>
            <Overlay onClick={()=>setDispositionViewState(null)}>
                <Container
                    display={isVisible}
                    setDisplay={setIsVisible}
                    className="!w-[500px] justify-center"
                >
                    <div className="flex flex-col gap-1 items-center">
                        <TbFaceIdError 
                            size={50}
                            color="#eb4034"
                        />
                        <Text
                            fontfamily="greater-theory"
                            textColor="#eb4034"
                            size={TypographySize.HM}
                        >
                            Verification Failed
                        </Text>
                        <div className="flex gap-1 items-center mt-1">
                            <OutlineButton
                                text="Cancel"
                                onClick={()=>{
                                    setCaptureImageUrl(null)
                                    setDispositionViewState(null)
                                }}
                            />
                            <Button
                                text="Retake"
                                onClick={()=>{
                                    setCaptureImageUrl(null)
                                    setDispositionViewState(DispositionViewState.CAPTURE)
                                }}
                                className="!bg-bg-quantinary"
                            />
                        </div>
                    </div>
                </Container>
            </Overlay>
        </>
    )
}
export default VeficationFailed