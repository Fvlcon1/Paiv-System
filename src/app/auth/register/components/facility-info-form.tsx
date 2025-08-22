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
    const { step, setStep, facilityInfoFormik, registerLoading } = useRegisterContext()
    const facilityType = facilityInfoFormik.values.facilityType
    const prescribingLevel = facilityInfoFormik.values.prescribingLevel

    const facilityTypeOptions: DropdownItem[] = [
        { key: "1 - Tertiary care hospital", label: "1 - Tertiary care hospital", value: "1 - Tertiary care hospital", isSelected: facilityType === "1 - Tertiary care hospital" },
        { key: "2 - Secondary care hospital", label: "2 - Secondary care hospital", value: "2 - Secondary care hospital", isSelected: facilityType === "2 - Secondary care hospital" },
        { key: "3 - Primary care hospital", label: "3 - Primary care hospital", value: "3 - Primary care hospital", isSelected: facilityType === "3 - Primary care hospital" },
        { key: "4 - Health centers", label: "4 - Health centers (Public, Private, CHAG)", value: "4 - Health centers (Public, Private, CHAG)", isSelected: facilityType === "4 - Health centers (Public, Private, CHAG)" },
        { key: "5 - Maternity homes", label: "5 - Maternity homes", value: "5 - Maternity homes", isSelected: facilityType === "5 - Maternity homes" },
        { key: "6 - Private clinics", label: "6 - Private clinics", value: "6 - Private clinics", isSelected: facilityType === "6 - Private clinics" },
        { key: "7 - Dental clinics", label: "7 - Dental clinics", value: "7 - Dental clinics", isSelected: facilityType === "7 - Dental clinics" },
        { key: "8 - Eye centers", label: "8 - Eye centers", value: "8 - Eye centers", isSelected: facilityType === "8 - Eye centers" },
        { key: "9 - Diagnostic centers", label: "9 - Diagnostic centers", value: "9 - Diagnostic centers", isSelected: facilityType === "9 - Diagnostic centers" },
        { key: "10 - CHPS Compounds", label: "10 - CHPS Compounds", value: "10 - CHPS Compounds", isSelected: facilityType === "10 - CHPS Compounds" },
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
                loading={registerLoading}
                className="!w-full !h-[45px]"
            />
        </div>
    )
}

export default FacilityInfoForm
