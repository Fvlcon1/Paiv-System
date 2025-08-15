import Text from "@styles/components/text"
import theme from "@styles/theme"
import { getAgeFromDate } from "../../../utils/getAgeFromDate"
import { getDateTime, getRelativeTime } from "@/utils/getDate"
import { getLengthOfStay } from "../../../utils/getLengthOfStay"
import { useEncounterContext } from "../../../context/encounter.context"

const useGetUserData = () => {
	const { encounterDetails } = useEncounterContext()

	const {
		gender,
		dob,
		maritalStatus,
		insuranceType,
		residentialAddress,
		ghanaCardNumber,
		nhisId,
		claimSubmissionAt,
		checkinTime,
		checkoutTime,
		disposition
	} = encounterDetails || {};

	const data = [
		[
			<div className="flex">
				<Text>
					&nbsp;{gender} | {dob && getAgeFromDate(new Date(dob))} years | {maritalStatus}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Insurance Type:
				</Text>
				<Text ellipsis>
					&nbsp;{insuranceType}
				</Text>
			</div>
		],
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Address:
				</Text>
				<Text ellipsis>
					&nbsp;{residentialAddress}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Ghana Card Number:
				</Text>
				<Text ellipsis>
					&nbsp;{ghanaCardNumber}
				</Text>
			</div>,
		],
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					NHIS Number:
				</Text>
				<Text ellipsis>
					&nbsp;{nhisId}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Claim submitted on:
				</Text>
				<Text ellipsis>
					&nbsp;{claimSubmissionAt ? getRelativeTime(claimSubmissionAt) : "-"}
				</Text>
			</div>
		],
		[
			<div className="flex gap-1">
				<Text textColor={theme.colors.text.tetiary}>
					Check in time:
				</Text>
				<Text ellipsis>
					{checkinTime ? getRelativeTime(checkinTime) : "-"}
				</Text>
			</div>,
			<div className="flex gap-1">
				<Text textColor={theme.colors.text.tetiary}>
					Check out time:
				</Text>
				<Text ellipsis>
					{checkoutTime ? getRelativeTime(checkoutTime) : "-"}
				</Text>
			</div>
		],
		[
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Disposition:
				</Text>
				<Text ellipsis>
					&nbsp;{disposition ?? '-'}
				</Text>
			</div>,
			<div className="flex">
				<Text textColor={theme.colors.text.tetiary}>
					Length of stay:
				</Text>
				<Text ellipsis>
					&nbsp;{
						(checkinTime && checkoutTime)
							? getLengthOfStay(checkinTime, checkoutTime)
							: '-'
					}
				</Text>
			</div>
		]
	];

	return { data }
}

export default useGetUserData