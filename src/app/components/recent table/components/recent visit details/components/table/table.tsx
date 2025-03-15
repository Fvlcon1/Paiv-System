import { IRecentVisitsTable } from "@/app/components/recent table/utils/type"
import { mainContext } from "@/app/context/context"
import { getRelativeTime, getTime } from "@/utils/getDate"
import Copychip from "@components/chip/copyChip"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import { useContext, useEffect, useState } from "react"
import { RiVerifiedBadgeFill } from "react-icons/ri"

const Table = ({
    recentVisit
} : {
    recentVisit : IRecentVisitsTable
}) => {
    const [data, setData] = useState<any[][]>([])

    useEffect(()=>{
        setData([
            ["Full Name", `${recentVisit.firstname}${recentVisit.othernames ? ` ${recentVisit.othernames}` : ''} ${recentVisit.lastname}`],
            ["Date of Birth", recentVisit.dob],
            ["Gender", recentVisit.gender],
            ["NHIS Number", recentVisit.nhisId],
            ["Last Visit Date", `${(new Date(recentVisit.lastVisitDate)).toDateString()}`],
            ["Last Visit Time", `${getTime(new Date(recentVisit.lastVisitDate))} | ${getRelativeTime(new Date(recentVisit.lastVisitDate))}`],
            ["Checkout Date", `${recentVisit.finalTime ? (new Date(recentVisit.finalTime)).toDateString() : '-'}`],
            ["Checkout Time", recentVisit.finalTime ? `${getTime(new Date(recentVisit.finalTime))} | ${getRelativeTime(new Date(recentVisit.finalTime))}` : '-'],
            ["Disposition", recentVisit.dispositionName ?? "-"],
            ["Token", recentVisit.token ? <Copychip containerClassName="bg-bg-quantinary">{recentVisit.token}</Copychip> : '-'],
            ["Verification Status", recentVisit.verificationStatus],
            ["Card Expiry Date", `${(new Date(recentVisit.cardExpiryDate)).toDateString()}`],
            ["Card Validity", recentVisit.cardValidity],
        ])
    },[recentVisit])
    return (
        <table className="w-full">
            <tbody>
                {
                    data.map((item, index) => (
                        <tr className={`${index % 2 === 1 ? 'bg-[#4f4f631d]' : ''}`} key={index}>
                            <td className="pl-[40px] py-2">
                                <Text  
                                    textColor={theme.colors.text.tetiary}
                                    bold={TypographyBold.md}
                                >
                                    {item[0]}
                                </Text>
                            </td>
                            <td>
                                <div className="flex gap-6 items-center">
                                    {
                                        typeof item[0] === 'string' ?
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
    )
}
export default Table