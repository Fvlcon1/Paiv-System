import ClickableTab from "@components/clickable/clickabletab"
import Overlay from "@components/overlay/overlay"
import theme from "@styles/theme"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { IoMdCloseCircle } from "react-icons/io"

const Container = ({
    children,
    className,
    display = true,
    setDisplay,
    closable = true,
    close,
    onClose
} : {
    children? : ReactNode,
    className? : string
    display? : boolean,
    setDisplay? : Dispatch<SetStateAction<boolean>>
    closable? : boolean
    close? : ()=>void
    onClose? : ()=> void
}) => {
    const handleClose = () => {
        if(setDisplay) setDisplay(false)
        if(close) close()
        if(onClose) onClose()
    }

    return (
        display &&
        <div 
            className={`min-w-[300px] flex flex-col items-center relative rounded-[20px] border-[1px] border-solid border-border-tetiary bg-bg-primary ${className}`}
            style={{
                backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}                    
        >
            {
                closable &&
                <div className="absolute top-[10px] right-[10px]">
                    <ClickableTab 
                        className="!rounded-full hover:!bg-bg-tetiary"
                        onClick={handleClose}
                    >
                        <IoMdCloseCircle color={theme.colors.text.secondary} />
                    </ClickableTab>
                </div>
            }
            {children}
        </div>
    )
}
export default Container