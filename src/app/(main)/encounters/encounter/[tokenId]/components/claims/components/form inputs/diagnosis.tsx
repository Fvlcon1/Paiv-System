import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useClaimsFormContext } from "../../context/context"
import useDropdownItems from "../../hooks/dropdownItems/useDropdownItems"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { TypographyBold } from "@styles/style.types"

const Diagnosis = () => {
    const {formik} = useClaimsFormContext()
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
                className="flex-1 !h-[300px]"
                outterContainerClassName="flex-1"
                menuItems={mainConditionItems}
            >
                <div className="flex flex-col gap-1">
                    <Input
                        value={formik?.values.diagnosis}
                        onChange={formik?.handleChange}
                        name="diagnosis"
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
        </div>
    )
}
export default Diagnosis