import { mainContext } from "@/app/context/context"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import { useContext, useEffect, useState } from "react"
import { RiVerifiedBadgeFill } from "react-icons/ri"

const Table = () => {
    const {nhisDetails} = useContext(mainContext)
    const [data, setData] = useState<any[][]>([])

    useEffect(()=>{
        if(nhisDetails)
            setData([
                ["Full Name", `${nhisDetails.firstname}${nhisDetails.othernames ? ` ${nhisDetails.othernames}` : ''} ${nhisDetails.lastname}`],
                ["Date of Birth", nhisDetails.dob],
                ["Gender", nhisDetails.gender],
                ["Marital Status", "Single"],
                ["NHIS Number", nhisDetails.nhisId],
                ["Inssurance Type", nhisDetails.insuranceType],
                ["Issue Date", (new Date(nhisDetails.issueDate).toDateString())],
                ["Enrollment Status", nhisDetails.enrolementStatus],
                ["Current Expiry Date", (new Date(nhisDetails.expirtyDate).toDateString())],
                ["Phone Number", nhisDetails.phoneNumber],
                ["Residential Address", nhisDetails.residentialAddress],
                ["Ghana Card Number", nhisDetails.ghanaCardNumber],
            ])
    },[nhisDetails])
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
                                    <Text>
                                        {item[1]}
                                    </Text>
                                    {
                                        item[0] === "Current Expiry Date" &&
                                        <div className="flex gap-1 items-center">
                                            <RiVerifiedBadgeFill
                                                color="#4aad3d"
                                                size={15}
                                            />
                                            <Text
                                                textColor="#4aad3d"
                                                bold={TypographyBold.md}
                                            >
                                                Valid Card
                                            </Text>
                                        </div>
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