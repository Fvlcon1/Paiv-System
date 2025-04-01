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
    
    return (
        <>
            <AnimatePresence>
                {
                    data && display &&
                    <Overlay onClick={() => setDisplay(false)}>
                        <div className="w-[500px] flex flex-col items-center p-2 relative rounded-[20px] border-[1px] border-solid border-border-tetiary pb-8 bg-[#1F1F28]"
                            style={{
                                backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        >
                            <div className="absolute left-[-3px] top-[-3px] w-[70px] h-[70px] rounded-tl-[20px] border-t-[5px] border-l-[5px] border-solid border-[#3C3C53]">

                            </div>
                            <div className="absolute right-[-3px] bottom-[-3px] w-[70px] h-[70px] rounded-br-[20px] border-b-[5px] border-r-[5px] border-solid border-[#3C3C53]">

                            </div>
                            <div className="w-full rounded-[10px] flex justify-center h-[100px] border-[1px] py-4 border-solid border-border-secondary bg-[#4f4f631d]">
                                
                            </div>
                            <div className="flex flex-col gap-[10px] w-full items-center">
                                <div className="p-2 w-[120px] h-[120px] bg-[#24242F] rounded-full mt-[-60px] border-b-[1px] border-solid border-border-tetiary">
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
                                <div className="absolute top-[15px] right-[15px]">
                                    <ClickableTab
                                        className="!rounded-full hover:!bg-bg-tetiary"
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