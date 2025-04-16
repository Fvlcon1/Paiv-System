import Overlay from "@components/overlay/overlay"
import Image from "next/image"
import Table from "./components/table/table"
import { IoMdCloseCircle } from "react-icons/io"
import theme from "@styles/theme"
import ClickableTab from "@components/clickable/clickabletab"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { mainContext } from "@/app/context/context"
import { FaUserCircle } from "react-icons/fa"
import ZoomImage from "@components/zoomImage/zoomImage"
import Button from "@components/button/button"
import Instructions from "../instructions/instructions"
import CaptureContainer from "../capture container/captureContainer"
import VerificationSuccessfulContainer from "../verification successful container/verificationSuccessfulContainer"
import { ViewState } from "@/app/utils/types"
import VeficationFailed from "../capture container/components/verificationFailed"
import VerificationSelection from "../verification selection/verificationSelection"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const NhisDetails = () => {
    const {nhisDetails, showNhisDetails, setShowNhisDetails, viewState, setViewState} = useContext(mainContext)
    const [zoomProfile, setZoomProfile] = useState(false)
    const router = useRouter()

    const handleCreateEncounter = async () => {
        const response = await protectedApi.POST("encounter/initiate", {membership_id : nhisDetails?.memberShipId})
        return response
    }

    const {mutate : handleCreateEncounterMutation, isPending} = useMutation({
        mutationFn : handleCreateEncounter,
        onSuccess : (data)=>{
            toast.success("Encounter created successfully")
            router.push(`/encounters/encounter/${data.token}`)
            setViewState(null)
        },
        onError : ()=>{
            toast.error("Error creating encounter")
        }
    })
    
    return (
        <>
            <AnimatePresence>
                {
                    viewState === ViewState.VERIFICATION_SELECTION && <VerificationSelection />
                }
                {
                    viewState === ViewState.INSTRUCTIONS && (
                        <Instructions setViewState={setViewState} />
                    )
                }
                {
                    viewState === ViewState.CAPTURE && (
                        <CaptureContainer setViewState={setViewState} />
                    )
                }
                {
                    viewState === ViewState.VERIFICATION_SUCCESS && <VerificationSuccessfulContainer />
                }
                {
                    viewState === ViewState.VERIFICATION_FAILED && <VeficationFailed />
                }
                {viewState === ViewState.NHIS_DETAILS && (
                    <Overlay onClick={() => setViewState(null)}>
                        <div className="w-[500px] flex flex-col items-center p-2 relative rounded-[20px] border-[1px] border-solid border-border-tetiary h-[750px] bg-bg-primary"
                            style={{
                                backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        >
                            <div className="w-full rounded-[10px] flex justify-center h-[100px] border-[1px] py-4 border-solid border-border-primary bg-bg-tetiary">
                                
                            </div>
                            <div className="p-2 w-[120px] h-[120px] bg-bg-secondary rounded-full mt-[-60px]">
                                {nhisDetails?.imageUrl ? (
                                    <div className="relative overflow-hidden rounded-full w-full h-full">
                                        <Image
                                            src={nhisDetails.imageUrl}
                                            alt="Profile Image"
                                            width={110}
                                            height={110}
                                            style={{ height: "auto", width: "100%" }}
                                            className="hover:scale-[1.1] cursor-pointer duration-200"
                                            onClick={() => setZoomProfile(true)}
                                        />
                                    </div>
                                ) : (
                                    <FaUserCircle color={theme.colors.text.tetiary} size={105} />
                                )}
                            </div>
                            <div className="mt-[10px] w-full flex justify-center px-4">
                                <Table />
                            </div>
                            <div className="px-4 w-full">
                                <Button
                                    text="Create Encounter"
                                    className="mt-[20px] !w-full !h-[45px] !border-none !bg-main-primary"
                                    onClick={()=>handleCreateEncounterMutation()}
                                    // onClick={() => setViewState(ViewState.VERIFICATION_SELECTION)}
                                    loading={isPending}
                                />
                            </div>
                            <div className="absolute top-[15px] right-[15px]">
                                <ClickableTab
                                    className="!rounded-full hover:!bg-bg-tetiary"
                                    onClick={() => setViewState(null)}
                                >
                                    <IoMdCloseCircle color={theme.colors.text.secondary} />
                                </ClickableTab>
                            </div>
                        </div>
                    </Overlay>
                )}
            </AnimatePresence>

            <ZoomImage
                setShow={setZoomProfile}
                show={zoomProfile}
                imageURL={nhisDetails?.imageUrl ?? ''} 
            />
        </>
    )
}
export default NhisDetails