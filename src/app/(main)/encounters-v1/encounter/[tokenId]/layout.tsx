import { ReactNode } from "react"
import { EncounterProvider } from "./context/encounter.context"

const Layout = ({
    children
} : {
    children : ReactNode
}) => {
    return (
        <EncounterProvider>
            {children}
        </EncounterProvider>
    )
}
export default Layout