import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { useClaimsFormContext } from "../../context/context"
import useDropdownItems from "../../hooks/dropdownItems/useDropdownItems"
import Button from "@components/button/button"
import Chip from "../chip/chip"

const Drugs = () => {
    const {formik, drugFormik, handleRemoveDrug} = useClaimsFormContext()
    const {drugItems} = useDropdownItems()

    const handleDrugSubmit = (e:any) => {
        e.preventDefault();
        drugFormik.handleSubmit();
    };

    return (
        <div className="w-full flex flex-col justify-between gap-2">
            <div className="flex flex-col pl-1">
                <Text>
                    Drugs
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select prescribed medications (generic name, strength, dosage).
                </Text>
            </div>
            <div className="flex gap-2 justify-between">
                <Dropdown
                    className="!w-full"
                    outterContainerClassName="!w-[70%]"
                    menuItems={drugItems}
                >
                    <div className="flex flex-col gap-1">
                        <Input
                            value={drugFormik?.values?.code}
                            onChange={drugFormik?.handleChange}
                            name="code"
                            placeholder="Select prescribed drugs"
                            className={`!flex !flex-1 ${drugFormik.touched.code && drugFormik?.errors?.code ? "!border-[#db3e1f]" : ""}`}
                            PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                            PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                        />
                        {
                            drugFormik.touched.code && drugFormik?.errors?.code &&
                            <Text textColor="#db3e1f" className="!pl-2">
                                {drugFormik?.errors.code}
                            </Text>
                        }
                    </div>
                </Dropdown>
                <div className="flex flex-col gap-1">
                    <Input
                        value={drugFormik?.values?.dosage}
                        onChange={drugFormik?.handleChange}
                        name="dosage"
                        placeholder="Dosage"
                    />
                    {
                        drugFormik.touched.dosage && drugFormik?.errors?.dosage &&
                        <Text textColor="#db3e1f">
                            {drugFormik?.errors?.dosage}
                        </Text>
                    }
                </div>
                <Button
                    text="+"
                    className="!w-fit !bg-green-700"
                    onClick={handleDrugSubmit}
                />
            </div>
            {
                formik.touched.drugs && formik?.errors?.drugs &&
                <Text textColor="#db3e1f" className="!pl-2">
                    {formik?.errors.drugs}
                </Text>
            }
            <div className="flex gap-2 flex-wrap">
                {
                    formik?.values?.drugs.map((drug : any, index : number) => (
                        <Chip key={index} onClick={()=>handleRemoveDrug((drug as any).code)}>
                            <Text key={index}>
                                {`${(drug as any).code} (Qty: ${(drug as any).dosage})`}
                            </Text>
                        </Chip>
                    ))
                }
            </div>
        </div>
    )
}
export default Drugs