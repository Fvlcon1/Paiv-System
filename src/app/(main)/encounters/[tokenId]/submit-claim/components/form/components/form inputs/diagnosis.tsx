import { useState } from 'react';
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaChevronDown, FaPlus, FaTrash } from "react-icons/fa"
import { GiStethoscope } from "react-icons/gi"
import { useClaimsFormContext } from "../../../../context/context"
import useDropdownItems from "../../../../hooks/dropdownItems/useDropdownItems"
import Button from "@components/button/button"
import Chip from "../../../chip/chip"
import { TypographyBold } from "@styles/style.types"
import { BsInfoCircle } from "react-icons/bs"
import { gradientClass } from "@/utils/constants"
import { v4 as uuidv4 } from 'uuid';

interface DiagnosisRow {
    id: string;
    mainDiagnosis: string;
    primaryDiagnosis: string;
}

const Diagnosis = () => {
    const { formik, handleRemoveDiagnosis } = useClaimsFormContext()
    const { mainConditionItems } = useDropdownItems()

    const [rows, setRows] = useState<DiagnosisRow[]>([
        { id: uuidv4(), mainDiagnosis: '', primaryDiagnosis: '' }
    ]);

    const addRow = () => {
        setRows([...rows, { id: uuidv4(), mainDiagnosis: '', primaryDiagnosis: '' }]);
    };

    const removeRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const updateRow = (id: string, field: keyof DiagnosisRow, value: string) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const DiagnosisInput = ({ 
        row, 
        type 
    }: { 
        row: DiagnosisRow; 
        type: 'main' | 'primary' 
    }) => (
        <Dropdown
            className="w-full"
            menuItems={mainConditionItems}
            onChange={(e) => updateRow(row.id, type === 'main' ? 'mainDiagnosis' : 'primaryDiagnosis', e.service)}
        >
            <div className="w-full">
                <Input
                    value={type === 'main' ? row.mainDiagnosis : row.primaryDiagnosis}
                    onChange={(e) => updateRow(row.id, type === 'main' ? 'mainDiagnosis' : 'primaryDiagnosis', e.target.value)}
                    placeholder={type === 'main' ? 'Select main diagnosis' : 'Select primary diagnosis'}
                    className="w-full !h-[32px] shadow-xs !px-2.5"
                    PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                    PreIcon={<GiStethoscope color={theme.colors.text.tetiary} size={12} />}
                />
            </div>
        </Dropdown>
    )

    const heads = [
        "Main Diagnosis",
        "Primary Diagnosis",
        ""
    ]

    return (
        <div className="w-full flex flex-col gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2} className={gradientClass}>
                    Diagnosis
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select the primary and secondary diagnosis.
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
                                    <DiagnosisInput row={row} type="main" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DiagnosisInput row={row} type="primary" />
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
                    text="Add Diagnosis"
                    icon={<FaPlus size={12} />}
                />
            </div>

            {formik.touched.diagnosis && formik?.errors?.diagnosis && (
                <Text textColor="#db3e1f" className="!pl-2">
                    {formik?.errors.diagnosis}
                </Text>
            )}

            <div className="flex gap-2 flex-wrap">
                {formik?.values.diagnosis?.map((diagnosis: any, index: number) => (
                    <Chip key={index} onClick={() => handleRemoveDiagnosis(diagnosis.code)}>
                        <Text>
                            {diagnosis.code}
                        </Text>
                    </Chip>
                ))}
            </div>
        </div>
    )
}
export default Diagnosis