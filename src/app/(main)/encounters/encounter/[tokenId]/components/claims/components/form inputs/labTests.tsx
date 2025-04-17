'use client'

import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { useClaimsFormContext } from "../../context/context"
import useDropdownItems from "../../hooks/dropdownItems/useDropdownItems"
import Chip from "../chip/chip"
import { useState } from "react"
import { TypographyBold } from "@styles/style.types"

const LabTests = () => {
    const {formik, handleRemoveLabTest, labTestValue, setLabtestValue} = useClaimsFormContext()
    const {labTestItems} = useDropdownItems()
    const [patientSearchValue, setPatientSearchValue] = useState("")

    return (
        <div className="w-full flex flex-col justify-between gap-2">
            <div className="flex flex-col pl-1">
                <Text bold={TypographyBold.md2}>
                    Lab Tests
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select laboratory tests conducted during diagnosis.
                </Text>
            </div>
            <Dropdown 
                className="flex-1"
                outterContainerClassName="flex-1"
                menuItems={labTestItems}
            >
                <div className="flex flex-col gap-1">
                    <Input
                        value={labTestValue}
                        setValue={setLabtestValue}
                        placeholder="Select lab tests"
                        className={`!flex !flex-1 ${formik.touched.labTests && formik?.errors.labTests ? "!border-[#db3e1f]" : ""}`}
                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                    />
                    {
                        formik.touched.labTests && formik?.errors.labTests &&
                        <Text textColor="#db3e1f" className="!pl-2">
                            {formik?.errors.labTests}
                        </Text>
                    }
                </div>
            </Dropdown>
            <div className="flex gap-2 flex-wrap">
                {
                    formik?.values.labTests.map((test : any, index : number) => (
                        <Chip key={index} onClick={()=>handleRemoveLabTest(test)}>
                            <Text key={index}>
                                {test}
                            </Text>
                        </Chip>
                    ))
                }
            </div>
        </div>
    )
}
export default LabTests