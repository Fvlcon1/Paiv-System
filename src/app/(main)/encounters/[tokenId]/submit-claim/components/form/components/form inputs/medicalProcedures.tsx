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

const MedicalProcedures = () => {
    const { formik, handleRemoveMedicalProcedure } = useClaimsFormContext()
    const { medicalProcedureItems } = useDropdownItems()
    const {medicalProcedures} = formik.values

    const addRow = () => {
        const newProcedure = {
            id: uuidv4(),
            gdrg: '',
            icd10: '',
            procedure: '',
            date: null
        };
        formik.setFieldValue('medicalProcedures', [...medicalProcedures, newProcedure]);
    };

    const updateRow = (index: number, field: string, value: any) => {
        const updated = [...medicalProcedures];
        updated[index] = { ...updated[index], [field]: value };
        formik.setFieldValue('medicalProcedures', updated);
    };

    const removeRow = (index: number) => {
        if(medicalProcedures.length === 1) return
        const updated = medicalProcedures.filter((_ : any, i : number) => i !== index);
        formik.setFieldValue('medicalProcedures', updated);
    };

    const GDRGInput = ({ index }: { index: number }) => (
        <Dropdown
            className="w-full"
            menuItems={medicalProcedureItems}
            onChange={(e) => updateRow(index, 'gdrg', e.code)}
        >
            <Input
                value={medicalProcedures[index].gdrg}
                onChange={(e) => updateRow(index, 'gdrg', e.target.value)}
                placeholder="GDRG Code"
                className="w-full !h-[32px] shadow-xs !px-2.5"
                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
            />
        </Dropdown>
    )

    const ICD10Input = ({ index }: { index: number }) => (
        <Input
            value={medicalProcedures[index].icd10}
            onChange={(e) => updateRow(index, 'icd10', e.target.value)}
            placeholder="ICD-10"
            className="w-full !h-[32px] shadow-xs !px-2.5"
        />
    )

    const ProcedureInput = ({ index }: { index: number }) => (
        <Dropdown
            className="w-full"
            menuItems={medicalProcedureItems}
            onChange={(e) => updateRow(index, 'procedure', e.service)}
        >
            <div className="w-full">
                <Input
                    value={medicalProcedures[index].procedure}
                    onChange={(e) => updateRow(index, 'procedure', e.target.value)}
                    placeholder="Select procedure"
                    className="w-full !h-[32px] shadow-xs !px-2.5"
                    PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                    PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                />
            </div>
        </Dropdown>
    )

    const DateInput = ({ index }: { index: number }) => (
        <div className="flex items-center gap-2">
            <DatePicker
                value={medicalProcedures[index].date}
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
        "ICD-10",
        "Procedure",
        "Date"
    ]

    return (
        <div className="w-full flex flex-col gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2} className={gradientClass}>
                    Medical Procedures
                </Text>
                <Text>
                    Select any procedures performed during treatment (procedure codes).
                </Text>
            </div>

            <div className="rounded-xl border border-border-primary">
                <table className="min-w-full rounded-xl">
                    <thead className="border-b border-border-primary">
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
                        {medicalProcedures.map((row : any, index : number) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <GDRGInput index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <ICD10Input index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <ProcedureInput index={index} />
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
                {formik?.values.medicalProcedures.map((procedure: any, index: number) => (
                    <Chip key={index} onClick={() => handleRemoveMedicalProcedure(procedure)}>
                        <Text>
                            {`${procedure.code} - ${procedure.icd10 || 'No ICD-10'} - ${procedure.service}`}
                        </Text>
                    </Chip>
                ))}
            </div> */}
        </div>
    )
}

export default MedicalProcedures