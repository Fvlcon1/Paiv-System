import { useState } from 'react';
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaChevronDown, FaPlus, FaTrash } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { useClaimsFormContext } from "../../../../context/context"
import useDropdownItems from "../../../../hooks/dropdownItems/useDropdownItems"
import Button from "@components/button/button"
import Chip from "../../../chip/chip"
import { TypographyBold } from "@styles/style.types"
import { BsInfoCircle } from "react-icons/bs"
import { gradientClass } from "@/utils/constants"
import { v4 as uuidv4 } from 'uuid';

interface DrugRow {
    id: string;
    drug: string;
    frequency: string;
    duration: string;
}

const Drugs = () => {
    const { formik, handleRemoveDrug } = useClaimsFormContext()
    const { drugItems } = useDropdownItems()

    const [rows, setRows] = useState<DrugRow[]>([
        { id: uuidv4(), drug: '', frequency: '', duration: '' }
    ]);

    const addRow = () => {
        setRows([...rows, { id: uuidv4(), drug: '', frequency: '', duration: '' }]);
    };

    const removeRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const updateRow = (id: string, field: keyof DrugRow, value: string) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const DrugInput = ({ row }: { row: DrugRow }) => (
        <Dropdown
            className="w-full"
            menuItems={drugItems}
            onChange={(e) => updateRow(row.id, 'drug', e.service)}
        >
            <div className="w-full">
                <Input
                    value={row.drug}
                    onChange={(e) => updateRow(row.id, 'drug', e.target.value)}
                    placeholder="Select drug"
                    className="w-full !h-[32px] shadow-xs !px-2.5"
                    PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                    PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                />
            </div>
        </Dropdown>
    )

    const FrequencyInput = ({ row }: { row: DrugRow }) => (
        <div className="flex items-center gap-2 w-full">
            <Input
                value={row.frequency}
                onChange={(e) => updateRow(row.id, 'frequency', e.target.value)}
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

    const DurationInput = ({ row }: { row: DrugRow }) => (
        <div className="flex items-center gap-2 w-full">
            <Input
                value={row.duration}
                onChange={(e) => updateRow(row.id, 'duration', e.target.value)}
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
        "Frequency",
        "Duration",
        ""
    ]

    return (
        <div className="w-full flex flex-col gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2} className={gradientClass}>
                    Prescription
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select prescribed medications (generic name, strength, dosage).
                </Text>
            </div>

            <div className="rounded-xl border border-border-primary">
                <table className="min-w-full rounded-xl">
                    <thead className="bg-gray-100 border-b border-border-primary">
                        <tr>
                            {heads.map((head, index) => (
                                <th key={index} className="text-left px-4.5 py-2">
                                    <Text lineHeight={1} className={gradientClass}>{head}</Text>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DrugInput row={row} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <FrequencyInput row={row} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DurationInput row={row} />
                                </td>
                                <td className="whitespace-nowrap">
                                    <button
                                        type="button"
                                        onClick={() => removeRow(row.id)}
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

            <div className="flex justify-end">
                <Button 
                    onClick={addRow}
                    type='button'
                    text="Add Drug"
                    icon={<FaPlus size={12} />}
                />
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

            <div className="flex gap-2 flex-wrap">
                {formik?.values.drugs?.map((drug: any, index: number) => (
                    <Chip key={index} onClick={() => handleRemoveDrug(drug.code)}>
                        <Text>
                            {`${drug.code} (${drug.frequency} hourly for ${drug.duration} day(s))`}
                        </Text>
                    </Chip>
                ))}
            </div>
        </div>
    )
}

export default Drugs