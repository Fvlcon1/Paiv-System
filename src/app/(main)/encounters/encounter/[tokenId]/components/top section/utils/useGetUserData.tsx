import Text from "@styles/components/text"
import theme from "@styles/theme"
import { IEncounterDetails } from "../../../utils/types"
import { getAgeFromDate } from "../../../utils/getAgeFromDate"
import { getRelativeTime } from "@/utils/getDate"
import { getLengthOfStay } from "../../../utils/getLengthOfStay"
import { useEncounterContext } from "../../../context/encounter.context"

const useGetUserData = () => {
    const {encounterDetails} = useEncounterContext()

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

    return {data}
}

export default useGetUserData