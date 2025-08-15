import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import useGetUserData from "../utils/useGetUserData"
import { useEncounterContext } from "../../../context/encounter.context"
import DualTable from "./dual-table"
import { gradientClass } from "@/utils/constants"

const Details = () => {
    const {encounterDetails} = useEncounterContext()
    const {data} = useGetUserData()
    
    return (
        <div className="flex gap-4 w-[600px] justify-between items-end h-fit">
            <div className="flex gap-2 flex-col w-full">

                {/* Full name */}
                <Text
                    size={TypographySize.HM}
                    bold={TypographyBold.md2}
                    textColor={theme.colors.text.secondary}
                    className={`${gradientClass} pl-[10px]`}
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