'use client'

import { useFormik } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import { useEffect } from "react"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getWithExpiry, setWithExpiry } from "@/utils/storage"
import { getProviderId, storeProviderId, transformProviderData } from "../utils/helpers"
import { Provider } from "../utils/types"

const useRegister = () => {
    const [step, setStep] = useState(1)
    const [showForm, setShowForm] = useState(false)

    const autoFillForm = (providerData : Provider) => {
        credentialFormik.setFieldValue("credentialingDocument", providerData.credentialingDocument)
        credentialFormik.setFieldValue("credentialId", providerData.credentialId)
        credentialFormik.setFieldValue("issueDate", providerData.issueDate)
        credentialFormik.setFieldValue("expiryDate", providerData.expiryDate)

        contactPersonFormik.setFieldValue("contactPersonName", providerData.contactPersonName)
        contactPersonFormik.setFieldValue("contactPersonPhone", providerData.contactPersonPhone)
        contactPersonFormik.setFieldValue("contactPersonEmail", providerData.contactPersonEmail)
        contactPersonFormik.setFieldValue("contactPersonRole", providerData.contactPersonRole)

        locationFormik.setFieldValue("region", providerData.region)
        locationFormik.setFieldValue("district", providerData.district)
        locationFormik.setFieldValue("coordinates", providerData.gpsCoordinates)
        locationFormik.setFieldValue("physicalAddress", providerData.physicalAddress)
        locationFormik.setFieldValue("digitalAddress", providerData.digitalAddress)

        facilityInfoFormik.setFieldValue("providerName", providerData.facilityName)
        facilityInfoFormik.setFieldValue("providerId", providerData.facilityId)
        facilityInfoFormik.setFieldValue("providerCategory", providerData.facilityType)
        facilityInfoFormik.setFieldValue("prescribingLevel", providerData.prescribingLevel)
    }

    const getProviderDetails = async (id:string) => {
        const resopnse = await protectedApi.GET(`/v2/provider-profile/${id}`)
        const providerDetails = transformProviderData(resopnse)
        return providerDetails
    }

    const { mutateAsync: getProviderDetailsMutation, isPending: getProviderDetailsLoading } = useMutation({
        mutationFn: getProviderDetails,
        onError: (error) => {
            toast.error(error?.message)
            console.log({ error })
        }
    })

    const checkPendingUserSignup = async () => {
        const providerId = getProviderId()
        if (!providerId) return setShowForm(true)
        const providerDetails = await getProviderDetailsMutation(providerId)
        autoFillForm(providerDetails)
    }

    const { mutateAsync: checkPendingUserSignupMutation, isPending: checkPendingUserSignupLoading } = useMutation({
        mutationFn: checkPendingUserSignup,
        onSuccess: () => {
            
        },
        onError: (error) => {
            toast.error(error?.message)
            console.log({ error })
        }
    })

    useEffect(() => {
        checkPendingUserSignupMutation()
    }, [])

    const initRegister = async () => {
        const { email, password } = authenticationFormik.values
        const loginData = {
            org_email: email,
            password
        }

        const response = await protectedApi.POST("/v2/provider-profile/register", loginData)
        storeProviderId(response.id)

        console.log({ response })
        return response
    }

    const { mutateAsync: initRegisterMutation, isPending: initRegisterLoading } = useMutation({
        mutationFn: initRegister,
        onSuccess: () => {
            setStep(prev => prev < 5 ? prev + 1 : prev)
        },
        onError: (error : any) => {
            toast.error(error?.response?.data?.detail)
            console.log({ error })
        }
    })

    const updateProviderData = async () => {
        const { credentialingDocument, credentialId, issueDate, expiryDate } = credentialFormik.values
        const { contactPersonName, contactPersonPhone, contactPersonEmail, contactPersonRole } = contactPersonFormik.values
        const { region, district, coordinates, physicalAddress, digitalAddress } = locationFormik.values
        const { providerName, providerId, providerCategory, prescribingLevel } = facilityInfoFormik.values
        const id = getProviderId()

        const providerData = {
            id,
            credentialing_document: credentialingDocument.length ? credentialingDocument : undefined,
            credential_id: credentialId.length ? credentialId : undefined,
            issue_date: issueDate.length ? issueDate : undefined,
            expiry_date: expiryDate.length ? expiryDate : undefined,
            contact_person_name: contactPersonName.length ? contactPersonName : undefined,
            contact_person_phone: contactPersonPhone.length ? contactPersonPhone : undefined,
            contact_person_email: contactPersonEmail.length ? contactPersonEmail : undefined,
            contact_person_role: contactPersonRole.length ? contactPersonRole : undefined,
            region: region.length ? region : undefined,
            district: district.length ? district : undefined,
            gps_coordinates: coordinates.length ? coordinates : undefined,
            physical_address: physicalAddress.length ? physicalAddress : undefined,
            digital_address: digitalAddress.length ? digitalAddress : undefined,
            facility_name: providerName.length ? providerName : undefined,
            facility_id: providerId.length ? providerId : undefined,
            facility_type: providerCategory.length ? providerCategory : undefined,
            prescribing_level: prescribingLevel.length ? prescribingLevel : undefined,
            phone_number: undefined,
        }

        const response = await protectedApi.PUT("/v2/provider-profile/{provider_id}", { ...providerData })

        console.log({ response })
        return response
    }

    const { mutateAsync: registerMutation, isPending: registerLoading } = useMutation({
        mutationFn: updateProviderData,
        onSuccess: () => {
            setStep(prev => prev < 5 ? prev + 1 : prev)
        },
        onError: (error) => {
            toast.error(error?.message)
            console.log({ error })
        }
    })

    const authenticationValidationSchema = yup.object({
        email: yup.string().email("Invalid email").required("Email is required."),
        password: yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-])[A-Za-z\d!@#$%^&*(),.?":{}|<>\-]{8,}$/,
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
        ).required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "Passwords must match").required("Confirm Password is required"),
    })
    const authenticationFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: authenticationValidationSchema,
        onSubmit: async (values) => {
            initRegisterMutation()
        }
    })

    const hasMinLength = authenticationFormik.values.password.length >= 8;
    const hasUppercase = /[A-Z]/.test(authenticationFormik.values.password);
    const hasLowercase = /[a-z]/.test(authenticationFormik.values.password);
    const hasNumber = /[0-9]/.test(authenticationFormik.values.password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(authenticationFormik.values.password);

    const passwordCriteria = [
        { text: 'At least 8 characters', met: hasMinLength },
        { text: 'At least one uppercase letter', met: hasUppercase },
        { text: 'At least one lowercase letter', met: hasLowercase },
        { text: 'At least one number', met: hasNumber },
        { text: 'At least one special character eg. #,{,},&,%,$,!,(,),*,/,?,@, etc..', met: hasSpecialChar },
    ];

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
            registerMutation()
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
            registerMutation()
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
            registerMutation()
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
            registerMutation()
        }
    })

    useEffect(() => {
        console.log({ step })
    }, [step])

    return {
        credentialFormik,
        contactPersonFormik,
        locationFormik,
        facilityInfoFormik,
        registerMutation,
        registerLoading,
        initRegisterLoading,
        authenticationFormik,
        passwordCriteria,
        step,
        setStep,
        showForm,
    }
}
export default useRegister