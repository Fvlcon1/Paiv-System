import { Checkbox, CheckboxOptionType, Tooltip } from "antd";
import { useClaimsFormContext } from "../../context/context";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { TypographyBold } from "@styles/style.types";
import { useEffect, useState } from "react";

export type IOptions = 'ASUR' | 'DENT' | 'ENTH' | 'MEDI' | 'OBGY' | 'OPDC' | 'OPHT' | 'ORTH' | 'PAED' | 'PSUR' | 'RSUR';

const tooltipTexts: Record<IOptions, string> = {
    ASUR: "Adult Surgery",
    DENT: "Dentistry",
    ENTH: "Ear, Nose, and Throat",
    MEDI: "Internal Medicine",
    OBGY: "Obstetrics and Gynecology",
    OPDC: "Outpatient Department",
    OPHT: "Ophthalmology",
    ORTH: "Orthopedics",
    PAED: "Pediatrics",
    PSUR: "Plastic Surgery",
    RSUR: "Reconstructive Surgery"
};

const Specialties = () => {
    const { formik } = useClaimsFormContext();
    const [selectedOption, setSelectedOption] = useState<IOptions[]>(formik.values.specialties as IOptions[]);

    const isError = formik.touched.specialties && formik?.errors.specialties;

    const handleOptionChange = (checkedValues: IOptions[]) => {
        setSelectedOption(checkedValues);
        formik.setFieldValue("specialties", checkedValues);
    };

    const options: CheckboxOptionType<IOptions>[] = Object.keys(tooltipTexts).map((key) => ({
        label: (
            <div className="flex items-center gap-2">
                <Text>
                    <Tooltip
                        title={tooltipTexts[key as IOptions]}
                        placement="top"
                    >
                        {key}
                    </Tooltip>
                </Text>
            </div>
        ),
        value: key as IOptions
    }));

    // Set initial formik value
    useEffect(() => {
        formik.setFieldValue("specialties", ["OPDC"]);
        setSelectedOption(["OPDC"]);
    }, []);

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
                <Checkbox.Group
                    options={options}
                    defaultValue={selectedOption}
                    onChange={handleOptionChange}
                    className="specialty-checkbox-group"
                />
            </div>
            {isError && (
                <Text textColor="#db3e1f">
                    {formik.errors.specialties}
                </Text>
            )}
        </div>
    );
};

export default Specialties;