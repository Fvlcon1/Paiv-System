'use client'

import { createContext, useContext, useState } from "react";
import useRegister from "../hooks/use-register";

const RegisterContext = createContext<{
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    credentialFormik: any,
    contactPersonFormik: any,
    locationFormik: any,
    facilityInfoFormik: any
}>({
    step: 1,
    setStep: () => { },
    credentialFormik: null,
    contactPersonFormik: null,
    locationFormik: null,
    facilityInfoFormik: null
})

const RegisterContextProvider = ({ children }: { children: React.ReactNode }) => {
    const {step, setStep, credentialFormik, contactPersonFormik, locationFormik, facilityInfoFormik} = useRegister()

    return (
        <RegisterContext.Provider
            value={{
                step,
                setStep,
                credentialFormik,
                contactPersonFormik,
                locationFormik,
                facilityInfoFormik
            }}
        >
            {children}
        </RegisterContext.Provider>
    )
}

export const useRegisterContext = () => useContext(RegisterContext)

export default RegisterContextProvider
