import { useState } from "react"
import { IRecentVisitsTable, IRecentVisits } from './type';
import Image from "next/image"
import { VscUnverified, VscVerified } from "react-icons/vsc"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import { getRelativeTime, getTime } from "@/utils/getDate"
import theme from "@styles/theme"
import { INhisDetails } from "@/app/(main)/components/main/components/results table/utils/type";

const useRecentVisits = () => {
    const [recentVisitsTableData, setRecentVisitsTableData] = useState<IRecentVisitsTable[]>([])
    
    const getNHISDetails = (data : any) => {
        const NHISDetails: INhisDetails = {
            firstname: data.first_name,
            othernames: data.middle_name,
            lastname: data.last_name,
            nhisId: data.nhis_number,
            lastVisit: `${(new Date(data.last_data)).toDateString()} | ${getTime(data.last_data)} | ${getRelativeTime(data.last_data)}`,
            gender: data.gender,
            dob: new Date(data.date_of_birth).toDateString(),
            maritalStatus: data.marital_status,
            imageUrl : data.profile_image_url,
            expirtyDate: data.current_expiry_date,
            enrolementStatus: data.enrolment_status,
            insuranceType: data.insurance_type,
            issueDate: data.issue_date,
            residentialAddress: data.residential_address,
            phoneNumber: data.phone_number,
            ghanaCardNumber: data.ghana_card_number,
            memberShipId: data.membership_id,
            token : data.token
        };
        return NHISDetails
    }

    const getRecentVisits = async (visits:any) => {
        const transformVisitTable: IRecentVisitsTable[] = visits.map((visit: any) => {
            const isExpired = new Date(visit.current_expiry_date) < new Date()
            const recentVisit : IRecentVisits = {
                firstname: visit.first_name,
                othernames: visit.middle_name,
                lastname: visit.last_name,
                nhisId: visit.nhis_number,
                lastVisitDate : (new Date(visit.verification_date)).toString(),
                gender : visit.gender,
                dob: (new Date(visit.date_of_birth)).toDateString(),
                imageUrl : visit.profile_image_url,
                cardExpiryDate : (new Date(visit.current_expiry_date)).toDateString(),
                verificationStatus : visit.verification_status,
                token : visit.token,
                finalTime : visit.final_time,
                dispositionName : visit.disposition_name
            }

            const NHISDetails: INhisDetails = getNHISDetails(visit)
            
            return {
                ...recentVisit,
                othernames : recentVisit.othernames ?? '-',
                verificationStatus : recentVisit.verificationStatus ? (
                    <Text textColor="#60B956">
                        Successful
                    </Text>
                ) : (
                    <Text textColor="#db4040">
                        Failed
                    </Text>
                ),
                lastVisit: (
                    <div className="flex flex-col gap-1">
                        <Text>
                            {`${(new Date(visit.verification_date)).toDateString()}`}
                        </Text>
                        <Text textColor={theme.colors.text.tetiary}>
                            {`${getTime(visit.verification_date)} | ${getRelativeTime(visit.verification_date)}`}
                        </Text>
                    </div>
                ),
                image: (
                    <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                        <Image
                            src={visit.profile_image_url ?? null}
                            alt="profile image"
                            width={50}
                            height={50}
                            style={{ height: "auto", width: "100%" }}
                        />
                    </div>
                ),
                cardValidity: (
                    <div className="flex gap-1 items-center mt-2">
                        {
                            isExpired ?
                            <VscUnverified color={"#db4040"} size={18} />
                            :
                            <VscVerified color={"#60B956"} size={18} />
                        }
                        <Text textColor={isExpired ? "#db4040" : "#60B956"} bold={TypographyBold.md}>
                            {isExpired ? "Expired" : "Valid"}
                        </Text>
                    </div>
                ),
            }
        })
        setRecentVisitsTableData(transformVisitTable)
    }

    return { getRecentVisits, recentVisitsTableData, getNHISDetails }
}

export default useRecentVisits
