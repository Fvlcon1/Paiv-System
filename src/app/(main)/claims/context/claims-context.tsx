'use client'

import { createContext, useContext, useEffect, useState } from "react"
import useClaims from "../hooks/use-claims"

const ClaimsContext = createContext<{
    isFilterVisible : boolean
    setIsFilterVisible : React.Dispatch<React.SetStateAction<boolean>>,
    showSubmitModal : boolean,
    setShowSubmitModal : React.Dispatch<React.SetStateAction<boolean>>,
    isBatchDetailsVisible : boolean,
    setIsBatchDetailsVisible : React.Dispatch<React.SetStateAction<boolean>>,
    selectedBatch : any,
    setSelectedBatch : React.Dispatch<React.SetStateAction<any>>,
    claimsData : any,
    fetchClaimsLoading : boolean
}>({
    isFilterVisible : false,
    setIsFilterVisible : () => {},
    showSubmitModal : false,
    setShowSubmitModal : () => {},
    isBatchDetailsVisible : false,
    setIsBatchDetailsVisible : () => {},
    selectedBatch : null,
    setSelectedBatch : () => {},
    claimsData : null,
    fetchClaimsLoading : false
})

const ClaimsProvider = ({children} : {children : React.ReactNode}) => {
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
    const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false)
    const [isBatchDetailsVisible, setIsBatchDetailsVisible] = useState<boolean>(false)
    const [selectedBatch, setSelectedBatch] = useState<any>(null)
    const {claimsData, fetchClaimsLoading} = useClaims()
    return (
        <ClaimsContext.Provider 
            value={{
                isFilterVisible,
                setIsFilterVisible,
                showSubmitModal,
                setShowSubmitModal,
                isBatchDetailsVisible,
                setIsBatchDetailsVisible,
                selectedBatch,
                setSelectedBatch,
                claimsData,
                fetchClaimsLoading
            }}
        >
            {children}
        </ClaimsContext.Provider>
    )
}

export const useClaimsContext = () => {
    return useContext(ClaimsContext)
}

export default ClaimsProvider