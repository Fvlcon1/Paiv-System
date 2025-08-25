import Text from "@styles/components/text"
import theme from "@styles/theme"
import Input from "@components/input/input"
import Button from "@components/button/button"
import { useRegisterContext } from "../context/register-context"
import { useState } from "react"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa6"
import ClickableTab from "@components/clickable/clickabletab"
import SlideIn from "@styles/components/slidein"

const AuthenticationDetailsForm = () => {
    const { step, setStep, authenticationFormik, passwordCriteria, initRegisterLoading } = useRegisterContext()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <SlideIn direction="right" className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Text
                    bold={theme.text.bold.md}
                    size={theme.text.size.HM}
                >
                    Authentication Details
                </Text>
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    Provide your authentication details
                </Text>
            </div>
            <div className="flex flex-col gap-1">
                <Text>Organization Primary Email *</Text>
                <Input
                    placeholder="Eg. mawuli.pomary@gmail.com"
                    value={authenticationFormik.values.email}
                    onChange={(e) => authenticationFormik.handleChange(e)}
                    onBlur={(e) => authenticationFormik.handleBlur(e)}
                    name="email"
                    className="shadow-xs"
                    borderColor={(authenticationFormik.errors.email && authenticationFormik.touched.email) && theme.colors.text.danger}
                />
                {
                    (authenticationFormik.errors.email && authenticationFormik.touched.email) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {authenticationFormik.errors.email}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Password *</Text>
                <Input
                    placeholder="Eg. ********"
                    value={authenticationFormik.values.password}
                    onChange={(e) => authenticationFormik.handleChange(e)}
                    onBlur={(e) => authenticationFormik.handleBlur(e)}
                    name="password"
                    className="shadow-xs"
                    PostIcon={
                        <div className="cursor-pointer hover:opacity-60 duration-200" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye color={theme.colors.text.tetiary} /> : <FaEyeSlash color={theme.colors.text.tetiary} />}
                        </div>
                    }
                    borderColor={(authenticationFormik.errors.password && authenticationFormik.touched.password) && theme.colors.text.danger}
                    type={showPassword ? "text" : "password"}
                />
                {/* {
                    (authenticationFormik.errors.password && authenticationFormik.touched.password) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {authenticationFormik.errors.password}
                        </Text>
                    )
                } */}
                <div className="flex flex-col gap-2 mt-1">
                    {
                        passwordCriteria.map((criteria, index) => (
                            <Text
                                key={index}
                                className="pl-[1px]"
                                textColor={criteria.met ? theme.colors.text.success : theme.colors.text.tetiary}
                            >
                                {criteria.met ? "✓ " : "𒉽 "}{criteria.text}
                            </Text>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <Text>Confirm Password *</Text>
                <Input
                    placeholder="Eg. ********"
                    value={authenticationFormik.values.confirmPassword}
                    onChange={(e) => authenticationFormik.handleChange(e)}
                    onBlur={(e) => authenticationFormik.handleBlur(e)}
                    PostIcon={
                        <div className="cursor-pointer hover:opacity-60 duration-200" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEye color={theme.colors.text.tetiary} /> : <FaEyeSlash color={theme.colors.text.tetiary} />}
                        </div>
                    }
                    name="confirmPassword"
                    className="shadow-xs"
                    borderColor={(authenticationFormik.errors.confirmPassword && authenticationFormik.touched.confirmPassword) && theme.colors.text.danger}
                    type={showConfirmPassword ? "text" : "password"}
                />
                {
                    (authenticationFormik.errors.confirmPassword && authenticationFormik.touched.confirmPassword) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {authenticationFormik.errors.confirmPassword}
                        </Text>
                    )
                }
            </div>
            <Button
                text="Next"
                onClick={authenticationFormik.handleSubmit}
                loading={initRegisterLoading}
                className="!w-full !h-[45px]"
            />
        </SlideIn>
    )
}

export default AuthenticationDetailsForm
