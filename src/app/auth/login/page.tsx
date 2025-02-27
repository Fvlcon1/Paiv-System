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

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(true)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
          try {
            setLoading(true)
          } catch (error : any) {
            console.log({error})
            setLoading(false)
          }
        }
    })

    const submitHandler = async () => {

    }

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
                    loading={loading}
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