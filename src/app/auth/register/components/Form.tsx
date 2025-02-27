'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useState } from "react"
import { MdEmail } from "react-icons/md"
import FormInput from "../../form input/formInput"
import PrivacyText from "./privacyText"

const Form = ({
    loading,
    formik,
} : {
    formik : any,
    loading : boolean
}) => {
    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <div className="w-full gap-2 flex">
                <FormInput 
                    value={formik.values.firstname}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    touched={formik.touched.firstname}
                    error={formik.errors.firstname}
                    autofocus
                    PreIcon={<MdEmail color={theme.colors.text.tetiary}/>}
                    name="firstname"
                    type="text"
                    placeholder="Eg: John"
                    label="First Name"
                />
            
                <FormInput 
                    value={formik.values.lastname}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    touched={formik.touched.lastname}
                    error={formik.errors.lastname}
                    PreIcon={<MdEmail color={theme.colors.text.tetiary}/>}
                    name="lastname"
                    type="text"
                    placeholder="Eg: Doe"
                    label="Last Name"
                />
            </div>
            <FormInput 
                value={formik.values.email}
                handleChange={formik.email}
                handleBlur={formik.handleBlur}
                touched={formik.touched.email}
                error={formik.errors.email}
                PreIcon={<MdEmail color={theme.colors.text.tetiary}/>}
                name="email"
                type="text"
                placeholder="Eg: johndoe@paiv.com"
                label="Email"
            />

            <FormInput 
                value={formik.values.password}
                handleChange={formik.password}
                handleBlur={formik.handleBlur}
                touched={formik.touched.password}
                error={formik.errors.password}
                PreIcon={<MdEmail color={theme.colors.text.tetiary}/>}
                name="password"
                type="password"
                placeholder="Enter password"
                label="Password"
            />
            <Button
                text="Register"
                className="!w-full !h-[45px] !rounded-xl !bg-main-primary"
                loading={loading}
            />
            <PrivacyText />
        </form>
    )
}
export default Form