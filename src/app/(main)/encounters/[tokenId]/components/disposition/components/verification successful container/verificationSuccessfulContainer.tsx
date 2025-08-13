import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import Image from "next/image"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import Table from "./table/table"
import Button from "@components/button/button"
import { useContext, useEffect, useRef, useState } from "react"
import theme from "@styles/theme"
import { FaUserCircle } from "react-icons/fa"
import { useEncounterContext } from "../../../../context/encounter.context"

const VerificationSuccessfulContainer = () => {
    const [show, setShow] = useState(true)
    const {nhisDetails, capturedImageUrl, setCaptureImageUrl, setDispositionViewState} = useEncounterContext()
    const firstRender = useRef(true);

    useEffect(()=>{
        if(!show)
            setDispositionViewState(null)
    },[show])

    useEffect(()=>{
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        
        return ()=> {
            console.log("unmount")
            setCaptureImageUrl(null)
        }
    },[])
    return (
        <>
            <Overlay onClick={()=>setDispositionViewState(null)}>
                <Container 
                    className="!w-[500px] pb-[30px]"
                    close={()=>setDispositionViewState(null)}
                >
                    <div className="py-[30px]">
                        <div className="relative h-[200px] w-[280px] flex justify-center">
                            <div className="absolute flex justify-center items-center bottom-0 left-0 p-2 w-[140px] h-[140px] bg-[#16a34c1e] rounded-full">
                                {
                                    capturedImageUrl ?
                                    <div className="relative overflow-hidden rounded-full w-full h-full">
                                        <Image
                                            src={capturedImageUrl}
                                            alt="profile"
                                            width={130}
                                            height={130}
                                        />
                                    </div>
                                    :
                                    <FaUserCircle color={theme.colors.text.tetiary} size={105} />
                                }
                            </div>
                            {
                                nhisDetails?.imageUrl &&
                                <div className="absolute right-0 top-0 p-2 w-[140px] h-[140px] bg-[#16a34c1e] rounded-full">
                                    <div className="relative overflow-hidden rounded-full w-full h-full">
                                        <Image
                                            src={nhisDetails?.imageUrl}
                                            alt="profile"
                                            width={130}
                                            height={130}
                                        />
                                    </div>
                                </div>
                            }
                            <div className="absolute right-0 top-0 w-full h-full flex justify-center items-center">
                                <div className="relative overflow-hidden rounded-full bg-[#16a34c40] p-1">
                                    <div className="relative overflow-hidden rounded-full bg-[#ffffffb7] p-1">
                                        <RiVerifiedBadgeFill
                                            color="#60B956"
                                            size={30}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Text
                        fontfamily="greater-theory"
                        textColor="#60B956"
                        size={TypographySize.HM}
                    >
                        Verification Successful
                    </Text>
                    <div className="w-full relative h-[350px] px-4 overflow-hidden">
                        <Table />
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#ffffff] via-[#ffffff]/80 to-transparent">
                            
                        </div>
                        <div className="absolute bottom-0 w-full flex justify-center pr-[30px]">
                            <Button 
                                text="Close"
                                className="!min-w-[200px]"
                                onClick={()=>setDispositionViewState(null)}
                            />
                        </div>
                    </div>
                </Container>
            </Overlay>
        </>
    )
}
export default VerificationSuccessfulContainer