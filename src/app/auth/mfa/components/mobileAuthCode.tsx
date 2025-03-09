'use client'

import { useState, useRef, useEffect } from "react";
import Input from "@components/input/input";
import Text from "@styles/components/text";
import { TypographyBold, TypographySize } from "@styles/style.types";
import theme from "@styles/theme";
import Button from "@components/button/button";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import Pressable from "@components/button/pressable";
import { useMFAContext } from "../context/mfaContext";
import { MFAViewStates } from "../utils/types";

const MobileAuthCode = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timeLeft, setTimeLeft] = useState(60 * 5);
    const [canResend, setCanResend] = useState(false);
    const {setViewState} = useMFAContext()

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
        inputRefs.current[index] = el;
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        setTimeout(() => inputRefs.current[index]?.setSelectionRange(1, 1), 0);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }

        // Arrow key navigation
        if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        setTimeout(() => inputRefs.current[index]?.setSelectionRange(1, 1), 0);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d{6}$/.test(pastedData)) {
            setOtp(pastedData.split(""));
            inputRefs.current[5]?.focus();
        }
    };

    const isButtonEnabled = otp.every((digit) => digit !== "");

    return (
        <form className="flex flex-col gap-2 items-center mt-4">
            <Text bold={TypographyBold.md2}>Enter code provided by authenticator app</Text>
            <div className="flex gap-2 items-center">
                {otp.map((value, index) => (
                    <Input
                        key={index}
                        value={value}
                        className="!w-[50px] !h-[50px] !rounded-lg flex justify-center items-center text-center !p-0"
                        inputClassName="!text-[20px] text-center"
                        placeholder=""
                        autofocus={index === 0}
                        autoComplete="off"
                        name={`v${index + 1}`}
                        onChange={(e) => handleChange(index, e.target.value)}
                        inputProps={{ 
                            maxLength: 1,
                            onKeyDown: (e) => handleKeyDown(index, e),
                            onPaste: handlePaste,
                        }}
                        ref={setInputRef(index)}
                    />
                ))}
            </div>
        </form>
    );
};

export default MobileAuthCode