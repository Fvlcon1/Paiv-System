import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import { RiVerifiedBadgeFill } from "react-icons/ri"

const Table = () => {
    const data = [
        ["Full Name", "Chris Ampeh"],
        ["Date of Birth", "11th January 1996"],
        ["Gender", "Male"],
        ["Marital Status", "Single"],
        ["NHIS Number", "2683102"],
        ["Inssurance Type", "Fee-Paying"],
        ["Issue Date", "09/12/2016"],
        ["Enrollment Status", "Active"],
        ["Current Expiry Date", "09/12/2026"],
        ["Phone Number", "0276483203"],
        ["Residential Address", "15 Ankobea Street, Kumasi"],
        ["Ghana Card Number", "GHA-692209778-4"],
    ]
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