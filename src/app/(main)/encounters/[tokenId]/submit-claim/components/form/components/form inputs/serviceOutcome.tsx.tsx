import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useClaimsFormContext } from "../../../../context/context"
import useDropdownItems from "../../../../hooks/dropdownItems/useDropdownItems"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { AppTypographyProps, TypographyBold } from "@styles/style.types"
import { Radio } from "antd"
import Checkbox, { CheckboxGroupProps, CheckboxProps } from "antd/es/checkbox"
import { useEffect, useState } from "react"

export type IOptions = "Discharged" | "Died" | "Transfered out" | "Absconded"

const ServiceOutcome = () => {
    const {formik} = useClaimsFormContext()
    const {mainConditionItems} = useDropdownItems()
    const [selectedOption, setSelectedOption] = useState<IOptions>("Discharged")

    const isError = formik.touched.serviceOutcome && formik?.errors.serviceOutcome

    const handleOptionChange = (option : IOptions) => {
        setSelectedOption(option)
        formik.setFieldValue("serviceOutcome", option)
    }

    const getTextPropsOption = (option : IOptions) : AppTypographyProps => {
        const base : AppTypographyProps = {
            textColor : theme.colors.text.secondary
        }
        if(selectedOption === option)
            base.textColor = theme.colors.bg.primary
        return base
    }

    const options: CheckboxGroupProps<string>['options'] = [
        { label: <Text {...getTextPropsOption("Discharged")}>Discharged</Text>, value: 'Discharged' },
        { label: <Text {...getTextPropsOption("Died")}>Died</Text>, value: 'Died' },
        { label: <Text {...getTextPropsOption("Transfered out")}>Transfered out</Text>, value: 'Transfered out' },
        { label: <Text {...getTextPropsOption("Absconded")}>Absconded</Text>, value: 'Absconded' },
    ];

    // Set initial formik value
    useEffect(()=>{
        formik.setFieldValue("serviceOutcome", "Discharged")
    },[])

    return (
        <div className="w-full flex flex-col justify-between gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2}>
                    Service Outcome *
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Must perform verification on checkout
                </Text>
            </div>
            <Radio.Group
                block
                options={options}
                onChange={(e)=>handleOptionChange(e.target.value)}
                defaultValue="Discharged"
                optionType="button"
                buttonStyle="solid"
            />
            {
                isError &&
                <Text textColor="#db3e1f">
                    {formik.errors.serviceOutcome}
                </Text>
            }
        </div>
    )
}
export default ServiceOutcome