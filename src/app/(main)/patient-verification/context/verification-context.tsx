'use client'

import { createContext, useContext, ReactNode, Dispatch, SetStateAction } from "react"
import { INhisDetails } from "../../components/main/components/results table/utils/type"
import useSearchResults from "../hooks/use-search"

const VerificationContext = createContext<{
    searchMembersResult: INhisDetails[]
    isSearchPending: boolean
    isSearchError: boolean
    searchError: Error | null
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
}>({
    searchMembersResult: [],
    isSearchPending: false,
    isSearchError: false,
    searchError: null,
    searchValue: "",
    setSearchValue: () => { }
})

export const VerificationContextProvider = ({ children }: { children: ReactNode }) => {
    const {searchMembersResult, isSearchPending, isSearchError, searchError, searchValue, setSearchValue} = useSearchResults()
    return (
        <VerificationContext.Provider 
            value={{
                searchMembersResult,
                isSearchPending,
                isSearchError,
                searchError,
                searchValue,
                setSearchValue
            }}
        >
            {children}
        </VerificationContext.Provider>
    )
}

export const useVerificationContext = () => useContext(VerificationContext)