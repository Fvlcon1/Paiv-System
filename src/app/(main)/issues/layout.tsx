import { IssuesContextProvider } from "./context/context"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <IssuesContextProvider>
            {children}
        </IssuesContextProvider>
    )
}

export default Layout