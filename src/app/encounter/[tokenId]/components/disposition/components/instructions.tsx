import Button from "@components/button/button"
import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdVerifiedUser } from "react-icons/md"
import { RiCameraLensFill } from "react-icons/ri"
import { TbFaceId } from "react-icons/tb"
import { DispositionViewState, ViewState } from "@/app/utils/types"
import { useEncounterContext } from "../../../context/encounter.context"

const Instructions = () => {
    const [isVisible, setIsVisible] = useState(true)
    const {setDispositionViewState} = useEncounterContext()

    useEffect(()=>{
        if(!isVisible)
            setDispositionViewState(null)
    },[isVisible])
    return (
        isVisible ?
        <Overlay onClick={()=>setDispositionViewState(null)}>
            <Container  
                className="w-[450px] !px-10 !py-6"
                display={isVisible}
                setDisplay={setIsVisible}
            >
                <div className="flex w-full flex-col gap-2">
                    <Image
                        src={"/assets/prod/nhis-logo.png"}
                        alt="logo"
                        width={50}
                        height={50}
                        style={{ height: "auto", width: 50 }}
                        className="mt-[30px] ml-[-3px]"
                    />
                    <Text
                        bold={TypographyBold.md}
                        size={TypographySize.HM}
                    >
                        Patient Indentity Verification
                    </Text>
                    <div className="flex flex-col gap-2 w-full relative">
                        <div className="flex gap-2 items-center border-[1px] border-solid border-border-tetiary rounded-[15px] px-3 py-3 bg-[#ffffff08]">
                            <RiCameraLensFill 
                                color={theme.colors.text.tetiary}
                                size={40}
                            />
                            <div className="flex flex-col">
                                <Text textColor={theme.colors.text.tetiary}>
                                    Step 1
                                </Text>
                                <Text>
                                    Open the camera to capture a live image.
                                </Text>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center border-[1px] border-solid border-border-tetiary rounded-[15px] px-3 py-3 bg-[#ffffff08]">
                            <TbFaceId 
                                color={theme.colors.text.tetiary}
                                size={40}
                            />
                            <div className="flex flex-col">
                                <Text textColor={theme.colors.text.tetiary}>
                                    Step 2
                                </Text>
                                <Text>
                                    Compare the image with NHIS records 
                                    using facial recognition.
                                </Text>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center border-[1px] border-solid border-border-tetiary rounded-[15px] px-3 py-3 bg-[#ffffff08]">
                            <MdVerifiedUser 
                                color={theme.colors.text.tetiary}
                                size={40}
                            />
                            <div className="flex flex-col">
                                <Text textColor={theme.colors.text.tetiary}>
                                    Step 3
                                </Text>
                                <Text>
                                    Confirm identity before check-in.
                                </Text>
                            </div>
                        </div>
                        <div className="absolute top-[30px] left-[-16px]">
                            <Image
                                src={"/assets/prod/connector-left.png"}
                                alt="connector"
                                width={20}
                                height={20}
                                style={{ height: "auto", width: "100%" }}
                                className=""
                            />
                        </div>
                        <div className="absolute bottom-[30px] right-[-16px]">
                            <Image
                                src={"/assets/prod/connector-right.png"}
                                alt="connector"
                                width={20}
                                height={20}
                                style={{ height: "auto", width: "100%" }}
                                className=""
                            />
                        </div>
                    </div>
                    <Button 
                        text="Continue"
                        onClick={()=>setDispositionViewState(DispositionViewState.CAPTURE)}
                    />
                </div>
            </Container>
        </Overlay>
        :
        <></>
    )
}
export default Instructions