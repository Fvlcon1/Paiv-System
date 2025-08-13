import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import useGetUserData from "../utils/useGetUserData"
import { useEncounterContext } from "../../../context/encounter.context"
import DualTable from "./dual-table"

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
                <DualTable data={data} />
            </div>
        </div>
    )
}
export default Details