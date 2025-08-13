import ClaimsProvider from "./context/claims-context"

const Layout = ({children} : {children : React.ReactNode}) => {
    return (
        <ClaimsProvider>
            {children}
        </ClaimsProvider>
    )
}
export default Layout