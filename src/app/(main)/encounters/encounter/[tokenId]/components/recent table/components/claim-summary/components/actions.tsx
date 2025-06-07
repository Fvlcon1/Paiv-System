import theme from "@styles/theme"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"

const Actions = ({
    expectedPayout
} : {
    expectedPayout: number
}) => {
    return (
        <div className="bg-bg-secondary border-solid border-t-[1px] justify-between border-border-secondary rounded-b-[20px] h-[55px] flex items-center pl-6">
            <ExpectedPayout expectedPayout={expectedPayout}/>
            <div className="flex gap-2 items-center h-full px-6">
                
            </div>
        </div>
    )
}
export default Actions

const ExpectedPayout = ({
    expectedPayout
} : {
    expectedPayout: number
}) => {
    return (
        <div className="flex gap-2 items-center">
            <Text
                textColor={theme.colors.text.tetiary}
            >
                Expected Payout:
            </Text>
            <Text
                bold={TypographyBold.md2}
            >
                GHS {expectedPayout ?? 0}
            </Text>
        </div>
    )
}