'use client'

import { useState, useRef, useEffect } from "react";
import Input from "@components/input/input";
import Text from "@styles/components/text";
import { TypographyBold, TypographySize } from "@styles/style.types";
import theme from "@styles/theme";
import Button from "@components/button/button";
import { motion } from "framer-motion";

const MFAForm = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timeLeft, setTimeLeft] = useState(60 * 5);
    const [canResend, setCanResend] = useState(false); // Disable resend initially

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true); // Enable resend when timer hits 0
        }
    }, [timeLeft]);

    const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
        inputRefs.current[index] = el;
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // Allow only numbers
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input if a digit is entered
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Ensure cursor is at the end of the input
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

        // Ensure cursor stays at the end when navigating
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

    const handleResendCode = () => {
        setTimeLeft(60 * 5); // Reset timer
        setCanResend(false); // Disable resend until timer ends
        console.log("Resend Code API Call"); // Simulate API call
    };

    const isButtonEnabled = otp.every((digit) => digit !== "");

    return (
        <motion.div
            className="w-full flex justify-center items-center h-screen"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form className="flex flex-col gap-4 items-center mt-[-50px]">
                <div className="flex flex-col gap-0 items-center">
                    <Text
                        fontfamily="greater-theory"
                        textColor={theme.colors.text.primary}
                        size={TypographySize.HM}
                    >
                        MFA
                    </Text>
                    <Text>A verification code has been sent to</Text>
                    <Text bold={TypographyBold.md2}>princenedjoh5@gmail.com</Text>
                </div>
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
                <Button text="Resend code" disabled={!canResend} onClick={handleResendCode} />
                <Text textColor={theme.colors.main.primary}>
                    Code will expire in 
                    <Text
                        bold={TypographyBold.md2}
                    >
                        &nbsp;{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                    </Text>
                </Text>
            </form>
        </motion.div>
    );
};

export default MFAForm;
