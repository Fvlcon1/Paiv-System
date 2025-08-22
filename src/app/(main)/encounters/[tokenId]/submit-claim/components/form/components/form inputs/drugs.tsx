import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaChevronDown, FaPlus, FaTrash } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { useClaimsFormContext } from "../../../../context/context"
import useDropdownItems from "../../../../hooks/dropdownItems/useDropdownItems"
import Button from "@components/button/button"
import { TypographyBold } from "@styles/style.types"
import { gradientClass } from "@/utils/constants"
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from 'antd';
import { BsInfoCircle } from "react-icons/bs"
import Chip from "../../../chip/chip"

interface DrugRow {
    id: string;
    drug: string;
    dosage: string;
    frequency: string;
    duration: string;
    date: string | null;
}

const Drugs = () => {
    const { formik } = useClaimsFormContext()
    const { drugItems } = useDropdownItems()
    const { drugs = [] } = formik.values

    const addRow = () => {
        const newDrugs = [...drugs, { id: uuidv4(), drug: '', dosage: '', frequency: '', duration: '', date: null }];
        formik.setFieldValue('drugs', newDrugs);
    };

    const removeRow = (index: number) => {
        if (drugs.length > 1) {
            const newDrugs = [...drugs];
            newDrugs.splice(index, 1);
            formik.setFieldValue('drugs', newDrugs);
        }
    };

    const updateRow = (index: number, field: keyof DrugRow, value: string | null) => {
        const newDrugs = [...drugs];
        newDrugs[index] = { ...newDrugs[index], [field]: value };
        formik.setFieldValue('drugs', newDrugs);
    };

    const DrugInput = ({ index }: { index: number }) => (
        <Dropdown
            className="w-full"
            menuItems={drugItems}
            onChange={(e) => updateRow(index, 'drug', e.service)}
        >
            <div className="w-full">
                <Input
                    value={drugs[index]?.drug || ''}
                    onChange={(e) => updateRow(index, 'drug', e.target.value)}
                    placeholder="Select drug"
                    className="w-full !h-[32px] shadow-xs !px-2.5"
                    PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                    PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                />
            </div>
        </Dropdown>
    )

    const DosageInput = ({ index }: { index: number }) => (
        <div className="flex items-center gap-2 w-full">
            <Input
                value={drugs[index]?.dosage || ''}
                onChange={(e) => updateRow(index, 'dosage', e.target.value)}
                placeholder="Dosage"
                className="w-full !h-[32px] shadow-xs !px-2.5"
            />
        </div>
    )

    const FrequencyInput = ({ index }: { index: number }) => (
        <div className="flex items-center gap-2 w-full">
            <Input
                value={drugs[index]?.frequency || ''}
                onChange={(e) => updateRow(index, 'frequency', e.target.value)}
                placeholder="Frequency"
                type="number"
                className="w-full !h-[32px] shadow-xs !px-2.5"
                PostIcon={
                    <Text textColor={theme.colors.text.tetiary} className="text-xs">
                        hourly
                    </Text>
                }
            />
        </div>
    )

    const DateInput = ({ index }: { index: number }) => (
        <div className="flex items-center gap-2">
            <DatePicker
                value={drugs[index]?.date || null}
                onChange={(date) => updateRow(index, 'date', date)}
                className='shadow-xs px-2.5 h-[32px] w-full'
                style={{
                    borderRadius: "8px",
                    fontFamily: "montserrat",
                    fontSize: "12px",
                    color: theme.colors.text.secondary,
                    fontWeight: theme.text.bold.sm2,
                    borderColor: theme.colors.border.secondary,
                }}
            />
        </div>
    )

    const DurationInput = ({ index }: { index: number }) => (
        <div className="flex items-center gap-2 w-full">
            <Input
                value={drugs[index]?.duration || ''}
                onChange={(e) => updateRow(index, 'duration', e.target.value)}
                placeholder="Duration"
                type="number"
                className="w-full !h-[32px] shadow-xs !px-2.5"
                PostIcon={
                    <Text textColor={theme.colors.text.tetiary} className="text-xs">
                        day(s)
                    </Text>
                }
            />
        </div>
    )

    const heads = [
        "Drug",
        "Dosage",
        "Frequency",
        "Duration",
        "Date"
    ]

    return (
        <div className="w-full flex flex-col gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2} className={gradientClass}>
                    Prescription
                </Text>
                <Text>
                    Select prescribed medications (generic name, strength, dosage).
                </Text>
            </div>

            <div className="rounded-xl border border-border-primary">
                <table className="min-w-full rounded-xl">
                    <thead className="bg-gray-100 border-b border-border-primary">
                        <tr>
                            {
                                heads.map((head, index) => (
                                    <th
                                        key={index}
                                        className={`text-left px-4 py-2 bg-gray-100 ${index === 0 ? 'rounded-tl-xl' : ''}`}
                                    >
                                        <Text lineHeight={1} className={gradientClass}>{head}</Text>
                                    </th>
                                ))
                            }
                            <th className="text-left px-2 py-2 bg-gray-100 rounded-tr-xl">
                                <Button
                                    onClick={addRow}
                                    type='button'
                                    className='!h-fit !w-fit !p-2'
                                    text=""
                                    icon={<FaPlus size={10} />}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {drugs.map((row: DrugRow, index: number) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DrugInput index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DosageInput index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <FrequencyInput index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DurationInput index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DateInput index={index} />
                                </td>
                                <td className="whitespace-nowrap px-2">
                                    <button
                                        type="button"
                                        onClick={() => removeRow(index)}
                                        className="flex items-center gap-2 px-2 py-2 text-white bg-text-danger cursor-pointer rounded-md hover:opacity-80"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!formik.values.pharmacy && (
                <div className="flex items-center gap-2">
                    <BsInfoCircle color={theme.colors.text.secondary} size={12} />
                    <Text textColor={theme.colors.text.secondary}>
                        Please select pharmacy
                    </Text>
                </div>
            )}

            {formik.touched.drugs && formik?.errors?.drugs && (
                <Text textColor="#db3e1f" className="!pl-2">
                    {formik?.errors.drugs}
                </Text>
            )}

            {/* <div className="flex gap-2 flex-wrap">
                {formik?.values.drugs?.map((drug: any, index: number) => (
                    <Chip key={index} onClick={() => handleRemoveDrug(drug.code)}>
                        <Text>
                            {`${drug.code} (${drug.dosage}, ${drug.frequency} hourly for ${drug.duration} day(s)) - ${drug.date || 'No date'}`}
                        </Text>
                    </Chip>
                ))}
            </div> */}
        </div>
    )
}

export default Drugs