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

interface SignupType {
    hospitalName : string,
    location : string,
    email : string
    password : string
}

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()

    const handleSubmit = async (values : SignupType) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
            hospital_name: values.hospitalName,
            email: values.email,
            password: values.password,
            location: {
                // place_name: "string",
                // address: "string",
                coordinates: {
                    lat: 0,
                    lng: 0
                }
            }
        })
        return response.data
    }

    const handleSubmitMutation = useMutation({
        mutationFn : handleSubmit,
        onSuccess : ()=>{
            alert("registration successful")
            router.push('/auth/login')
        },
        onError: (error) => {
            console.error({error});
        }
    })

    const {isError, isPending, error, mutate} = handleSubmitMutation

    const formik = useFormik({
        initialValues: {
            location : '',
            hospitalName : '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => mutate(values)
    })

    return (
        <div className="w-full h-screen flex justify-center items-center mt-[-50px]">
            <div className="w-[400px] flex flex-col gap-3">
                <div className="w-full flex flex-col items-center gap-1 justify-center">
                    <Image 
                        src={"/assets/prod/logo.png"}
                        alt="Fvlcon logo"
                        width={25}
                        height={25}
                    />
                    <Text
                        size={TypographySize.HM}
                        textColor={theme.colors.text.primary}
                        bold={TypographyBold.md}
                    >
                        Register
                    </Text>
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
                    © 2025 NHIS Visitor Management System. All rights reserved. | Privacy Policy | Terms of Service
                </Text>
            </div>
        </div>
    )
}
export default Login