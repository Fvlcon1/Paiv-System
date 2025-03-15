'use client'

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from "react";

const EncounterContext = createContext<{
    setShowClaims: Dispatch<SetStateAction<boolean>>
    showClaims: boolean
    setShowEncounterDetails: Dispatch<SetStateAction<boolean>>
    showEncounterDetilas: boolean
}>({
    showClaims : false,
    setShowClaims : ()=>{},
    setShowEncounterDetails : ()=>{},
    showEncounterDetilas : false
});

export const EncounterProvider = ({ children }: { children: ReactNode }) => {
    const [showClaims, setShowClaims] = useState(false)
    const [showEncounterDetilas, setShowEncounterDetails] = useState(false)
    return (
        <EncounterContext.Provider
            value={{
                setShowClaims,
                showClaims,
                setShowEncounterDetails,
                showEncounterDetilas
            }}
        >
            {children}
        </EncounterContext.Provider>
    );
};

export const useEncounterContext = () => useContext(EncounterContext);
