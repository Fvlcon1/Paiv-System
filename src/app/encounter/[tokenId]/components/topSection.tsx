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

const TopSection = ({
    userDetails
} : {
    userDetails? : INhisDetails
}) => {
    console.log({userDetails})
    const {storedCapture} = useEncounterContext()
    const data = [
        [
            <div className="flex">
                <Text>
                    &nbsp;{userDetails?.gender} | {userDetails?.dob && getAgeFromDate(new Date(userDetails?.dob))} years | {userDetails?.maritalStatus}
                </Text>
            </div>,
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    Insurance Type:
                </Text>
                <Text>
                    &nbsp;{userDetails?.insuranceType}
                </Text>
            </div>
        ],
        [
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    Address:
                </Text>
                <Text>
                    &nbsp;{userDetails?.residentialAddress}
                </Text>
            </div>,
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    Ghana Card Number:
                </Text>
                <Text>
                    &nbsp;{userDetails?.ghanaCardNumber}
                </Text>
            </div>,
        ],
        [
            <div className="flex">
                <Text textColor={theme.colors.text.tetiary}>
                    NHIS Number:
                </Text>
                <Text>
                    &nbsp;{userDetails?.nhisId}
                </Text>
            </div>
        ],
    ]

    return (
        <div className="flex gap-8 w-full items-center">
            <div className="relative h-[200px] w-[280px] flex justify-center">
                <div className="absolute flex justify-center items-center bottom-0 left-0 p-2 w-[140px] h-[140px] bg-[#24242F] rounded-full border-b-[1px] border-solid border-border-tetiary">
                    {
                        userDetails?.imageUrl ?
                        <div className="relative overflow-hidden rounded-full w-full h-full">
                            <Image
                                src={userDetails.imageUrl}
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
                        storedCapture ?
                        <div className="relative overflow-hidden rounded-full w-full h-full">
                            <Image
                                src={storedCapture}
                                alt="profile"
                                width={130}
                                height={130}
                            />
                        </div>
                        :
                        <FaUserCircle color={theme.colors.text.tetiary} size={105} />
                    }
                </div>
                <div className="absolute right-0 top-0 w-full h-full flex justify-center items-center">
                    <div className="relative overflow-hidden rounded-full bg-[#ffffff1e] p-1">
                        <div className="relative overflow-hidden h-[30px] w-[30px] flex justify-center items-center rounded-full bg-[#24242fb7] p-1">
                            {
                                storedCapture ?
                                <RiVerifiedBadgeFill
                                    color="#60B956"
                                    size={30}
                                />
                                :
                                <Text>
                                    ?
                                </Text>
                            }
                        </div>
                    </div>
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
                        {`${userDetails?.firstname}${userDetails?.othernames ? ` ${userDetails?.othernames}` : ''} ${userDetails?.lastname}`}
                    </Text>
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
    )
}
export default TopSection