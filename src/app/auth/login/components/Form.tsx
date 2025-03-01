'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useState } from "react"
import { MdEmail } from "react-icons/md"
import FormInput from "../../form input/formInput"
import PrivacyText from "./privacyText"
import StayLoggedIn from "./stayLoggedIn"
import { RiLockPasswordFill } from "react-icons/ri"

const Form = ({
    loading,
    formik,
    stayLoggedIn,
    setStayLoggedIn
} : {
    formik : any,
    loading : boolean
    stayLoggedIn : boolean
    setStayLoggedIn: Dispatch<SetStateAction<boolean>>
}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            <FormInput
                value={formik.values.email}
                handleChange={formik.handleChange}
                autofocus
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
            <div className="pl-1 text-main-primary w-fit cursor-pointer">
                <Text
                    textColor={theme.colors.main.primary}
                    clickableLink
                >
                    Forgot Password?
                </Text>
            </div>
            <Button
                text="Login"
                className="!w-full !h-[45px] !rounded-xl !bg-main-primary"
                loading={loading}
            />
            <PrivacyText />
            <StayLoggedIn 
                stayLoggedIn={stayLoggedIn}
                setStayLoggedIn={setStayLoggedIn}
            />
        </form>
    )
}
export default Form