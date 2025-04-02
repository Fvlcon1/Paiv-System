'use client'

import { useContext, useState } from 'react';
import Overlay from '@components/overlay/overlay';
import { mainContext } from '@/app/context/context';
import Selection from './components/selection';
import FingerPrintError from './components/fingerPrintError';
import { useEncounterContext } from '../../context/encounter.context';
import { AnimatePresence } from 'framer-motion';
import PopupAnimation from '@components/popup/popupAnimation';

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
            onClick={close}
        >
            <AnimatePresence>
                {
                    selectionViewState === "selection" ?
                    <PopupAnimation key={1}>
                        <Selection 
                            setSelectionViewState={setSelectionViewState}
                            close={close}
                        />
                    </PopupAnimation>
                    : selectionViewState === "FingerPrintError" ?
                    <PopupAnimation key={2}>
                        <FingerPrintError 
                            setSelectionViewState={setSelectionViewState}
                            close={close}
                        />
                    </PopupAnimation>
                    :
                    <></>
                }
            </AnimatePresence>
        </Overlay>
    );
};

export default VerificationSelection;
