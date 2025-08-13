import Button from "@components/button/button"
import theme from "@styles/theme"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import { IClaimsDetailType } from '../../../../recent table/components/claim-summary/utils/types';

const Actions = ({
    close, 
    onSubmit, 
    loading,
    expectedPayout
} : {
    close? :  () => void , 
    onSubmit? : () => void, 
    loading? : boolean,
    expectedPayout: number
}) => {
    return (
        <div className="bg-bg-tetiary border-solid border-t-[1px] justify-between border-border-secondary rounded-b-[20px] h-[55px] flex items-center pl-6">
            <ExpectedPayout expectedPayout={expectedPayout}/>
            <div className="flex gap-2 items-center h-full px-6">
                <Button
                    text="Cancel"
                    background={theme.colors.bg.primary}
                    color={theme.colors.main.primary}
                    className="border-[1px] border-border-primary"
                    onClick={close}
                />
                <Button 
                    text="Submit Claim"
                    className="!bg-main-primary !border-none"
                    onClick={onSubmit}
                    loading={loading}
                />
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
                GHS {expectedPayout}
            </Text>
        </div>
    )
}