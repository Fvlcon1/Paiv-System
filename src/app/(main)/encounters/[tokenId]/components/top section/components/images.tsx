import Image from "next/image"
import { IEncounterDetails } from "../../../utils/types"
import theme from "@styles/theme"
import { FaUserCircle } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { useEncounterContext } from "../../../context/encounter.context"
import { ReactNode } from "react"

const OutterContainer = ({
    children
} : {
    children? : ReactNode
}) => {
    return (
        <div className="flex justify-center items-center border-border-primary border-[1px] p-2 w-[140px] h-[140px] bg-bg-tetiary rounded-full">
            {children}
        </div>
    )
}

const Images = () => {
    const {encounterDetails} = useEncounterContext()
    
    return (
        <div className="relative gap-2 flex justify-center">

            {/* Profile Image */}
            <OutterContainer>
                {
                    encounterDetails?.imageUrl ?
                    <div className="relative overflow-hidden rounded-full w-full h-full">
                        <Image
                            src={encounterDetails.imageUrl}
                            alt="profile"
                            fill
                            className="object-cover"
                            sizes="100px"
                        />
                    </div>
                    :
                    <FaUserCircle color={theme.colors.text.tetiary} size={105} />
                }
            </OutterContainer>

            {/* Checkin Image */}
            <OutterContainer>
                {
                    encounterDetails?.checkinImageUrl ?
                    <div className="relative overflow-hidden rounded-full w-full h-full">
                        <Image
                            src={encounterDetails.checkinImageUrl}
                            alt="profile"
                            fill
                            className="object-cover"
                            sizes="100px"
                        />
                    </div>
                    :
                    <FaUserCircle color={theme.colors.text.tetiary} size={130} />
                }
            </OutterContainer>

            {/* Checkout Image */}
            <OutterContainer>
                {
                    encounterDetails?.checkoutImageUrl ?
                    <div className="relative overflow-hidden rounded-full w-full h-full">
                        <Image
                            src={encounterDetails.checkoutImageUrl}
                            alt="profile"
                            fill
                            className="object-cover"
                            sizes="100px"
                        />
                    </div>
                    :
                    <FaUserCircle color={theme.colors.text.tetiary} size={130} />
                }
            </OutterContainer>

            {/* Status */}
            <div className="h-full flex justify-center items-center">
                {
                    encounterDetails?.checkoutImageUrl ?
                    <div className="relative mt-[50px] ml-[10px] overflow-hidden rounded-full bg-[#8986866e] p-1">
                        <div className="relative overflow-hidden h-[30px] w-[30px] flex justify-center items-center rounded-full bg-bg-primary p-1">
                            <RiVerifiedBadgeFill
                                color="#60B956"
                                size={30}
                            />
                        </div>
                    </div>
                    :
                    encounterDetails?.checkinImageUrl && !encounterDetails.checkinStatus ?
                    <div className="relative mt-[50px] ml-[10px] overflow-hidden rounded-full bg-[#8986866e] p-1">
                        <div className="relative overflow-hidden h-[30px] w-[30px] flex justify-center items-center rounded-full bg-bg-primary p-1">
                            <GiCancel
                                color="#e8362a"
                                size={30}
                            />
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    )
}
export default Images