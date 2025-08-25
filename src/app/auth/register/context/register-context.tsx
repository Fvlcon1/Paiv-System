'use client'

import { createContext, useContext, useState } from "react";
import useRegister from "../hooks/use-register";

const RegisterContext = createContext<{
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    credentialFormik: any,
    contactPersonFormik: any,
    locationFormik: any,
    facilityInfoFormik: any,
    registerMutation: any,
    registerLoading: boolean,
    credentialUploadLoading: boolean,
    initRegisterLoading: boolean,
    authenticationFormik: any,
    passwordCriteria: any[],
    showForm: boolean
}>({
    step: 1,
    setStep: () => { },
    credentialFormik: null,
    contactPersonFormik: null,
    locationFormik: null,
    facilityInfoFormik: null,
    registerMutation: null,
    registerLoading: false,
    credentialUploadLoading: false,
    initRegisterLoading: false,
    authenticationFormik: null,
    passwordCriteria: [],
    showForm: false
})

const RegisterContextProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        step,
        setStep,
        credentialFormik,
        contactPersonFormik,
        locationFormik,
        facilityInfoFormik,
        registerMutation,
        registerLoading,
        credentialUploadLoading,
        initRegisterLoading,
        authenticationFormik,
        passwordCriteria,
        showForm
    } = useRegister()

    return (
        <RegisterContext.Provider
            value={{
                step,
                setStep,
                credentialFormik,
                contactPersonFormik,
                locationFormik,
                facilityInfoFormik,
                registerMutation,
                registerLoading,
                credentialUploadLoading,
                initRegisterLoading,
                authenticationFormik,
                passwordCriteria,
                showForm
            }}
        >
            {children}
        </RegisterContext.Provider>
    )
}

export const useRegisterContext = () => useContext(RegisterContext)

export default RegisterContextProvider
