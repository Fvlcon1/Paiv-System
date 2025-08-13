'use client'

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from "react";

const EncounterContext = createContext<{
    setShowEncounterDetails: Dispatch<SetStateAction<boolean>>
    showEncounterDetilas: boolean
    setIsFilterVisible: Dispatch<SetStateAction<boolean>>
    isFilterVisible: boolean
}>({
    setShowEncounterDetails : ()=>{},
    showEncounterDetilas : false,
    setIsFilterVisible : ()=>{},
    isFilterVisible : false
});

export const EncounterProvider = ({ children }: { children: ReactNode }) => {
    const [showEncounterDetilas, setShowEncounterDetails] = useState(false)
    const [isFilterVisible, setIsFilterVisible] = useState(false)
    return (
        <EncounterContext.Provider
            value={{
                setShowEncounterDetails,
                showEncounterDetilas,
                setIsFilterVisible,
                isFilterVisible
            }}
        >
            {children}
        </EncounterContext.Provider>
    );
};

export const useEncounterContext = () => useContext(EncounterContext);
