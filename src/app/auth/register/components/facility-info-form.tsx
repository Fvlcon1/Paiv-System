import Text from "@styles/components/text"
import theme from "@styles/theme"
import Input from "@components/input/input"
import Button from "@components/button/button"
import { useRegisterContext } from "../context/register-context"
import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import { FaChevronDown } from "react-icons/fa6"
import { useEffect } from "react"

const FacilityInfoForm = () => {
    const { step, setStep, facilityInfoFormik } = useRegisterContext()
    const facilityType = facilityInfoFormik.values.facilityType
    const prescribingLevel = facilityInfoFormik.values.prescribingLevel

    const facilityTypeOptions: DropdownItem[] = [
        { key: "Tertiary care hospital", label: "Tertiary care hospital", value: "Tertiary care hospital", isSelected: facilityType === "Tertiary care hospital" },
        { key: "Secondary care hospital", label: "Secondary care hospital", value: "Secondary care hospital", isSelected: facilityType === "Secondary care hospital" },
        { key: "Primary care hospital", label: "Primary care hospital", value: "Primary care hospital", isSelected: facilityType === "Primary care hospital" },
        { key: "Health centers", label: "Health centers (Public, Private, CHAG)", value: "Health centers (Public, Private, CHAG)", isSelected: facilityType === "Health centers (Public, Private, CHAG)" },
        { key: "Maternity homes", label: "Maternity homes", value: "Maternity homes", isSelected: facilityType === "Maternity homes" },
        { key: "Private clinics", label: "Private clinics", value: "Private clinics", isSelected: facilityType === "Private clinics" },
        { key: "Dental clinics", label: "Dental clinics", value: "Dental clinics", isSelected: facilityType === "Dental clinics" },
        { key: "Eye centers", label: "Eye centers", value: "Eye centers", isSelected: facilityType === "Eye centers" },
        { key: "Diagnostic centers", label: "Diagnostic centers", value: "Diagnostic centers", isSelected: facilityType === "Diagnostic centers" },
        { key: "CHPS Compounds", label: "CHPS Compounds", value: "CHPS Compounds", isSelected: facilityType === "CHPS Compounds" },
    ]

    const prescribingLevels: DropdownItem[] = [
        { key: "A", label: "Level A (CHIPS Compounds)", value: "A", isSelected: prescribingLevel === "A" },
        { key: "B1", label: "Level B1 (Healthe centers without a doctor)", value: "B1", isSelected: prescribingLevel === "B1" },
        { key: "B2", label: "Level B2 (Healthe centers with a doctor)", value: "B2", isSelected: prescribingLevel === "B2" },
        { key: "C", label: "Level C (District Hospitals - Primary Hospitals)", value: "C", isSelected: prescribingLevel === "C" },
        { key: "D", label: "Level D (Regional and tertiary hospitals)", value: "D", isSelected: prescribingLevel === "D" },
        { key: "M", label: "Level M (Midwifery Practice)", value: "M", isSelected: prescribingLevel === "M" },
        { key: "V", label: "Level V (Diagnostic/Dispensing-only Facilities)", value: "V", isSelected: prescribingLevel === "V" },
    ]

    const handleContinue = () => {
        facilityInfoFormik.handleSubmit()
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Text
                    bold={theme.text.bold.md}
                    size={theme.text.size.HM}
                >
                    Facility Information
                </Text>
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    Input the details of your facility
                </Text>
            </div>
            <div className="flex flex-col gap-1">
                <Text>Provider Name *</Text>
                <Input
                    placeholder="Provider Name"
                    value={facilityInfoFormik.values.providerName}
                    onChange={(e) => facilityInfoFormik.handleChange(e)}
                    onBlur={(e) => facilityInfoFormik.handleBlur(e)}
                    name="providerName"
                    className="shadow-xs"
                    borderColor={(facilityInfoFormik.errors.providerName && facilityInfoFormik.touched.providerName) && theme.colors.text.danger}
                />
                {
                    (facilityInfoFormik.errors.providerName && facilityInfoFormik.touched.providerName) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {facilityInfoFormik.errors.providerName}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Provider Category *</Text>
                <Dropdown
                    menuItems={facilityTypeOptions}
                    onChange={(value) => { facilityInfoFormik.setFieldValue("providerCategory", value) }}
                >
                    <Input
                        placeholder="Provider Category"
                        value={facilityInfoFormik.values.providerCategory}
                        onChange={(e) => facilityInfoFormik.handleChange(e)}
                        onBlur={(e) => facilityInfoFormik.handleBlur(e)}
                        name="providerCategory"
                        inputProps={{ readOnly: true }}
                        className="shadow-xs"
                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                        borderColor={(facilityInfoFormik.errors.providerCategory && facilityInfoFormik.touched.providerCategory) && theme.colors.text.danger}
                    />
                </Dropdown>
                {
                    (facilityInfoFormik.errors.providerCategory && facilityInfoFormik.touched.providerCategory) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {facilityInfoFormik.errors.providerCategory}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                    <Text>Provider Id *</Text>
                    <Text textColor={theme.colors.text.tetiary}>Must match your credential certificate</Text>
                </div>
                <Input
                    placeholder="Provider Id"
                    value={facilityInfoFormik.values.providerId}
                    onChange={(e) => facilityInfoFormik.handleChange(e)}
                    onBlur={(e) => facilityInfoFormik.handleBlur(e)}
                    name="providerId"
                    className="shadow-xs"
                    borderColor={(facilityInfoFormik.errors.providerId && facilityInfoFormik.touched.providerId) && theme.colors.text.danger}
                />
                {
                    (facilityInfoFormik.errors.providerId && facilityInfoFormik.touched.providerId) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {facilityInfoFormik.errors.providerId}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Prescribing Level *</Text>
                <Dropdown
                    menuItems={prescribingLevels}
                    onChange={(value) => { facilityInfoFormik.setFieldValue("prescribingLevel", value) }}
                >
                    <Input
                        placeholder="Prescribing Level"
                        value={facilityInfoFormik.values.prescribingLevel}
                        onChange={(e) => facilityInfoFormik.handleChange(e)}
                        onBlur={(e) => facilityInfoFormik.handleBlur(e)}
                        name="prescribingLevel"
                        inputProps={{ readOnly: true }}
                        className="shadow-xs"
                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                        borderColor={(facilityInfoFormik.errors.prescribingLevel && facilityInfoFormik.touched.prescribingLevel) && theme.colors.text.danger}
                    />
                </Dropdown>
                {
                    (facilityInfoFormik.errors.prescribingLevel && facilityInfoFormik.touched.prescribingLevel) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {facilityInfoFormik.errors.prescribingLevel}
                        </Text>
                    )
                }
            </div>
            <Button
                text="Continue"
                onClick={handleContinue}
                className="!w-full !h-[45px]"
            />
        </div>
    )
}

export default FacilityInfoForm
