'use client'

import Input from "@components/input/input"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useFormik } from "formik"
import Image from "next/image"
import { FaCheckSquare, FaEye, FaEyeSlash, FaRegCheckSquare, FaUser } from "react-icons/fa"
import validationSchema from './utils/validationSchema'
import { useState } from "react"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaCircleUser } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import Button from "@components/button/button"
import Pressable from "@components/button/pressable"
import Form from "./components/Form"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Cookies from "universal-cookie"

interface LoginType {
    hospitalId : string,
    email : string,
    password : string,
}
const cookies = new Cookies()

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(true)

    const router = useRouter()

    const handeleSubmit = async (values : LoginType) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
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
            cookies.set("accessToken", data.access_token)
            toast.success("Login successful")
            router.push("/")
        },
        onError : (error)=>{
            toast.error(error.message)
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
            <div className="w-[300px] flex flex-col gap-3">
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
                        Login
                    </Text>
                </div>
                <Form
                    formik={formik}
                    loading={isPending}
                    stayLoggedIn={stayLoggedIn}
                    setStayLoggedIn={setStayLoggedIn}
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