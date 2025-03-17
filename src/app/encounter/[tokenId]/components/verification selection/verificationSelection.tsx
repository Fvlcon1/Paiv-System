'use client'

import { useContext, useState } from 'react';
import Overlay from '@components/overlay/overlay';
import { mainContext } from '@/app/context/context';
import Selection from './components/selection';
import FingerPrintError from './components/fingerPrintError';
import { useEncounterContext } from '../../context/encounter.context';

export type VerificationTypes = "fingerPrint" | "facialRecognition"
export type viewState = "selection" | "FingerPrintError" | null

const VerificationSelection = () => {
    const { setViewState } = useEncounterContext()
    const [selectedVerification, setSelectedVerification] = useState<VerificationTypes>("facialRecognition");
    const [selectionViewState, setSelectionViewState] = useState<viewState>("selection")

    const close = () => {
        setViewState(null)
        setSelectionViewState(null)
    }

    return (
        <Overlay 
            onClick={() => {
                setViewState(null)
                setSelectionViewState(null)
            }}
        >
            {
                selectionViewState === "selection" ?
                <Selection 
                    setSelectionViewState={setSelectionViewState}
                    close={close}
                />
                : selectionViewState === "FingerPrintError" ?
                <FingerPrintError 
                    setSelectionViewState={setSelectionViewState}
                    close={close}
                />
                :
                <></>
            }
        </Overlay>
    );
};

export default VerificationSelection;
