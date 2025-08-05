import RegisterContextProvider  from "./context/register-context";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RegisterContextProvider>
            {children}
        </RegisterContextProvider>
    )
}
export default Layout