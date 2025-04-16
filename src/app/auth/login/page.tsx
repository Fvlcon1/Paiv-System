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

interface LoginType {
    hospitalId : string,
    email : string,
    password : string,
}
const cookies = new Cookies()

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(true)
    const {setUserDetails} = useAuth()

    const router = useRouter()

    const handeleSubmit = async (values : LoginType) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            hospital_id: values.hospitalId,
            email: values.email,
            password: values.password,
            coordinates: {
                lat: 0,
                lng: 0
            }
        })
        return response.data
    }

    const handleSubmitMutation = useMutation({
        mutationFn : handeleSubmit,
        onSuccess : (data)=>{
            const token =  data.access_token ||  data.temp_token
            cookies.set("accessToken", token, {path : "/"})
            setUserDetails({email : formik.values.email})
            toast.success("Login successful")
            router.push("/auth/mfa")
        },
        onError : (error : any)=>{
            toast.error(error.response.data.detail ?? "Error fetching members")
            console.log({error})
        }
    })

    const {mutate, error, isPending, isError} = handleSubmitMutation

    const formik = useFormik({
        initialValues: {
            hospitalId : '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            mutate(values)
        }
    })

    return (
        <div className="w-full h-screen flex justify-center items-center mt-[-50px]">
            <div className="w-[380px] flex flex-col gap-3">

                {/* Title */}
                <div className="w-full flex flex-col items-center gap-1 justify-center">
                    <IoMdPulse 
                        color={theme.colors.main.primary}
                        size={20}
                    />
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
                    © 2025 NHIS Visitor Management System. All rights reserved. | Privacy Policy | Terms of Service
                </Text>
            </div>
        </div>
    )
}
export default Login