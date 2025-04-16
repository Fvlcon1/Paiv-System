import Image from "next/image"
import { IEncounterDetails } from "../../../utils/types"
import theme from "@styles/theme"
import { FaUserCircle } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { useEncounterContext } from "../../../context/encounter.context"

const Images = () => {
    const {encounterDetails} = useEncounterContext()
    
    return (
        <div className="relative h-[200px] w-[280px] flex justify-center">

            {/* Profile Image */}
            <div className="absolute flex justify-center items-center bottom-0 left-0 p-2 w-[140px] h-[140px] bg-bg-tetiary rounded-full border-b-[1px] border-solid border-border-tetiary">
                {
                    encounterDetails?.imageUrl ?
                    <div className="relative overflow-hidden rounded-full w-full h-full">
                        <Image
                            src={encounterDetails.imageUrl}
                            alt="profile"
                            width={130}
                            height={130}
                        />
                    </div>
                    :
                    <FaUserCircle color={theme.colors.text.tetiary} size={105} />
                }
            </div>

            {/* Checkin Image */}
            <div className="absolute flex justify-center items-center right-[15px] top-0 p-2 w-[140px] h-[140px] bg-bg-tetiary rounded-full border-b-[1px] border-solid border-border-tetiary">
                {
                    encounterDetails?.checkinImageUrl ?
                    <div className="relative overflow-hidden rounded-full w-full h-full">
                        <Image
                            src={encounterDetails.checkinImageUrl}
                            alt="profile"
                            width={130}
                            height={130}
                        />
                    </div>
                    :
                    <FaUserCircle color={theme.colors.text.tetiary} size={130} />
                }
            </div>

            {/* Checkout Image */}
            <div className="absolute flex justify-center items-center right-[50px] bottom-[-40px] p-2 w-[110px] h-[110px] bg-bg-tetiary rounded-full border-b-[1px] border-solid border-border-tetiary">
                {
                    encounterDetails?.checkoutImageUrl ?
                    <div className="relative overflow-hidden rounded-full w-full h-full">
                        <Image
                            src={encounterDetails.checkoutImageUrl}
                            alt="profile"
                            width={100}
                            height={100}
                        />
                    </div>
                    :
                    <FaUserCircle color={theme.colors.text.tetiary} size={100} />
                }
            </div>

            {/* Status */}
            <div className="absolute right-0 top-0 w-full h-full flex justify-center items-center">
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