'use client'

import { useState } from 'react';
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaChevronDown, FaPlus, FaTrash } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { useClaimsFormContext } from "../../../../context/context"
import useDropdownItems from "../../../../hooks/dropdownItems/useDropdownItems"
import Chip from "../../../chip/chip"
import { TypographyBold } from "@styles/style.types"
import { gradientClass } from "@/utils/constants"
import Button from '@components/button/button';
import { v4 as uuidv4 } from 'uuid';

interface LabTestRow {
    id: string;
    test: string;
    date: any;
}

const LabTests = () => {
    const { formik, handleRemoveLabTest } = useClaimsFormContext()
    const { labTestItems } = useDropdownItems()

    const [rows, setRows] = useState<LabTestRow[]>([
        { id: uuidv4(), test: '', date: null }
    ]);

    const addRow = () => {
        setRows([...rows, { id: uuidv4(), test: '', date: null }]);
    };

    const removeRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const updateRow = (id: string, field: keyof LabTestRow, value: any) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const TestInput = ({ row }: { row: LabTestRow }) => (
        <Dropdown
            className="w-full"
            menuItems={labTestItems}
            onChange={(e) => updateRow(row.id, 'test', e.service)}
        >
            <div className="w-full">
                <Input
                    value={row.test}
                    onChange={(e) => updateRow(row.id, 'test', e.target.value)}
                    placeholder="Select test"
                    className="w-full !h-[32px] shadow-xs !px-2.5"
                    PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                    PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                />
            </div>
        </Dropdown>
    )

    const DateInput = ({ row }: { row: LabTestRow }) => (
        <div className="flex items-center gap-2">
            <input
                type="date"
                value={row.date || ''}
                onChange={(e) => updateRow(row.id, 'date', e.target.value)}
                className="shadow-xs px-2.5 h-[32px] w-full rounded-md border border-border-primary"
                style={{
                    fontFamily: "montserrat",
                    fontSize: "12px",
                    color: theme.colors.text.secondary,
                }}
            />
        </div>
    )

    const heads = [
        "Test",
        "Date",
        ""
    ]

    return (
        <div className="w-full flex flex-col gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2} className={gradientClass}>
                    Investigation
                </Text>
                <Text textColor={theme.colors.text.tetiary}>
                    Select laboratory tests conducted during diagnosis.
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
                                    <TestInput row={row} />
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
                    text="Add Test"
                    icon={<FaPlus size={12} />}
                />
            </div>

            <div className="flex gap-2 flex-wrap">
                {formik?.values.labTests.map((test: any, index: number) => (
                    <Chip key={index} onClick={() => handleRemoveLabTest(test)}>
                        <Text>
                            {`${test.code} - (${test.service})`}
                        </Text>
                    </Chip>
                ))}
            </div>
        </div>
    )
}

export default LabTests