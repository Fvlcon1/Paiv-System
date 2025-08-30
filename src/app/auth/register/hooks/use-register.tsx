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
import axios from "axios"
import Cookies from "universal-cookie"
import { useSearchParams } from "next/navigation"
import { v4 as uuidv4 } from 'uuid';

const cookies = new Cookies()

const useRegister = () => {
    const [step, setStep] = useState(1)
    const [showForm, setShowForm] = useState(false)
    const params = useSearchParams();
    const incomplete = params.get("incomplete");

    const autoFillForm = (providerData: Provider) => {
        credentialFormik.setFieldValue("credentialingDocument", providerData.credentialingDocumentUrl ?? "")
        credentialFormik.setFieldValue("credentialId", providerData.credentialId ?? "")
        credentialFormik.setFieldValue("issueDate", providerData.issueDate ?? "")
        credentialFormik.setFieldValue("expiryDate", providerData.expiryDate ?? "")

        contactPersonFormik.setFieldValue("contactPersonName", providerData.contactPersonName ?? "")
        contactPersonFormik.setFieldValue("contactPersonPhone", providerData.contactPersonPhone ?? "")
        contactPersonFormik.setFieldValue("contactPersonEmail", providerData.contactPersonEmail ?? "")
        contactPersonFormik.setFieldValue("contactPersonRole", providerData.contactPersonRole ?? "")

        locationFormik.setFieldValue("region", providerData.region ?? "")
        locationFormik.setFieldValue("district", providerData.district ?? "")
        locationFormik.setFieldValue("coordinates", providerData.gpsCoordinates ?? "")
        locationFormik.setFieldValue("physicalAddress", providerData.physicalAddress ?? "")
        locationFormik.setFieldValue("digitalAddress", providerData.digitalAddress ?? "")

        facilityInfoFormik.setFieldValue("providerName", providerData.facilityName ?? "")
        facilityInfoFormik.setFieldValue("providerId", providerData.facilityId ?? "")
        facilityInfoFormik.setFieldValue("providerCategory", providerData.facilityType ?? "")
        facilityInfoFormik.setFieldValue("prescribingLevel", providerData.prescribingLevel ?? "")
    }

    const goToStep = (providerData: Provider) => {
        toast("Please complete registration");

        const requiredProviderFields = ["facilityName", "facilityType", "prescribingLevel"];
        const requiredCredentialFields = ["credentialingDocumentUrl", "credentialId", "issueDate", "expiryDate"];
        const requiredContactPersonFields = ["contactPersonName", "contactPersonPhone", "contactPersonEmail", "contactPersonRole"];
        const requiredLocationFields = ["region", "district", "physicalAddress", "digitalAddress"];

        console.log({ providerData })

        const incompleteProviderFields = requiredProviderFields.some(
            (field) => !providerData[field as keyof Provider]
        );
        const incompleteCredentialFields = requiredCredentialFields.some(
            (field) => !providerData[field as keyof Provider]
        );
        const incompleteContactPersonFields = requiredContactPersonFields.some(
            (field) => !providerData[field as keyof Provider]
        );
        const incompleteLocationFields = requiredLocationFields.some(
            (field) => !providerData[field as keyof Provider]
        );

        if (incompleteProviderFields) return setStep(2);
        if (incompleteLocationFields) return setStep(3);
        if (incompleteContactPersonFields) return setStep(4);
        if (incompleteCredentialFields) return setStep(5);

        setStep(6);
    };

    const getProviderDetails = async (id: string) => {
        const resopnse = await protectedApi.GET(`/v2/provider-profile/${id}`)
        const providerDetails = transformProviderData(resopnse)
        return providerDetails
    }

    const { mutateAsync: getProviderDetailsMutation, isPending: getProviderDetailsLoading } = useMutation({
        mutationFn: getProviderDetails,
        onError: (error) => {
            // toast.error(error?.message)
            console.log({ error })
        }
    })

    const checkPendingUserSignup = async () => {
        const providerId = getProviderId()
        if (!providerId) return setShowForm(true)
        const providerDetails = await getProviderDetailsMutation(providerId)
        autoFillForm(providerDetails)
        goToStep(providerDetails)
        setShowForm(true)
    }

    const { mutateAsync: checkPendingUserSignupMutation, isPending: checkPendingUserSignupLoading } = useMutation({
        mutationFn: checkPendingUserSignup,
        onSuccess: () => {

        },
        onError: (error) => {
            // toast.error(error?.message)
            console.log({ error })
        },
        onSettled: () => {
            setShowForm(true)
        }
    })

    useEffect(() => {
        if (incomplete) checkPendingUserSignupMutation()
        else setShowForm(true)
    }, [incomplete])

    const getUploadUrl = async (filename: string) => {
        const response = await protectedApi.POST("/v2/credentialing/upload-url", {}, { filename: `${filename}-${uuidv4()}.pdf` })
        console.log({ response })
        return response
    }

    const { mutateAsync: getUploadUrlMutation, isPending: getUploadUrlLoading } = useMutation({
        mutationFn: getUploadUrl,
        onSuccess: (response: any) => {
            return response
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.detail)
            console.log({ error })
        }
    })

    const initRegister = async () => {
        const { email, password } = authenticationFormik.values
        const loginData = {
            org_email: email,
            password
        }

        const response = await protectedApi.POST("/v2/provider-profile/register", loginData)
        const token = response.registration_token
        cookies.set("accessToken", token, { path: "/" })
        storeProviderId(response.id)

        console.log({ response })
        return response
    }

    const { mutateAsync: initRegisterMutation, isPending: initRegisterLoading } = useMutation({
        mutationFn: initRegister,
        onSuccess: () => {
            setStep(prev => prev < 5 ? prev + 1 : prev)
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.detail)
            console.log({ error })
        }
    })

    const updateProviderData = async () => {
        const { credentialingDocumentUrl, credentialId, issueDate, expiryDate } = credentialFormik.values
        const { contactPersonName, contactPersonPhone, contactPersonEmail, contactPersonRole } = contactPersonFormik.values
        const { region, district, coordinates, physicalAddress, digitalAddress } = locationFormik.values
        const { providerName, providerCategory, prescribingLevel } = facilityInfoFormik.values
        const id = getProviderId()

        const providerData = {
            id,
            credential_document_url: credentialingDocumentUrl?.length ? credentialingDocumentUrl : undefined,
            credential_id: credentialId?.length ? credentialId : undefined,
            issue_date: issueDate?.length ? issueDate : undefined,
            expiry_date: expiryDate?.length ? expiryDate : undefined,
            contact_person_name: contactPersonName?.length ? contactPersonName : undefined,
            phone_number: contactPersonPhone?.length ? contactPersonPhone : undefined,
            contact_person_email: contactPersonEmail?.length ? contactPersonEmail : undefined,
            contact_person_role: contactPersonRole?.length ? contactPersonRole : undefined,
            region: region?.length ? region : undefined,
            district: district?.length ? district : undefined,
            gps_coordinates: coordinates?.length ? coordinates : undefined,
            physical_address: physicalAddress?.length ? physicalAddress : undefined,
            digital_address: digitalAddress?.length ? digitalAddress : undefined,
            facility_name: providerName?.length ? providerName : undefined,
            // facility_id: providerId?.length ? providerId : undefined,
            facility_type: providerCategory?.length ? providerCategory : undefined,
            prescribing_level: prescribingLevel?.length ? prescribingLevel : undefined,
        }

        const response = await protectedApi.PATCH(`/v2/provider-profile/`, { ...providerData }, { id })

        console.log({ response })
        return response
    }

    const { mutateAsync: registerMutation, isPending: registerLoading } = useMutation({
        mutationFn: updateProviderData,
        onSuccess: () => {
            setStep(prev => prev < 6 ? prev + 1 : prev)
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

    const SUPPORTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"] as const;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const fileSchema = yup
        .mixed<File | string>()
        .required("Credentialing document is required")
        .test(
            "fileType",
            "Unsupported file format. Please upload a PDF, JPEG, or PNG",
            (value) => {
                if (!value) return false;
                if (typeof value === 'string') return true; // If it's already a URL/string
                return SUPPORTED_FILE_TYPES.includes(value.type as any);
            }
        )
        .test("fileSize", "File is too large (max 5MB)", (value) => {
            if (!value) return false;
            if (typeof value === 'string') return true; // If it's already a URL/string
            return value.size <= MAX_FILE_SIZE;
        })

    const credentialValidationSchema = yup.object({
        credentialingDocument: fileSchema,
        credentialingDocumentUrl: yup.string(),
        credentialId: yup.string().required("Credential id is required."),
        issueDate: yup.string().required("Issue date is required."),
        expiryDate: yup
            .string()
            .required("Expiry date is required.")
            .test(
                'is-after-issue-date',
                'Expiry date must be after issue date',
                function (value) {
                    const { issueDate } = this.parent;
                    if (!issueDate || !value) return true; // Let required validation handle empty fields
                    return new Date(value) > new Date(issueDate);
                }
            ),
    })
    const credentialFormik = useFormik({
        initialValues: {
            credentialingDocument: undefined,
            credentialingDocumentUrl: '',
            credentialId: '',
            issueDate: '',
            expiryDate: '',
        },
        validationSchema: credentialValidationSchema,
        onSubmit: async (values) => {
            uploadToS3Mutation()
        }
    })

    const uploadToS3 = async () => {
        if (!credentialFormik.values.credentialingDocument) {
            toast.error("Credentialing document is required.")
            return
        }
        const { upload_url: uploadUrl, file_url: fileUrl } = await getUploadUrlMutation(facilityInfoFormik.values.providerName)
        await axios.put(uploadUrl, credentialFormik.values.credentialingDocument, {
            headers: {
                "Content-Type": (credentialFormik.values.credentialingDocument as any)?.type
            }
        });
        credentialFormik.setFieldValue("credentialingDocumentUrl", fileUrl)
        return fileUrl
    }

    const { mutateAsync: uploadToS3Mutation, isPending: uploadToS3Loading } = useMutation({
        mutationFn: uploadToS3,
        onSuccess: () => {
            registerMutation()
        },
        onError: (error) => {
            toast.error(error?.message)
            console.log({ error })
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
        coordinates: yup.string().nullable().transform((value) => value === '' ? "" : value),
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
        // providerId: yup.string().required("Provider Id is required."),
        providerCategory: yup.string().required("Provider category is required."),
        prescribingLevel: yup.string().required("Prescribing level is required."),
    })
    const facilityInfoFormik = useFormik({
        initialValues: {
            providerName: '',
            // providerId: '',
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
        credentialUploadLoading: getUploadUrlLoading || uploadToS3Loading || registerLoading,
        initRegisterLoading,
        authenticationFormik,
        passwordCriteria,
        step,
        setStep,
        showForm,
    }
}
export default useRegister