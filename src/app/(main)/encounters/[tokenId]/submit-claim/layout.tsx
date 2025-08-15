import { ReactNode } from "react"
import { ClaimsContextProvider } from "./context/context"

const Layout = ({
    children
} : {
    children : ReactNode
}) => {
    return (
        <ClaimsContextProvider>
            {children}
        </ClaimsContextProvider>
    )
}
export default Layout