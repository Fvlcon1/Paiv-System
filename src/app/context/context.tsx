'use client'
import { message } from 'antd';
import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';
import { INhisDetails, IRearchResults } from '../components/results table/utils/type';

export const mainContext = createContext<{
    searchMembersResult : any[]
    setSearchMembersResult: React.Dispatch<React.SetStateAction<IRearchResults[]>>,
    showNhisDetails: boolean
    setShowNhisDetails: React.Dispatch<React.SetStateAction<boolean>>
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    setNhisDetails: React.Dispatch<React.SetStateAction<INhisDetails | undefined>>
    nhisDetails: INhisDetails | undefined
}>({
    searchMembersResult : [],
    setSearchMembersResult: ()=>{},
    showNhisDetails : false,
    setShowNhisDetails : ()=>{},
    searchValue : '',
    setSearchValue : ()=>{},
    nhisDetails : undefined,
    setNhisDetails : ()=>{}

});

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
    const [searchMembersResult, setSearchMembersResult] = useState<IRearchResults[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [showNhisDetails, setShowNhisDetails] = useState(false)
    const [nhisDetails, setNhisDetails] = useState<INhisDetails>()
    return (
        <mainContext.Provider value={{ 
            searchMembersResult,
            setSearchMembersResult,
            showNhisDetails,
            setShowNhisDetails,
            searchValue,
            setSearchValue,
            setNhisDetails,
            nhisDetails
         }}>
            {children}
        </mainContext.Provider>
    );
};
