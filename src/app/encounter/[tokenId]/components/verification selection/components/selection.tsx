'use client'

import Button from '@components/button/button';
import Text from '@styles/components/text';
import theme from '@styles/theme';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { TbFaceId, TbShieldLockFilled } from 'react-icons/tb';
import toast from 'react-hot-toast';
import Overlay from '@components/overlay/overlay';
import Container from '@components/container/container';
import { mainContext } from '@/app/context/context';
import { ViewState } from '../../../utils/types';
import { MdVerifiedUser } from 'react-icons/md';
import { IoFingerPrint } from 'react-icons/io5';
import { VerificationTypes, viewState } from '../verificationSelection';
import { useEncounterContext } from '../../../context/encounter.context';

const Selection = ({
    setSelectionViewState,
    close
} : {
    setSelectionViewState: Dispatch<SetStateAction<viewState>>
    close: () => void
}) => {
    const { setViewState } = useEncounterContext()
    const [selectedVerification, setSelectedVerification] = useState<VerificationTypes>("facialRecognition");
    const [isVisible, setIsVisible] = useState(true);

    const handleOptionSelection = (type: VerificationTypes) => {
        setSelectedVerification(type);
    };

    const handleNext = () => {
        if (!selectedVerification) 
            return toast.error("Please select a verification method");
        if(selectedVerification === "fingerPrint")
            return setSelectionViewState("FingerPrintError")
        setViewState(ViewState.INSTRUCTIONS);
    };

    return (
        <Container onClose={close} className="w-[450px] !px-10 !py-6 !h-fit" display={isVisible} setDisplay={setIsVisible}>
            <div className="flex flex-col gap-4 items-center w-full">
                <div className="flex flex-col gap-0 items-center">
                    <MdVerifiedUser size={35} color={theme.colors.text.primary} className="pb-2" />
                    <Text fontfamily="greater-theory" textColor={theme.colors.text.primary}>
                        Select Verification Type
                    </Text>
                </div>

                <div className="w-full flex flex-col gap-2">
                    {/* Facial Recognition Option */}
                    <div
                        className={`w-full p-4 gap-4 flex items-center cursor-pointer duration-200 h-[100px] bg-bg-secondary border-[1px] border-solid ${
                            selectedVerification === "facialRecognition" ? "border-main-primary bg-[#6060d011]" : "hover:bg-bg-tetiary border-border-tetiary"
                        } rounded-xl`}
                        onClick={() => handleOptionSelection("facialRecognition")}
                    >
                        {selectedVerification === "facialRecognition" ? (
                            <FaCheckCircle size={20} color={theme.colors.main.primary} />
                        ) : (
                            <div className="rounded-full w-[20px] h-[20px] bg-bg-quantinary" />
                        )}
                        <div className="flex gap-2 flex-1 items-center">
                            <div className="flex flex-col flex-1 gap-[1px]">
                                <Text fontfamily="greater-theory">Facial Recognition</Text>
                                <Text>Verify your identity using facial recognition .</Text>
                            </div>
                            <TbFaceId size={40} color="#ffffff19" />
                        </div>
                    </div>

                    {/* Fingerprint Option */}
                    <div
                        className={`w-full p-4 gap-4 flex items-center cursor-pointer duration-200 h-[100px] bg-bg-secondary border-[1px] border-solid ${
                            selectedVerification === "fingerPrint" ? "border-main-primary bg-[#6060d011]" : "hover:bg-bg-tetiary border-border-tetiary"
                        } rounded-xl`}
                        onClick={() => handleOptionSelection("fingerPrint")}
                    >
                        {selectedVerification === "fingerPrint" ? (
                            <FaCheckCircle size={20} color={theme.colors.main.primary} />
                        ) : (
                            <div className="rounded-full w-[20px] h-[20px] bg-bg-quantinary" />
                        )}
                        <div className="flex gap-2 flex-1 items-center">
                            <div className="flex flex-col flex-1 gap-[1px]">
                                <Text fontfamily="greater-theory">Fingerprint</Text>
                                <Text>Authenticate using your fingerprint.</Text>
                            </div>
                            <IoFingerPrint size={40} color="#ffffff19" />
                        </div>
                    </div>
                </div>

                <Button text="Next" className="!w-full !bg-main-primary !h-[45px]" onClick={handleNext} />
            </div>
        </Container>
    )
}
export default Selection