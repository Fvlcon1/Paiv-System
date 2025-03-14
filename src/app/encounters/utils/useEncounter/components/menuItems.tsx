import { INhisDetails } from "@/app/components/results table/utils/type"
import { useAuth } from "@/app/context/authContext"
import { mainContext } from "@/app/context/context"
import { useEncounterContext } from "@/app/encounters/context/encounterContext"
import { DispositionViewState, ViewState } from "@/app/utils/types"
import { DropdownItem } from "@/utils/@types"
import theme from "@styles/theme"
import { useContext } from "react"
import { FaPowerOff } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"

const useDropdownItems = () => {
    const { setDispositionViewState, setViewState } = useContext(mainContext);
    const {setShowClaims} = useEncounterContext()

    const menuItems: DropdownItem[] = [
        { key: "1", label: "Close Encounter", onClick : () => {
            setDispositionViewState(DispositionViewState.NHIS_DETAILS);
        }},
        { key: "2", label: "Submit Claim", onClick : ()=>{
            setShowClaims(true)
        }},
        { type: "divider", key: "divider-1" },
        { key: "3", label: "More Details...", onClick : () => {
            setViewState(ViewState.NHIS_DETAILS)
        } },
    ]
    return {menuItems}
}
export default useDropdownItems
