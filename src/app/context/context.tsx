'use client'
import { message } from 'antd';
import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';
import { INhisDetails, IRearchResults } from '../components/results table/utils/type';
import { ViewState } from '../utils/types';

export const mainContext = createContext<{
    searchMembersResult : any[]
    setSearchMembersResult: React.Dispatch<React.SetStateAction<IRearchResults[]>>,
    showNhisDetails: boolean
    setShowNhisDetails: React.Dispatch<React.SetStateAction<boolean>>
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    setNhisDetails: React.Dispatch<React.SetStateAction<INhisDetails | undefined>>
    nhisDetails: INhisDetails | undefined
    setViewState: React.Dispatch<React.SetStateAction<ViewState | null>>
    viewState: ViewState | null
    setCaptureImageUrl: React.Dispatch<React.SetStateAction<string | null>>
    capturedImageUrl: string | null
}>({
    searchMembersResult : [],
    setSearchMembersResult: ()=>{},
    showNhisDetails : false,
    setShowNhisDetails : ()=>{},
    searchValue : '',
    setSearchValue : ()=>{},
    nhisDetails : undefined,
    setNhisDetails : ()=>{},
    setViewState : ()=>{},
    viewState : null,
    setCaptureImageUrl : ()=>{},
    capturedImageUrl : null
});

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
    const [searchMembersResult, setSearchMembersResult] = useState<IRearchResults[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [showNhisDetails, setShowNhisDetails] = useState(false)
    const [nhisDetails, setNhisDetails] = useState<INhisDetails>()
    const [viewState, setViewState] = useState<ViewState | null>(null);
    const [capturedImageUrl, setCaptureImageUrl] = useState<string | null>(null)
    return (
        <mainContext.Provider value={{ 
            searchMembersResult,
            setSearchMembersResult,
            showNhisDetails,
            setShowNhisDetails,
            searchValue,
            setSearchValue,
            setNhisDetails,
            nhisDetails,
            viewState,
            setViewState,
            setCaptureImageUrl,
            capturedImageUrl
         }}>
            {children}
        </mainContext.Provider>
    );
};
