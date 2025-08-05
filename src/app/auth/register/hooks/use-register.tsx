'use client'

import { useFormik } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import { useEffect } from "react"

const useRegister = () => {
    const [step, setStep] = useState(1)

    const credentialValidationSchema = yup.object({
        credentialingDocument: yup.string().required("Credentialing document is required."),
        credentialId: yup.string().required("Credential id is required."),
        issueDate: yup.string().required("Issue date is required."),
        expiryDate: yup.string().required("Expiry date is required."),
    })
    const credentialFormik = useFormik({
        initialValues: {
            credentialingDocument: '',
            credentialId: '',
            issueDate: '',
            expiryDate: '',
        },
        validationSchema: credentialValidationSchema,
        onSubmit: async (values) => {
            console.log({values})
            setStep(prev => prev < 5 ? prev + 1 : prev)
        }
    })

    const contactPersonValidationSchema = yup.object({
        contactPersonName: yup.string().required("Contact person name is required."),
        contactPersonPhone: yup.string().required("Contact person phone is required."),
        contactPersonEmail: yup.string().required("Contact person email is required."),
        contactPersonRole: yup.string().required("Contact person role is required."),
    })
    const contactPersonFormik = useFormik({
        initialValues: {
            contactPersonName: '',
            contactPersonPhone: '',
            contactPersonEmail: '',
            contactPersonRole: '',
        },
        validationSchema: contactPersonValidationSchema,
        onSubmit: async (values) => {
            setStep(prev => prev < 5 ? prev + 1 : prev)
        }
    })

    const locationValidationSchema = yup.object({
        region: yup.string().required("Region is required."),
        district: yup.string().required("District is required."),
        coordinates: yup.string().optional(),
        physicalAddress: yup.string().required("Physical address is required."),
        digitalAddress: yup.string().required("Digital address is required."),
    })
    const locationFormik = useFormik({
        initialValues: {
            region: '',
            district: '',
            coordinates: '',
            physicalAddress: '',
            digitalAddress: '',
        },
        validationSchema: locationValidationSchema,
        onSubmit: async (values) => {
            setStep(prev => prev < 5 ? prev + 1 : prev)
        }
    })

    const facilityInfoValidationSchema = yup.object({
        providerName: yup.string().required("Provider name is required."),
        providerId: yup.string().required("Provider Id is required."),
        providerCategory: yup.string().required("Provider category is required."),
        prescribingLevel: yup.string().required("Prescribing level is required."),
    })
    const facilityInfoFormik = useFormik({
        initialValues: {
            providerName: '',
            providerId: '',
            providerCategory: '',
            prescribingLevel: '',
        },
        validationSchema: facilityInfoValidationSchema,
        onSubmit: async (values) => {
            setStep(prev => prev < 5 ? prev + 1 : prev)
        }
    })

    useEffect(() => {
        console.log({step})
    }, [step])

    return {
        credentialFormik,
        contactPersonFormik,
        locationFormik,
        facilityInfoFormik,
        step,
        setStep
    }
}
export default useRegister