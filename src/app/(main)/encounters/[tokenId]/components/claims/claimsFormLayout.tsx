import { ReactNode } from "react"
import { ClaimsContextProvider } from "./context/context"
import ClaimsForm from "./claimsForm"

const ClaimsFormLayout = ({
    close
} : {
    close : ()=>void
}) => {
    return (
        <ClaimsContextProvider>
            <ClaimsForm close={close}/>
        </ClaimsContextProvider>
    )
}
export default ClaimsFormLayout