import Button from "@components/button/button"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { getAgeFromDate } from "../../utils/getAgeFromDate"
import { useEncounterContext } from "../../context/encounter.context"
import { useEffect } from "react"
import { getTime, getRelativeTime } from "@/utils/getDate"
import { getLengthOfStay } from "../../utils/getLengthOfStay"
import { GiCancel } from "react-icons/gi"
import Images from "./components/images"
import useGetUserData from "./hooks/useGetUserData"
import Details from "./components/details"

const TopSection = () => {

    return (
        <div className="flex gap-8 w-full items-center">

            {/* Images */}
            <Images />

            {/* Details */}
            <Details />
        </div>
    )
}
export default TopSection