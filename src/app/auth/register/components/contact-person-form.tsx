import Text from "@styles/components/text"
import theme from "@styles/theme"
import Input from "@components/input/input"
import Button from "@components/button/button"
import { useRegisterContext } from "../context/register-context"
import SlideIn from "@styles/components/slidein"

const ContactPersonForm = () => {
    const { step, setStep, contactPersonFormik, registerLoading } = useRegisterContext()
    
    return (
        <SlideIn direction="right" className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Text
                    bold={theme.text.bold.md}
                    size={theme.text.size.HM}
                >
                    Contact Person Information
                </Text>
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    Contact details of hospital representative
                </Text>
            </div>
            <div className="flex flex-col gap-1">
                <Text>Full Name *</Text>
                <Input
                    placeholder="Eg. Mawuli Pomary"
                    value={contactPersonFormik.values.contactPersonName}
                    onChange={(e) => contactPersonFormik.handleChange(e)}
                    onBlur={(e) => contactPersonFormik.handleBlur(e)}
                    name="contactPersonName"
                    className="shadow-xs"
                    borderColor={(contactPersonFormik.errors.contactPersonName && contactPersonFormik.touched.contactPersonName) && theme.colors.text.danger}
                />
                {
                    (contactPersonFormik.errors.contactPersonName && contactPersonFormik.touched.contactPersonName) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {contactPersonFormik.errors.contactPersonName}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Phone Number *</Text>
                <Input
                    placeholder="Eg. 0205538471"
                    value={contactPersonFormik.values.contactPersonPhone}
                    onChange={(e) => contactPersonFormik.handleChange(e)}
                    onBlur={(e) => contactPersonFormik.handleBlur(e)}
                    name="contactPersonPhone"
                    className="shadow-xs"
                    borderColor={(contactPersonFormik.errors.contactPersonPhone && contactPersonFormik.touched.contactPersonPhone) && theme.colors.text.danger}
                />
                {
                    (contactPersonFormik.errors.contactPersonPhone && contactPersonFormik.touched.contactPersonPhone) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {contactPersonFormik.errors.contactPersonPhone}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Email *</Text>
                <Input
                    placeholder="Eg. mawuli.pomary@gmail.com"
                    value={contactPersonFormik.values.contactPersonEmail}
                    onChange={(e) => contactPersonFormik.handleChange(e)}
                    onBlur={(e) => contactPersonFormik.handleBlur(e)}
                    name="contactPersonEmail"
                    className="shadow-xs"
                    borderColor={(contactPersonFormik.errors.contactPersonEmail && contactPersonFormik.touched.contactPersonEmail) && theme.colors.text.danger}
                />
                {
                    (contactPersonFormik.errors.contactPersonEmail && contactPersonFormik.touched.contactPersonEmail) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {contactPersonFormik.errors.contactPersonEmail}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Role *</Text>
                <Input
                    placeholder="Eg. Medical Officer"
                    value={contactPersonFormik.values.contactPersonRole}
                    onChange={(e) => contactPersonFormik.handleChange(e)}
                    onBlur={(e) => contactPersonFormik.handleBlur(e)}
                    name="contactPersonRole"
                    className="shadow-xs"
                    borderColor={(contactPersonFormik.errors.contactPersonRole && contactPersonFormik.touched.contactPersonRole) && theme.colors.text.danger}
                />
                {
                    (contactPersonFormik.errors.contactPersonRole && contactPersonFormik.touched.contactPersonRole) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {contactPersonFormik.errors.contactPersonRole}
                        </Text>
                    )
                }
            </div>
            <Button
                text="Next"
                onClick={contactPersonFormik.handleSubmit}
                loading={registerLoading}
                className="!w-full !h-[45px]"
            />
        </SlideIn>
    )
}

export default ContactPersonForm
