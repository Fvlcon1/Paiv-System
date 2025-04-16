import theme from "@styles/theme"
import Button from "./button"
import { ButtonProps } from "@/utils/@types"

const OutlineButton = (props: ButtonProps) => {
    return (
        <Button 
            className="!bg-transparent border-[1px] border-border-primary hover:!bg-bg-secondary"
            color={theme.colors.main.primary}
            {...props}
        >
            {props.children}
        </Button>
    )
}

export default OutlineButton