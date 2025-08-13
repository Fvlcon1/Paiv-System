'use client'

import { createContext, useContext, useEffect, useState } from "react"

const ClaimsContext = createContext<{
    isFilterVisible : boolean
    setIsFilterVisible : React.Dispatch<React.SetStateAction<boolean>>
}>({
    isFilterVisible : false,
    setIsFilterVisible : () => {}
})

const ClaimsProvider = ({children} : {children : React.ReactNode}) => {
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
    return (
        <ClaimsContext.Provider 
            value={{
                isFilterVisible,
                setIsFilterVisible
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