import Controls from "@components/table/controls"
import Text from "@styles/components/text"
import { useState } from "react"
import { FaHistory } from "react-icons/fa"
import Buttons from "./buttons"
import ClaimsDetails from "./claim-details"

const Top = ({
    handleReload
} : {
    handleReload? : () => void
}) => {
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")
    const [isVisible, setIsVisible] = useState(false)
    
    return (
        <>
            <ClaimsDetails 
                isVisible={isVisible}
                close={() => setIsVisible(false)}
            />
            <div className="w-full flex gap-4 items-center">
                <Controls
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    view={view}
                    setView={setView}
                    handleReload={handleReload}
                />
                <div className="h-[20px] w-[1px] bg-border-primary" />
                <Buttons 
                    setShowSubmittedClaims={setIsVisible}
                />
            </div>
        </>
    )
}
export default Top