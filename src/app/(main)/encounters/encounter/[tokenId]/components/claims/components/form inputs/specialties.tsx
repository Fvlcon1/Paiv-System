import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useClaimsFormContext } from "../../context/context"
import useDropdownItems from "../../hooks/dropdownItems/useDropdownItems"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { TypographyBold } from "@styles/style.types"
import { Radio } from "antd"
import Checkbox, { CheckboxGroupProps, CheckboxProps } from "antd/es/checkbox"
import { useEffect, useState } from "react"

export type IOptions = 'ASUR' | 'DENT' | 'ENTH' | 'MEDI' | 'OBGY' | 'OPDC' | 'OPHT' | 'ORTH' | 'PAED' | 'PSUR' | 'RSUR';

const Specialties = () => {
    const {formik} = useClaimsFormContext()
    const {mainConditionItems} = useDropdownItems()
    const [selectedOption, setSelectedOption] = useState<IOptions[]>([])

    const isError = formik.touched.specialties && formik?.errors.specialties

    const handleOptionChange = (option : IOptions) => {
        setSelectedOption(prev => [...prev, option])
        formik.setFieldValue("typeofAttendance", option)
    }

    const options: CheckboxGroupProps<string>['options'] = [
        { label: <Text>ASUR</Text>, value: 'ASUR' },
        { label: <Text>DENT</Text>, value: 'DENT' },
        { label: <Text>ENTH</Text>, value: 'ENTH' },
        { label: <Text>MEDI</Text>, value: 'MEDI' },
        { label: <Text>OBGY</Text>, value: 'OBGY' },
        { label: <Text>OPDC</Text>, value: 'OPDC' },
        { label: <Text>OPHT</Text>, value: 'OPHT' },
        { label: <Text>ORTH</Text>, value: 'ORTH' },
        { label: <Text>PAED</Text>, value: 'PAED' },
        { label: <Text>PSUR</Text>, value: 'PSUR' },
        { label: <Text>RSUR</Text>, value: 'RSUR' },
    ];

    // Set initial formik value
    useEffect(()=>{
        formik.setFieldValue("specialties", ["OPDC"])
    },[])

    return (
        <div className="w-full flex flex-col justify-between gap-2">
            <div className="flex flex-col pl-1">
                <Text bold={TypographyBold.md2}>
                    Specialties Attended *
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select the Specialties Attended
                </Text>
            </div>
            <div className="pl-[3px]">
                <Radio.Group
                    options={options}
                    buttonStyle="solid"
                    defaultValue="OPDC"
                    onChange={({target})=>handleOptionChange(target.value)}
                />
            </div>
            {
                isError &&
                <Text textColor="#db3e1f">
                    {formik.errors.specialties}
                </Text>
            }
        </div>
    )
}
export default Specialties