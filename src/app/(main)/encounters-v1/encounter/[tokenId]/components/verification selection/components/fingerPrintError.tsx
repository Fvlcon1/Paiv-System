'use client'

import Container from "@components/container/container"
import { Dispatch, SetStateAction, useState } from "react";
import { viewState } from "../verificationSelection";
import Pressable from "@components/button/pressable";
import { IoIosArrowBack } from "react-icons/io";
import theme from "@styles/theme";
import Text from "@styles/components/text";
import { TbAlertSquareFilled } from "react-icons/tb";
import Button from "@components/button/button";
import { IoFingerPrint } from "react-icons/io5";

const FingerPrintError = ({
    setSelectionViewState,
    close
} : {
    setSelectionViewState: Dispatch<SetStateAction<viewState>>
    close: () => void
}) => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <Container className="!px-4 !py-6 !h-fit" close={close}>
            <Pressable
                className="w-full mb-[20px] flex items-center gap-1 hover:opacity-70 !cursor-pointer duration-200"
                scaleFactor={0.99}
                onClick={()=>setSelectionViewState("selection")}
            >
                <IoIosArrowBack
                    color={theme.colors.text.secondary}
                />
                <Text>
                    Back
                </Text>
            </Pressable>
            <div className="flex flex-col justify-center items-center text-center w-full px-4 max-w-[300px]">
                <IoFingerPrint
                    color={theme.colors.text.primary}
                    size={25}
                    className="mb-1"
                />
                <Text
                    fontfamily="greater-theory"
                    textColor={theme.colors.text.primary}
                >
                    Device not found
                </Text>
                <Text>
                    Biometric device not found, Please connect and try again!
                </Text>
                <Button
                    text="Cancel"
                    className="mt-2"
                    onClick={close}
                />
            </div>
        </Container>
    )
}
export default FingerPrintError