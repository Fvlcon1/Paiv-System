import { mainContext } from "@/app/context/context"
import { ViewState } from "@/app/utils/types"
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
    const {nhisDetails, setCaptureImageUrl, capturedImageUrl, setViewState} = useContext(mainContext)

    useEffect(()=>{
        if(!isVisible)
            setViewState(null)
    },[isVisible])

    return (
        <>
            <Overlay onClick={()=>setViewState(null)}>
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
                        <div className="flex gap-1 items-center">
                            <OutlineButton
                                text="Cancel"
                                onClick={()=>{
                                    setCaptureImageUrl(null)
                                    setViewState(null)
                                }}
                            />
                            <Button
                                text="Retake"
                                onClick={()=>{
                                    setCaptureImageUrl(null)
                                    setViewState(ViewState.CAPTURE)
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