'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useFormik } from "formik"
import Image from "next/image"
import validationSchema from './utils/validationSchema'
import { useState } from "react"
import Form from "./components/Form"

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname : '',
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
                    loading={loading}
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