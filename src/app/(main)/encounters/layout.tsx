'use client'
import { ReactNode } from "react";
import { EncounterProvider } from "./context/encounterContext";

const Layout = ({children} : {children : ReactNode}) => {
    return (
        <EncounterProvider>
            {children}
        </EncounterProvider>
    )
}
export default Layout