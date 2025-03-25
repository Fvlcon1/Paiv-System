import { INhisDetails } from "@/app/components/results table/utils/type"
import Button from "@components/button/button"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { getAgeFromDate } from "../utils/getAgeFromDate"
import { useEncounterContext } from "../context/encounter.context"
import { useEffect } from "react"
import { getTime, getRelativeTime } from "@/utils/getDate"
import { getLengthOfStay } from "../utils/getLengthOfStay"

const TopSection = () => {
    const {storedCapture, encounterDetails} = useEncounterContext()
    useEffect(()=>{
        console.log({encounterDetails})
    },[encounterDetails])
    const data = [
        [
            <div className="flex">
                <Text>
                    &nbsp;{encounterDetails?.gender} | {encounterDetails?.dob && getAgeFromDate(new Date(encounterDetails?.dob))} years | {encounterDetails?.maritalStatus}
                </Text>
            </div>,
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    Insurance Type:
                </Text>
                <Text>
                    &nbsp;{encounterDetails?.insuranceType}
                </Text>
            </div>
        ],
        [
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    Address:
                </Text>
                <Text>
                    &nbsp;{encounterDetails?.residentialAddress}
                </Text>
            </div>,
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    Ghana Card Number:
                </Text>
                <Text>
                    &nbsp;{encounterDetails?.ghanaCardNumber}
                </Text>
            </div>,
        ],
        [
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    NHIS Number:
                </Text>
                <Text>
                    &nbsp;{encounterDetails?.nhisId}
                </Text>
            </div>
        ],
        [
            <div className="flex gap-1">
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    Check in time:
                </Text>
                <Text>
                    {encounterDetails?.checkinTime ? `${(new Date(encounterDetails.checkinTime)).toDateString()} | ${getRelativeTime(encounterDetails.checkinTime)}` : '-'}
                </Text>
            </div>,
            <div className="flex gap-1">
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    Check in time:
                </Text>
                <Text>
                    {encounterDetails?.checkoutTime ? `${(new Date(encounterDetails.checkoutTime)).toDateString()} | ${getRelativeTime(encounterDetails.checkoutTime)}` : '-'}
                </Text>
            </div>
        ],
        [
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    Disposition:
                </Text>
                <Text>
                    &nbsp;{encounterDetails?.disposition ?? '-'}
                </Text>
            </div>,
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    Length of stay:
                </Text>
                <Text>
                    &nbsp;{
                        (encounterDetails?.checkinTime && encounterDetails?.checkoutTime)
                        ? getLengthOfStay(encounterDetails?.checkinTime, encounterDetails?.checkoutTime)
                        : '-'
                    }
                </Text>
            </div>
        ]
    ]

    return (
        <div className="flex gap-8 w-full items-center">
            <div className="relative h-[200px] w-[280px] flex justify-center">
                <div className="absolute flex justify-center items-center bottom-0 left-0 p-2 w-[140px] h-[140px] bg-[#24242F] rounded-full border-b-[1px] border-solid border-border-tetiary">
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
                <div className="absolute flex justify-center items-center right-0 top-0 p-2 w-[140px] h-[140px] bg-[#24242F] rounded-full border-b-[1px] border-solid border-border-tetiary">
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
                <div className="absolute flex justify-center items-center right-[50px] bottom-[-40px] p-2 w-[110px] h-[110px] bg-[#24242F] rounded-full border-b-[1px] border-solid border-border-tetiary">
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
                <div className="absolute right-0 top-0 w-full h-full flex justify-center items-center">
                    {
                        encounterDetails?.checkoutImageUrl &&
                        <div className="relative mt-[50px] ml-[10px] overflow-hidden rounded-full bg-[#898686d6] p-1">
                            <div className="relative overflow-hidden h-[30px] w-[30px] flex justify-center items-center rounded-full bg-[#24242fb7] p-1">
                                <RiVerifiedBadgeFill
                                    color="#60B956"
                                    size={30}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="flex gap-4 flex-1 justify-between items-end h-fit">
                <div className="flex gap-1 flex-col mt-[20px] w-full">
                    <Text
                        size={TypographySize.HL}
                        bold={TypographyBold.md}
                        textColor={theme.colors.text.primary}
                        className="pl-[20px]"
                    >
                        {`${encounterDetails?.firstname}${encounterDetails?.othernames ? ` ${encounterDetails?.othernames}` : ''} ${encounterDetails?.lastname}`}
                    </Text>
                    <div className="w-full flex flex-col gap-2">
                        <table className="w-full">
                            <tbody>
                                {
                                    data.map((item, index) => (
                                        <tr className={`${index % 2 === 0 ? 'bg-[#4f4f631d]' : ''}`} key={index}>
                                            <td className={`pl-[20px] py-[10px] rounded-l-lg`}>
                                                {
                                                    typeof item[0] === 'string' ?
                                                    <Text  
                                                        textColor={theme.colors.text.tetiary}
                                                        bold={TypographyBold.md}
                                                    >
                                                        {item[0]}
                                                    </Text>
                                                    :
                                                    item[0]
                                                }
                                            </td>
                                            <td className="rounded-r-lg">
                                                <div className="flex gap-6 items-center">
                                                    {
                                                        typeof item[1] === 'string' ?
                                                        <Text>
                                                            {item[1]}
                                                        </Text>
                                                        :
                                                        item[1]
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TopSection