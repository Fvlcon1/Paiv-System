import Text from "@styles/components/text"
import theme from "@styles/theme"
import Input from "@components/input/input"
import Button from "@components/button/button"
import { useRegisterContext } from "../context/register-context"
import { FaChevronDown } from "react-icons/fa6"
import Dropdown from "@components/dropdown/dropdown"
import useRegion from "../hooks/use-region"

const LocationInfoForm = () => {
    const { step, setStep, locationFormik } = useRegisterContext()
    const { regionDropdown, districtDropdown } = useRegion()
    
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Text
                    bold={theme.text.bold.md}
                    size={theme.text.size.HM}
                >
                    Location Information
                </Text>
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    Address and GPS location
                </Text>
            </div>
            <div className="flex flex-col gap-1">
                <Text>Physical Address *</Text>
                <Input
                    placeholder="Eg. 123 Main St, City, State, Zip"
                    value={locationFormik.values.physicalAddress}
                    onChange={(e) => locationFormik.handleChange(e)}
                    onBlur={(e) => locationFormik.handleBlur(e)}
                    name="physicalAddress"
                    className="shadow-xs"
                    borderColor={(locationFormik.errors.physicalAddress && locationFormik.touched.physicalAddress) && theme.colors.text.danger}
                />
                {
                    (locationFormik.errors.physicalAddress && locationFormik.touched.physicalAddress) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {locationFormik.errors.physicalAddress}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Digital Address *</Text>
                <Input
                    placeholder="Eg. GA-1234567890"
                    value={locationFormik.values.digitalAddress}
                    onChange={(e) => locationFormik.handleChange(e)}
                    onBlur={(e) => locationFormik.handleBlur(e)}
                    name="digitalAddress"
                    className="shadow-xs"
                    borderColor={(locationFormik.errors.digitalAddress && locationFormik.touched.digitalAddress) && theme.colors.text.danger}
                />
                {
                    (locationFormik.errors.digitalAddress && locationFormik.touched.digitalAddress) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {locationFormik.errors.digitalAddress}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>GPS Coordinates (Optional)</Text>
                <Input
                    placeholder="Eg. 123.456789, 123.456789"
                    value={locationFormik.values.coordinates}
                    onChange={(e) => locationFormik.handleChange(e)}
                    onBlur={(e) => locationFormik.handleBlur(e)}
                    name="coordinates"
                    className="shadow-xs"
                    borderColor={(locationFormik.errors.coordinates && locationFormik.touched.coordinates) && theme.colors.text.danger}
                />
                {
                    (locationFormik.errors.coordinates && locationFormik.touched.coordinates) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {locationFormik.errors.coordinates}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Region *</Text>
                <Dropdown 
                    menuItems={regionDropdown}
                    onChange={(value) => {locationFormik.setFieldValue("region", value)}}
                >
                    <Input
                        placeholder="Select Region"
                        value={locationFormik.values.region}
                        onChange={(e) => locationFormik.handleChange(e)}
                        onBlur={(e) => locationFormik.handleBlur(e)}
                        name="region"
                        className="shadow-xs"
                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                        borderColor={(locationFormik.errors.region && locationFormik.touched.region) && theme.colors.text.danger}
                    />
                </Dropdown>
                {
                    (locationFormik.errors.region && locationFormik.touched.region) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {locationFormik.errors.region}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>District *</Text>
                <Dropdown 
                    menuItems={districtDropdown}
                    onChange={(value) => locationFormik.setFieldValue("district", value)}
                >
                    <Input
                        placeholder="Select District"
                        value={locationFormik.values.district}
                        onChange={(e) => locationFormik.handleChange(e)}
                        onBlur={(e) => locationFormik.handleBlur(e)}
                        name="district"
                        className="shadow-xs"
                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                        borderColor={(locationFormik.errors.district && locationFormik.touched.district) && theme.colors.text.danger}
                    />
                </Dropdown>
                {
                    (locationFormik.errors.district && locationFormik.touched.district) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {locationFormik.errors.district}
                        </Text>
                    )
                }
            </div>
            <Button
                text="Continue"
                onClick={locationFormik.handleSubmit}
                className="!w-full !h-[45px]"
            />
        </div>
    )
}

export default LocationInfoForm
