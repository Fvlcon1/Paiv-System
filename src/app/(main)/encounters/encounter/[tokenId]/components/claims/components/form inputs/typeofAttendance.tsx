import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useClaimsFormContext } from "../../context/context"
import useDropdownItems from "../../hooks/dropdownItems/useDropdownItems"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { AppTypographyProps, TypographyBold } from "@styles/style.types"
import { Radio } from "antd"
import Checkbox, { CheckboxGroupProps, CheckboxProps } from "antd/es/checkbox"
import { useState } from "react"

export type IOptions = "Chronic Follow-up" | "Emergency/Acute Episode" | "Ante-natal" | "Post-natal"

const TypeofAttendance = () => {
    const {formik} = useClaimsFormContext()
    const {mainConditionItems} = useDropdownItems()
    const [selectedOption, setSelectedOption] = useState<IOptions>(formik.values.typeofAttendance as IOptions)

    const isError = formik.touched.typeofAttendance && formik?.errors.typeofAttendance

    const getTextPropsOption = (option : IOptions) : AppTypographyProps => {
        const base : AppTypographyProps = {
            textColor : theme.colors.text.secondary
        }
        if(selectedOption === option)
            base.textColor = theme.colors.bg.primary
        return base
    }

    const handleOptionChange = (option : IOptions) => {
        setSelectedOption(option)
        formik.setFieldValue("typeofAttendance", option)
    }

    const options: CheckboxGroupProps<string>['options'] = [
        { label: <Text {...getTextPropsOption("Chronic Follow-up")}>Chronic Follow-up</Text>, value: 'Chronic Follow-up' },
        { label: <Text {...getTextPropsOption("Emergency/Acute Episode")}>Emergency/Acute Episode</Text>, value: 'Emergency/Acute Episode' },
        { label: <Text {...getTextPropsOption("Ante-natal")}>Ante-natal</Text>, value: 'Ante-natal' },
        { label: <Text {...getTextPropsOption("Post-natal")}>Post-natal</Text>, value: 'Post-natal' },
    ];

    return (
        <div className="w-full flex flex-col justify-between gap-2">
            <div className="flex flex-col pl-1">
                <Text bold={TypographyBold.md2}>
                    Type of Attendance *
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select the type of attendance
                </Text>
            </div>
            <Radio.Group
                options={options}
                onChange={(e)=>handleOptionChange(e.target.value)}
                optionType="button"
                buttonStyle="solid"
                defaultValue={selectedOption}
            />
            {
                isError &&
                <Text textColor="#db3e1f">
                    {formik.errors.typeofAttendance}
                </Text>
            }
        </div>
    )
}
export default TypeofAttendance