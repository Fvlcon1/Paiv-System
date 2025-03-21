'use client'

import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react";
import { IEncounterDetails, ViewState } from "../utils/types";
import { IDispositionType, INhisDetails } from "@/app/components/results table/utils/type";
import React from "react";
import { DispositionViewState } from "@/app/utils/types";
import useGetEncounter from "../utils/useGetEncounter";
import { UseMutateFunction } from "@tanstack/react-query";

// Create the context with default values
const encounterContext = createContext<{
    setViewState: Dispatch<SetStateAction<ViewState | null>>
    viewState: ViewState | null
    setNhisDetails: React.Dispatch<React.SetStateAction<INhisDetails | undefined>>
    nhisDetails: INhisDetails | undefined
    setCaptureImageUrl: React.Dispatch<React.SetStateAction<string | null>>
    capturedImageUrl: string | null
    setDispositionViewState: React.Dispatch<React.SetStateAction<DispositionViewState | null>>
    dispositionViewState: DispositionViewState | null
    setSelectedDisposition: React.Dispatch<React.SetStateAction<IDispositionType | undefined>>
    selectedDisposition: IDispositionType | undefined
    setStoredCapture: Dispatch<SetStateAction<string | null>>
    storedCapture: string | null
    getEncounterMutation : UseMutateFunction<any, Error, void, unknown>
    encounterData: any
    getEncounterPending: boolean
    setEncounterDetails: Dispatch<SetStateAction<IEncounterDetails | undefined>>
    encounterDetails: IEncounterDetails | undefined
}>({
    viewState : null,
    setViewState : ()=>{},
    setNhisDetails : ()=>{},
    nhisDetails : undefined,
    setCaptureImageUrl : ()=>{},
    capturedImageUrl : null,
    setDispositionViewState : ()=>{},
    dispositionViewState : null,
    setSelectedDisposition : ()=>{},
    selectedDisposition : undefined,
    setStoredCapture : ()=>{},
    storedCapture : null,
    getEncounterMutation : ()=>{},
    encounterData : undefined,
    getEncounterPending : false,
    encounterDetails : undefined,
    setEncounterDetails : ()=>{}
});

// Context provider component
export const EncounterProvider = ({ children }: { children: ReactNode }) => {
  const [viewState, setViewState] = useState<ViewState | null>(null);
  const [nhisDetails, setNhisDetails] = useState<INhisDetails>()
  const [capturedImageUrl, setCaptureImageUrl] = useState<string | null>(null)
  const [storedCapture, setStoredCapture] = useState<string | null>(null)
  const [dispositionViewState, setDispositionViewState] = useState<DispositionViewState | null>(null);
  const [selectedDisposition, setSelectedDisposition] = useState<IDispositionType>()
  const {getEncounterMutation, getEncounterPending, encounterData, encounterDetails, setEncounterDetails} = useGetEncounter()

  return (
    <encounterContext.Provider
        value={{ 
            viewState, 
            setViewState,
            nhisDetails,
            setNhisDetails,
            capturedImageUrl,
            setCaptureImageUrl,
            dispositionViewState,
            setDispositionViewState,
            selectedDisposition,
            setSelectedDisposition,
            storedCapture,
            setStoredCapture,
            getEncounterMutation,
            getEncounterPending,
            encounterData,
            setEncounterDetails,
            encounterDetails
         }}
    >
      {children}
    </encounterContext.Provider>
  );
};

// Custom hook for easy access
export const useEncounterContext = () => useContext(encounterContext)
