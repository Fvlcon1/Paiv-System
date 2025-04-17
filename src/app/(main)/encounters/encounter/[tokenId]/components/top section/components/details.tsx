import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import useGetUserData from "../utils/useGetUserData"
import { useEncounterContext } from "../../../context/encounter.context"

const Details = () => {
    const {encounterDetails} = useEncounterContext()
    const {data} = useGetUserData()
    
    return (
        <div className="flex gap-4 flex-1 justify-between items-end h-fit">
            <div className="flex gap-1 flex-col mt-[20px] w-full">

                {/* Full name */}
                <Text
                    size={TypographySize.HL}
                    bold={TypographyBold.md}
                    textColor={theme.colors.text.secondary}
                    className="pl-[20px]"
                    fontfamily="greater-theory"
                >
                    {`${encounterDetails?.firstname}${encounterDetails?.othernames ? ` ${encounterDetails?.othernames}` : ''} ${encounterDetails?.lastname}`}
                </Text>

                {/* Other Details */}
                <div className="w-full max-w-[800px] flex flex-col gap-2">
                    <table className="w-full">
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr className={`${index % 2 === 0 ? 'bg-bg-primary' : ''}`} key={index}>
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
export default Details