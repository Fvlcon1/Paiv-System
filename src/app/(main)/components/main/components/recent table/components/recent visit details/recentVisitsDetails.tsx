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
import { ViewState } from "@/app/utils/types"
import { IRecentVisits, IRecentVisitsTable } from "../../utils/type"
import Text from "@styles/components/text"
import Link from "next/link"

const RecentVisitsDetails = ({
    setDisplay,
    display,
    data
} : {
    setDisplay: Dispatch<SetStateAction<boolean>>
    display: boolean
    data? : IRecentVisitsTable
}) => {
    const [zoomProfile, setZoomProfile] = useState(false)
    useEffect(()=>{
        console.log({data})
    },[data])
    
    return (
        <>
            <AnimatePresence>
                {
                    data && display &&
                    <Overlay onClick={() => setDisplay(false)}>
                        <div className="w-[500px] flex flex-col items-center p-2 relative rounded-[20px] border-[1px] border-solid border-border-primary pb-8 bg-bg-primary"
                            style={{
                                backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        >
                            <div className="w-full rounded-[10px] flex justify-center h-[100px] border-[1px] py-4 border-solid border-border-primary bg-bg-tetiary">
                                
                            </div>
                            <div className="flex flex-col gap-[10px] w-full items-center">
                                <div className="p-2 w-[120px] h-[120px] bg-bg-secondary rounded-full mt-[-60px]">
                                    {data.imageUrl ? (
                                        <div className="relative overflow-hidden rounded-full w-full h-full">
                                            <Image
                                                src={data.imageUrl}
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
                                <Text 
                                    fontfamily="greater-theory"
                                >
                                    Last visit details
                                </Text>
                                <div className="w-full flex justify-center px-4">
                                    <Table 
                                        recentVisit={data}
                                    />
                                </div>
                                <div className="px-4 w-full">
                                    <Link href={`encounters/encounter/${data.token}`}>
                                        <Button
                                            text="View Encounter"
                                            className="mt-[20px] !w-full !h-[45px] !border-none !bg-main-primary"
                                        />
                                    </Link>
                                </div>
                                <div className="absolute top-[15px] right-[15px]">
                                    <ClickableTab
                                        className="!rounded-full hover:!bg-bg-quantinary !px-1"
                                        onClick={() => setDisplay(false)}
                                    >
                                        <IoMdCloseCircle color={theme.colors.text.secondary} />
                                    </ClickableTab>
                                </div>
                            </div>
                        </div>
                    </Overlay>
                }
            </AnimatePresence>

            <ZoomImage
                setShow={setZoomProfile}
                show={zoomProfile}
                imageURL={data?.imageUrl ?? ''} 
            />
        </>
    )
}
export default RecentVisitsDetails