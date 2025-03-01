'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useState } from "react"
import { MdEmail, MdMyLocation } from "react-icons/md"
import FormInput from "../../form input/formInput"
import PrivacyText from "./privacyText"
import { RiLockPasswordFill } from "react-icons/ri"
import { GiHospitalCross } from "react-icons/gi"
import { IoLocation, IoMap } from "react-icons/io5"
import Pressable from "@components/button/pressable"

const Form = ({
    loading,
    formik,
} : {
    formik : any,
    loading : boolean
}) => {
    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <FormInput 
                value={formik.values.hospitalName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                touched={formik.touched.hospitalName}
                error={formik.errors.hospitalName}
                PreIcon={<GiHospitalCross color={theme.colors.text.tetiary}/>}
                name="hospitalName"
                type="text"
                placeholder="Enter hospital name"
                label="Hospital Name"
            />

            <FormInput 
                value={formik.values.location}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                touched={formik.touched.location}
                error={formik.errors.location}
                PreIcon={<MdMyLocation color={theme.colors.text.tetiary}/>}
                PostIcon={
                    <Pressable>
                        <div className="py-[6px] px-2 rounded-md bg-bg-tetiary hover:bg-bg-quantinary cursor-pointer">
                            <IoMap size={15} color={theme.colors.text.tetiary}/>
                        </div>
                    </Pressable>
                }
                name="location"
                type="text"
                placeholder="Enter location"
                label="location"
            />

            <FormInput 
                value={formik.values.email}
                handleChange={formik.handleChange}
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
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                touched={formik.touched.password}
                error={formik.errors.password}
                PreIcon={<RiLockPasswordFill color={theme.colors.text.tetiary}/>}
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