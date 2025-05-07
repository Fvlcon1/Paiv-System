import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useClaimsFormContext } from "../../context/context"
import useDropdownItems from "../../hooks/dropdownItems/useDropdownItems"
import { Radio } from "antd"
import Checkbox, { CheckboxGroupProps, CheckboxProps } from "antd/es/checkbox"
import { AppTypographyProps, TypographyBold } from "@styles/style.types"
import { useEffect, useState } from "react"
import Divider from "@components/divider/divider"

export type IOptions1 = "Outpatient" | "Inpatient" | "Diagnostic"
export type IOptions2 = "Unbandled" | "All-Inclusive"

const ServiceType = () => {
    const { formik } = useClaimsFormContext();
    const serviceType1 = formik.values.serviceType1 ?? "";
    const serviceType2 = formik.values.serviceType2 ?? "";
    const {mainConditionItems} = useDropdownItems()
    const [selectedOption1, setSelectedOption1] = useState<IOptions1>(serviceType1 as IOptions1)
    const [selectedOption2, setSelectedOption2] = useState<IOptions2>(serviceType2 as IOptions2)
    
    const isError = formik.touched.serviceType1 && formik?.errors.serviceType1
    const isServiceType2Error = formik.touched.serviceType2 && formik?.errors.serviceType2
    const isPharmacyError = formik.touched.pharmacy && formik?.errors.pharmacy

    const handleOption1Change = (option : IOptions1) => {
        setSelectedOption1(option)
        formik.setFieldValue("serviceType1", option)
    }

    const handleOption2Change = (option : IOptions2) => {
        setSelectedOption2(option)
        formik.setFieldValue("serviceType2", option)
    }

    const getTextPropsOption1 = (option : IOptions1) : AppTypographyProps => {
        const base : AppTypographyProps = {
            textColor : theme.colors.text.secondary
        }
        if(selectedOption1 === option)
            base.textColor = theme.colors.bg.primary
        return base
    }

    const getTextPropsOption2 = (option : IOptions2) : AppTypographyProps => {
        const base : AppTypographyProps = {
            textColor : theme.colors.text.secondary
        }
        if(selectedOption2 === option)
            base.textColor = theme.colors.bg.primary
        return base
    }

    const options: CheckboxGroupProps<string>['options'] = [
        { label: <Text {...getTextPropsOption1("Outpatient")}>Outpatient</Text>, value: 'Outpatient' },
        { label: <Text {...getTextPropsOption1("Inpatient")}>Inpatient</Text>, value: 'Inpatient' },
        { label: <Text {...getTextPropsOption1("Diagnostic")}>Diagnostic</Text>, value: 'Diagnostic' },
    ];

    const options2: CheckboxGroupProps<string>['options'] = [
        { label: <Text {...getTextPropsOption2("Unbandled")}>Unbandled</Text>, value: 'Unbandled' },
        { label: <Text {...getTextPropsOption2("All-Inclusive")}>All-Inclusive</Text>, value: 'All-Inclusive' },
    ];

    const handleCheckboxChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    // Set initial formik value
    useEffect(()=>{
        if(!formik.values.serviceType1) formik.setFieldValue("serviceType1", "Outpatient")
        if(!formik.values.serviceType2) formik.setFieldValue("serviceType2", "Unbandled")
    },[])

    return (
        <div className="w-full flex flex-col justify-between gap-2">
            <div className="flex flex-col pl-1">
                <Text bold={TypographyBold.md2}>
                    Service Type *
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select appropriate service type
                </Text>
            </div>
            <div className="w-full flex flex-col gap-6">
                <div className="w-full flex flex-col gap-2">
                    <Radio.Group
                        className="custom-radio"
                        options={options}
                        block
                        defaultValue={serviceType1}
                        onChange={(e)=>handleOption1Change(e.target.value)}
                        optionType="button"
                        buttonStyle="solid"
                    />
                    {
                        isError &&
                        <Text textColor="#db3e1f">
                            {formik.errors.serviceType1}
                        </Text>
                    }
                </div>
                
                <Divider />

                <div className="w-full flex flex-col gap-2">
                    <Radio.Group
                        className="custom-radio"
                        options={options2}
                        block
                        onChange={(e)=>handleOption2Change(e.target.value)}
                        defaultValue={serviceType2}
                        optionType="button"
                        buttonStyle="solid"
                    />
                    {
                        isServiceType2Error &&
                        <Text textColor="#db3e1f">
                            {formik.errors.serviceType2}
                        </Text>
                    }
                </div>
            </div>

            <Checkbox onChange={handleCheckboxChange}>
                <Text>Pharmacy</Text>
            </Checkbox>
            {
                isPharmacyError &&
                <Text textColor="#db3e1f">
                    {formik.errors.pharmacy}
                </Text>
            }

        </div>
    )
}

export default ServiceType
