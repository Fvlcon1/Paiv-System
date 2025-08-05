import { ReactNode } from "react"
import {VerificationContextProvider} from "./context/verification-context"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <VerificationContextProvider>
            {children}
        </VerificationContextProvider>
    )
}
export default Layout