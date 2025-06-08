'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useFormik } from "formik"
import Image from "next/image"
import validationSchema from './utils/validationSchema'
import { useEffect, useState } from "react"
import Form from "./components/Form"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { message } from "antd"
import toast from "react-hot-toast"
import Logo from "@components/logo/logo"

interface SignupType {
    hospitalName: string,
    location: string,
    email: string
    password: string
    longitude: number
    latitude: number
    manual: boolean
}

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()

    const handleSubmit = async (values: SignupType) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            hospital_name: values.hospitalName,
            email: values.email,
            password: values.password,
            location: {
                place_name: values.manual ? undefined : values.location,
                // address: "string",
                coordinates: {
                    lat: values.latitude,
                    lng: values.longitude
                }
            }
        })
        return response.data
    }

    const handleSubmitMutation = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            toast.success("registration successful")
            router.push('/auth/login')
        },
        onError: (error) => {
            toast.error(error.message)
            console.error({ error });
        }
    })

    const { isError, isPending, error, mutate } = handleSubmitMutation

    const formik = useFormik({
        initialValues: {
            location: '',
            hospitalName: '',
            longitude: 0,
            latitude: 0,
            email: '',
            password: '',
            manual: false
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log({ values })
            mutate(values)
        }
    })

    return (
        <div className="w-full h-screen flex justify-center items-center mt-[-50px]">
            <div className="w-[380px] flex flex-col gap-3">
                {/* Title */}
                <div className="w-full flex flex-col items-center gap-1 justify-center">
                    <Logo />
                    <div className="flex flex-col items-center gap-0">
                        <Text
                            size={TypographySize.HM}
                            textColor={theme.colors.text.primary}
                            bold={TypographyBold.md}
                        >
                            Register
                        </Text>
                        <Text>Please register to continue</Text>
                    </div>
                </div>

                <Form
                    formik={formik}
                    loading={isPending}
                />
            </div>
            <div className="absolute bottom-[30px]">
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    © 2025 PAIV Hospital. All rights reserved. | Privacy Policy | Terms of Service
                </Text>
            </div>
        </div>
    )
}
export default Login