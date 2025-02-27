import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { ReactNode } from "react"

const FormInput = ({
    value,
    handleBlur,
    handleChange,
    touched,
    error,
    autofocus,
    PreIcon,
    PostIcon,
    name,
    type,
    placeholder,
    label
} : {
    value : string,
    handleChange : ()=>void
    handleBlur : ()=>void
    error? : string
    touched? : boolean
    autofocus? : boolean
    PreIcon? : ReactNode
    PostIcon? : ReactNode
    name : string,
    type? : "number" | "text" | "password",
    placeholder? : string,
    label : string
}) => {
    return (
        <div className="flex flex-col gap-[6px] w-full">
            <Text
                textColor={theme.colors.text.primary} 
                className="pl-1"
            >
                {label}
            </Text>
            <Input
                PreIcon={PreIcon}
                PostIcon={PostIcon}
                type={type ?? 'text'}
                name={name}
                placeholder={placeholder}
                autofocus={autofocus}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${error && touched ? '!border-[#d44848]' : ''}`}
                inputClassName="!h-[25px]"
            />
            {
                error && touched && (
                    <Text
                        textColor='#d44848'
                    >
                        {error}
                    </Text>
                )
            }
        </div>
    )
}
export default FormInput