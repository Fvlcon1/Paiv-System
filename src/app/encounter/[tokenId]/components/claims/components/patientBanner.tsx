import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import { useClaimsFormContext } from "../context/context"
import { useEncounterContext } from "../../../context/encounter.context"

const PatientBanner = () => {
    const {encounterDetails} = useEncounterContext()

    const getInitials = (text: string): string => {
        const words = text.trim().split(' ');
        const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
        return initials;
    }     

    return (
        <div className="flex gap-1 py-1 pl-1 pr-3 rounded-full w-fit bg-bg-quantinary items-center">
            <div className="rounded-full bg-green-700 flex h-[30px] w-[30px] justify-center items-center">
                <Text
                    bold={TypographyBold.md2}
                >
                    {getInitials(`${encounterDetails?.firstname} ${encounterDetails?.lastname}`)}
                </Text>
            </div>
            <Text
                bold={TypographyBold.md}
            >
                {`${encounterDetails?.firstname}${encounterDetails?.othernames ? ` ${encounterDetails?.othernames}` : ''} ${encounterDetails?.lastname}`}
            </Text>
        </div>
    )
}
export default PatientBanner