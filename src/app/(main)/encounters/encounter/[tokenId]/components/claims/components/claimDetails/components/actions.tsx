import Button from "@components/button/button"
import theme from "@styles/theme"

const Actions = ({
    close, 
    onSubmit, 
    loading
} : {
    close? :  () => void , 
    onSubmit? : () => void, 
    loading? : boolean
}) => {
    return (
        <div className="bg-bg-tetiary border-solid border-t-[1px] border-border-secondary rounded-b-[20px] h-[55px] flex items-center pl-6">
            <div className="w-full flex justify-end gap-2 items-center h-full px-6">
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