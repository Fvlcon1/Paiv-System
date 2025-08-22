'use client'

import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaChevronDown, FaPlus, FaTrash } from "react-icons/fa"
import { GiTestTubes } from "react-icons/gi"
import { useClaimsFormContext } from "../../../../context/context"
import useDropdownItems from "../../../../hooks/dropdownItems/useDropdownItems"
import { TypographyBold } from "@styles/style.types"
import { gradientClass } from "@/utils/constants"
import Button from '@components/button/button';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from 'antd';

interface LabTestRow {
    id: string;
    gdrg: string;
    procedure: string;
    unitPrice: string;
    date: string | null;
}

const LabTests = () => {
    const { formik } = useClaimsFormContext()
    const { labTestItems } = useDropdownItems()
    const { labTests = [] } = formik.values

    const addRow = () => {
        const newLabTests = [...labTests, { id: uuidv4(), gdrg: '', procedure: '', unitPrice: '', date: null }];
        formik.setFieldValue('labTests', newLabTests);
    };

    const removeRow = (index: number) => {
        if (labTests.length > 1) {
            const newLabTests = [...labTests];
            newLabTests.splice(index, 1);
            formik.setFieldValue('labTests', newLabTests);
        }
    };

    const updateRow = (index: number, field: keyof LabTestRow, value: any) => {
        const newLabTests = [...labTests];
        newLabTests[index] = { ...newLabTests[index], [field]: value };
        formik.setFieldValue('labTests', newLabTests);
    };

    const GDRGInput = ({ index }: { index: number }) => (
        <Input
            value={labTests[index]?.gdrg || ''}
            onChange={(e) => updateRow(index, 'gdrg', e.target.value)}
            placeholder="GDRG"
            className="w-full !h-[32px] shadow-xs !px-2.5"
        />
    )

    const ProcedureInput = ({ index }: { index: number }) => (
        <Dropdown
            className="w-full"
            menuItems={labTestItems}
            onChange={(e) => updateRow(index, 'procedure', e.service)}
        >
            <div className="w-full">
                <Input
                    value={labTests[index]?.procedure || ''}
                    onChange={(e) => updateRow(index, 'procedure', e.target.value)}
                    placeholder="Select procedure"
                    className="w-full !h-[32px] shadow-xs !px-2.5"
                    PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                    PreIcon={<GiTestTubes color={theme.colors.text.tetiary} size={12} />}
                />
            </div>
        </Dropdown>
    )

    const UnitPriceInput = ({ index }: { index: number }) => (
        <Input
            value={labTests[index]?.unitPrice || ''}
            onChange={(e) => updateRow(index, 'unitPrice', e.target.value)}
            placeholder="Unit Price"
            type="number"
            className="w-full !h-[32px] shadow-xs !px-2.5"
        />
    )

    const DateInput = ({ index }: { index: number }) => (
        <div className="flex items-center gap-2">
            <DatePicker
                value={labTests[index]?.date || null}
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

    const heads = [
        "GDRG",
        "Procedure",
        "Unit Price",
        "Date"
    ]

    return (
        <div className="w-full flex flex-col gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2} className={gradientClass}>
                    Investigation
                </Text>
                <Text>
                    Enter lab test details including GDRG, procedure, and pricing.
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
                        {labTests.map((row: LabTestRow, index: number) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <GDRGInput index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <ProcedureInput index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <UnitPriceInput index={index} />
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

            {/* <div className="flex gap-2 flex-wrap">
                {rows.map((row, index) => (
                    <Chip key={index}>
                        <Text>
                            {row.gdrg} - {row.procedure} (${row.unitPrice}) - {row.date || 'No date'}
                        </Text>
                    </Chip>
                ))}
            </div> */}
        </div>
    )
}

export default LabTests