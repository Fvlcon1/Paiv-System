import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useClaimsFormContext } from "../../context/context"
import useDropdownItems from "../../hooks/dropdownItems/useDropdownItems"
import { FaChevronDown } from "react-icons/fa"
import Chip from "../chip/chip"
import { GiCaduceus } from "react-icons/gi"
import { TypographyBold } from "@styles/style.types"

const MedicalProcedures = () => {
    const {formik, handleRemoveMedicalProcedure, setMedicalProcedure, medicalProcedure} = useClaimsFormContext()
    const {medicalProcedureItems} = useDropdownItems()

    return (
        <div className="w-full flex flex-col justify-between gap-2">
            <div className="flex flex-col pl-1">
                <Text bold={TypographyBold.md2}>
                    Medical Procedures
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select any procedures performed during treatment (procedure codes).
                </Text>
            </div>
            <Dropdown 
                className="flex-1"
                outterContainerClassName="flex-1"
                menuItems={medicalProcedureItems}
            >
                <div className="flex flex-col gap-1">
                    <Input
                        value={medicalProcedure}
                        setValue={setMedicalProcedure}
                        placeholder="Select medical procedure"
                        className={`!flex !flex-1  ${formik.touched.medicalProcedures && formik?.errors.medicalProcedures ? "!border-[#db3e1f]" : ""}`}
                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                    />
                    {
                        formik.touched.medicalProcedures && formik?.errors.medicalProcedures &&
                        <Text textColor="#db3e1f" className="!pl-2">
                            {formik?.errors.medicalProcedures}
                        </Text>
                    }
                </div>
            </Dropdown>
            <div className="flex gap-2 flex-wrap">
                {
                    formik?.values.medicalProcedures.map((procedure : any, index : number) => (
                        <Chip key={index} onClick={()=>handleRemoveMedicalProcedure(procedure)}>
                            <Text key={index}>
                                {`${procedure.code} - (${procedure.service})`}
                            </Text>
                        </Chip>
                    ))
                }
            </div>
        </div>
    )
}
export default MedicalProcedures