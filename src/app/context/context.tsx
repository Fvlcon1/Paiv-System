'use client'
import { message } from 'antd';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Dispatch } from 'react';
import { DispositionViewState, ViewState } from '../utils/types';
import { IDispositionType, INhisDetails, IRearchResults } from '../(main)/components/main/components/results table/utils/type';

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
    setDispositionViewState: React.Dispatch<React.SetStateAction<DispositionViewState | null>>
    dispositionViewState: DispositionViewState | null
    setSelectedDisposition: React.Dispatch<React.SetStateAction<IDispositionType | undefined>>
    selectedDisposition: IDispositionType | undefined
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
    capturedImageUrl : null,
    setDispositionViewState : ()=>{},
    dispositionViewState : null,
    setSelectedDisposition : ()=>{},
    selectedDisposition : undefined
});

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
    const [searchMembersResult, setSearchMembersResult] = useState<IRearchResults[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [showNhisDetails, setShowNhisDetails] = useState(false)
    const [nhisDetails, setNhisDetails] = useState<INhisDetails>()
    const [viewState, setViewState] = useState<ViewState | null>(null);
    const [dispositionViewState, setDispositionViewState] = useState<DispositionViewState | null>(null);
    const [capturedImageUrl, setCaptureImageUrl] = useState<string | null>(null)
    const [selectedDisposition, setSelectedDisposition] = useState<IDispositionType>()
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
            capturedImageUrl,
            setDispositionViewState,
            dispositionViewState,
            setSelectedDisposition,
            selectedDisposition
         }}>
            {children}
        </mainContext.Provider>
    );
};

export const useMainContext = () => useContext(mainContext)