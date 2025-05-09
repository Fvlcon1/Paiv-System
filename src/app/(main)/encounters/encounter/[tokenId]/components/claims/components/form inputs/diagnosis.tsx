import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useClaimsFormContext } from "../../context/context"
import useDropdownItems from "../../hooks/dropdownItems/useDropdownItems"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { TypographyBold } from "@styles/style.types"
import PrimaryChip from "../chip/primary-chip"
import SelectableChip from "../chip/selectable-chip"
import { useState } from "react"

const Diagnosis = () => {
    const {formik, handleRemoveDiagnosis, diagnosis, setDiagnosis, draft, updatePrimaryDiagnosis} = useClaimsFormContext()
    const [primaryDiagnosis, setPrimaryDiagnosis] = useState<string>("")
    const {mainConditionItems} = useDropdownItems()

    return (
        <div className="w-full flex flex-col justify-between gap-2">
            <div className="flex flex-col pl-1">
                <Text bold={TypographyBold.md2}>
                    Diagnosis *
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select the main condition diagnosed (ICD-10 code).
                </Text>
            </div>
            <Dropdown
                className="flex-1"
                outterContainerClassName="flex-1"
                menuItems={mainConditionItems}
            >
                <div className="flex flex-col gap-1">
                    <Input
                        value={diagnosis}
                        setValue={setDiagnosis}
                        placeholder="Select primary diagnosis"
                        className={`!flex !flex-1 !bg-bg ${formik.touched.diagnosis && formik?.errors.diagnosis ? "!border-[#db3e1f]" : ""}`}
                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                    />
                    {
                        formik.touched.diagnosis && formik?.errors.diagnosis &&
                        <Text textColor="#db3e1f" className="!pl-2">
                            {formik.errors.diagnosis}
                        </Text>
                    }
                </div>
            </Dropdown>
            <div className="flex gap-2 flex-wrap">
                {
                    formik?.values.diagnosis.map((diagnosis : any, index : number) => (
                        diagnosis.primary ?
                        <PrimaryChip 
                            key={index} 
                            onClick={()=>updatePrimaryDiagnosis(diagnosis)}
                            handleDelete={()=>handleRemoveDiagnosis(diagnosis)}
                        >
                            <Text key={index} textColor={theme.colors.bg.primary}>
                                {`${diagnosis.ICD10} (${diagnosis.description})`}
                            </Text>
                        </PrimaryChip> 
                        :
                        <SelectableChip 
                            key={index} 
                            onClick={()=>updatePrimaryDiagnosis(diagnosis)}
                            handleDelete={()=>handleRemoveDiagnosis(diagnosis)}
                        >
                            <Text key={index}>
                                {`${diagnosis.ICD10} (${diagnosis.description})`}
                            </Text>
                        </SelectableChip> 
                    ))
                }
            </div>
        </div>
    )
}
export default Diagnosis