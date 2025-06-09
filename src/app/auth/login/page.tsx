'use client'

import Input from "@components/input/input"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import { theme } from "@styles/theme"
import { useFormik } from "formik"
import Image from "next/image"
import validationSchema from './utils/validationSchema'
import { useState } from "react"
import Form from "./components/Form"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Cookies from "universal-cookie"
import { useAuth } from "@/app/context/authContext"
import { IoMdPulse } from "react-icons/io"
import Logo from "@components/logo/logo"
import Notice from "./components/notice"
import useGeoLocation from "../hooks/useGeoLocation"

interface LoginType {
    hospitalId: string,
    email: string,
    password: string,
}
const cookies = new Cookies()

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(true)
    const { setUserDetails } = useAuth()
    const { location, getLocation } = useGeoLocation()

    const router = useRouter()

    const handeleSubmit = async (values: LoginType) => {
        const {lat, lng} = await getLocation()
        console.log({ lat, lng })
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            hospital_id: values.hospitalId,
            email: values.email,
            password: values.password,
            location: {
                lat: lat,
                lng: lng
            }
        })
        return response.data
    }

    const handleSubmitMutation = useMutation({
        mutationFn: handeleSubmit,
        onSuccess: (data) => {
            const token = data.access_token || data.temp_token
            cookies.set("accessToken", token, { path: "/" })
            toast.success("Login successful")
            router.push("/auth/mfa")
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
            console.log({ error })
        }
    })

    const { mutate, error, isPending, isError } = handleSubmitMutation

    const formik = useFormik({
        initialValues: {
            hospitalId: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            mutate(values)
        }
    })

    return (
        <>
            <div className="absolute w-full h-[100vh] overflow-hidden">
                <Image
                    src="/assets/prod/doodle.svg"
                    alt="doodle"
                    width={2000}
                    height={2000}
                    className="absolute top-[-150px] right-[-150px] opacity-5 z-[-1]"
                />
            </div>
            
            <div className="w-full flex-col h-screen flex justify-center items-center">
                {/* Notice */}
                <Notice />

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
                                Welcome Back
                            </Text>
                            <Text>Please login to continue</Text>
                        </div>
                    </div>

                    {/* Form */}
                    <Form
                        formik={formik}
                        loading={isPending}
                        stayLoggedIn={stayLoggedIn}
                        setStayLoggedIn={setStayLoggedIn}
                    />
                </div>

                {/* Footer */}
                <div className="absolute bottom-[30px]">
                    <Text
                        textColor={theme.colors.text.tetiary}
                    >
                        © 2025 PAIV Hospital. All rights reserved. | Privacy Policy | Terms of Service
                    </Text>
                </div>
            </div>
        </>
    )
}
export default Login