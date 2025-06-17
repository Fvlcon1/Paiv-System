'use client'

import React, { ReactNode, useContext } from 'react'
import useIssues from '../hooks/useIssues'
import { Issue } from '../utils/types'

const IssuesContext = React.createContext<{
    selectedStatus: string,
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>,
    selectedPriority: string,
    setSelectedPriority: React.Dispatch<React.SetStateAction<string>>,
    selectedDateRange: string | null,
    setSelectedDateRange: React.Dispatch<React.SetStateAction<string | null>>,
    issues: Issue[],
    isIssuesLoading: boolean,
    isIssuesError: boolean,
    issuesError: any,
    refetchIssues: () => void,
    isIssuesRefetching: boolean,
}>({
    selectedStatus: "all",
    setSelectedStatus: () => {},
    selectedPriority: "all",
    setSelectedPriority: () => {},
    selectedDateRange: null,
    setSelectedDateRange: () => {},
    issues: [],
    isIssuesLoading: false,
    isIssuesError: false,
    issuesError: null,
    refetchIssues: () => {},
    isIssuesRefetching: false,
})

export const IssuesContextProvider = ({ children }: { children: ReactNode }) => {
    const { 
        selectedStatus,
        setSelectedStatus,
        selectedPriority,
        setSelectedPriority,
        selectedDateRange,
        setSelectedDateRange,
        issues,
        isIssuesLoading,
        isIssuesError,
        issuesError,
        refetchIssues,
        isIssuesRefetching
     } = useIssues()
    return (
        <IssuesContext.Provider value={{ 
            selectedStatus,
            setSelectedStatus,
            selectedPriority,
            setSelectedPriority,
            selectedDateRange,
            setSelectedDateRange,
            issues,
            isIssuesLoading,
            isIssuesError,
            issuesError,
            refetchIssues,
            isIssuesRefetching
         }}>
            {children}
        </IssuesContext.Provider>
    );
};

export const useIssuesContext = () => useContext(IssuesContext);
