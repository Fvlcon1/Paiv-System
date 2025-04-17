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
import { TypographyBold } from "@styles/style.types"

const Drugs = () => {
    const {formik, drugFormik, handleRemoveDrug} = useClaimsFormContext()
    const {drugItems} = useDropdownItems()

    const handleDrugSubmit = (e:any) => {
        e.preventDefault();
        drugFormik.handleSubmit();
    };

    return (
        <div className="w-full flex flex-col justify-between gap-2">

            {/* Head */}
            <div className="flex flex-col pl-1">
                <Text bold={TypographyBold.md2}>
                    Prescription *
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select prescribed medications (generic name, strength, dosage).
                </Text>
            </div>

            <div className="flex gap-2 justify-between flex-col">

                {/* Dropdown */}
                <Dropdown
                    className="!w-full"
                    outterContainerClassName="!w-full"
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

                {/* Dosages */}
                <div className="flex gap-2 w-full">
                    {/* <div className="flex flex-col gap-1 flex-1">
                        <Input
                            value={drugFormik?.values?.dosage}
                            onChange={drugFormik?.handleChange}
                            className={`${drugFormik.touched.dosage && drugFormik?.errors?.dosage ? "!border-[#db3e1f]" : ""}`}
                            name="dosage"
                            type="number"
                            PostIcon={(
                                <Text textColor={theme.colors.text.tetiary}>mg</Text>
                            )}
                            placeholder="Dosage"
                        />
                        {
                            drugFormik.touched.dosage && drugFormik?.errors?.dosage &&
                            <Text className="!pl-2" textColor="#db3e1f">
                                {drugFormik?.errors?.dosage}
                            </Text>
                        }
                    </div> */}
                    <div className="flex flex-col gap-1 flex-1">
                        <Input
                            value={drugFormik?.values?.frequency}
                            onChange={drugFormik?.handleChange}
                            className={`${drugFormik.touched.frequency && drugFormik?.errors?.frequency ? "!border-[#db3e1f]" : ""}`}
                            name="frequency"
                            type="number"
                            PostIcon={(
                                <Text textColor={theme.colors.text.tetiary}>hourly</Text>
                            )}
                            placeholder="Frequency"
                        />
                        {
                            drugFormik.touched.frequency && drugFormik?.errors?.frequency &&
                            <Text className="!pl-2" textColor="#db3e1f">
                                {drugFormik?.errors?.frequency}
                            </Text>
                        }
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <Input
                            value={drugFormik?.values?.duration}
                            onChange={drugFormik?.handleChange}
                            className={`${drugFormik.touched.duration && drugFormik?.errors?.duration ? "!border-[#db3e1f]" : ""}`}
                            name="duration"
                            type="number"
                            PostIcon={(
                                <Text textColor={theme.colors.text.tetiary}>day(s)</Text>
                            )}
                            placeholder="Duration"
                        />
                        {
                            drugFormik.touched.duration && drugFormik?.errors?.duration &&
                            <Text className="!pl-2" textColor="#db3e1f">
                                {drugFormik?.errors?.duration}
                            </Text>
                        }
                    </div>
                    
                    {/* Add Button */}
                    <Button
                        text="Add Drug +"
                        className="!w-fit !bg-main-primary"
                        onClick={handleDrugSubmit}
                    />
                </div>
            </div>

            {
                //Errors
                formik.touched.drugs && formik?.errors?.drugs &&
                <Text textColor="#db3e1f" className="!pl-2">
                    {formik?.errors.drugs}
                </Text>
            }

            {/* Chips */}
            <div className="flex gap-2 flex-wrap">
                {
                    formik?.values?.drugs.map((drug : any, index : number) => (
                        <Chip key={index} onClick={()=>handleRemoveDrug((drug as any).code)}>
                            <Text key={index}>
                                {`${drug.code} (${drug.frequency} hourly for ${drug.duration} day(s))`}
                            </Text>
                        </Chip>
                    ))
                }
            </div>
        </div>
    )
}
export default Drugs