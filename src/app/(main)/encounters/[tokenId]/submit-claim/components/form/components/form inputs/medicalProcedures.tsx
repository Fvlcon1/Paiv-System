import { useState } from 'react';
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useClaimsFormContext } from "../../../../context/context"
import useDropdownItems from "../../../../hooks/dropdownItems/useDropdownItems"
import { FaChevronDown, FaPlus, FaTrash } from "react-icons/fa"
import Chip from "../../../chip/chip"
import { GiCaduceus } from "react-icons/gi"
import { TypographyBold } from "@styles/style.types"
import { DatePicker } from "antd"
import { gradientClass } from "@/utils/constants"
import { v4 as uuidv4 } from 'uuid';
import Button from '@components/button/button';

interface ProcedureRow {
    id: string;
    gdrg: string;
    procedure: string;
    date: any;
}

const MedicalProcedures = () => {
    const { formik, handleRemoveMedicalProcedure } = useClaimsFormContext()
    const { medicalProcedureItems } = useDropdownItems()

    const [rows, setRows] = useState<ProcedureRow[]>([
        { id: uuidv4(), gdrg: '', procedure: '', date: null }
    ]);

    const addRow = () => {
        setRows([...rows, { id: uuidv4(), gdrg: '', procedure: '', date: null }]);
    };

    const removeRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const updateRow = (id: string, field: keyof ProcedureRow, value: any) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const GDRGInput = ({ row }: { row: ProcedureRow }) => (
        <Dropdown
            className="w-full"
            menuItems={medicalProcedureItems}
            onChange={(e) => updateRow(row.id, 'gdrg', e.code)}
        >
            <Input
                value={row.gdrg}
                onChange={(e) => updateRow(row.id, 'gdrg', e.target.value)}
                placeholder="GDRG Code"
                className="w-full !h-[32px] shadow-xs !px-2.5"
                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
            />
        </Dropdown>
    )

    const ProcedureInput = ({ row }: { row: ProcedureRow }) => (
        <Dropdown
            className="w-full"
            menuItems={medicalProcedureItems}
            onChange={(e) => updateRow(row.id, 'procedure', e.service)}
        >
            <div className="w-full">
                <Input
                    value={row.procedure}
                    onChange={(e) => updateRow(row.id, 'procedure', e.target.value)}
                    placeholder="Select procedure"
                    className="w-full !h-[32px] shadow-xs !px-2.5"
                    PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                    PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                />
            </div>
        </Dropdown>
    )

    const DateInput = ({ row }: { row: ProcedureRow }) => (
        <div className="flex items-center gap-2">
            <DatePicker
                value={row.date}
                onChange={(date) => updateRow(row.id, 'date', date)}
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

    const heads = [
        "GDRG Code",
        "Procedure",
        "Date",
        ""
    ]

    return (
        <div className="w-full flex flex-col gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2} className={gradientClass}>
                    Medical Procedures
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select any procedures performed during treatment (procedure codes).
                </Text>
            </div>

            <div className="rounded-xl border border-border-primary">
                <table className="min-w-full rounded-xl">
                    <thead className="bg-gray-100 border-b border-border-primary">
                        <tr>
                            {
                                heads.map((head, index) => (
                                    <th key={index} className="text-left px-4.5 py-2">
                                        <Text lineHeight={1} className={gradientClass}>{head}</Text>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <GDRGInput row={row} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <ProcedureInput row={row} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DateInput row={row} />
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
                    text="Add Procedure"
                    icon={<FaPlus size={12} />}
                />
            </div>

            <div className="flex gap-2 flex-wrap">
                {formik?.values.medicalProcedures.map((procedure: any, index: number) => (
                    <Chip key={index} onClick={() => handleRemoveMedicalProcedure(procedure)}>
                        <Text>
                            {`${procedure.code} - (${procedure.service})`}
                        </Text>
                    </Chip>
                ))}
            </div>
        </div>
    )
}

export default MedicalProcedures