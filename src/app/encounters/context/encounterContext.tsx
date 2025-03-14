'use client'

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from "react";

const EncounterContext = createContext<{
    setShowClaims: Dispatch<SetStateAction<boolean>>
    showClaims: boolean
}>({
    showClaims : false,
    setShowClaims : ()=>{}
});

export const EncounterProvider = ({ children }: { children: ReactNode }) => {
    const [showClaims, setShowClaims] = useState(false)
    return (
        <EncounterContext.Provider
            value={{
                setShowClaims,
                showClaims
            }}
        >
            {children}
        </EncounterContext.Provider>
    );
};

export const useEncounterContext = () => useContext(EncounterContext);
