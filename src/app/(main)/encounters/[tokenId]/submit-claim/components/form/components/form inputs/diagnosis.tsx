import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaChevronDown, FaPlus, FaTrash } from "react-icons/fa"
import { GiStethoscope } from "react-icons/gi"
import { useClaimsFormContext } from "../../../../context/context"
import useDropdownItems from "../../../../hooks/dropdownItems/useDropdownItems"
import Button from "@components/button/button"
import { TypographyBold } from "@styles/style.types"
import { gradientClass } from "@/utils/constants"
import { v4 as uuidv4 } from 'uuid';

type DiagnosisRow = {
    id: string;
    gdrg: string;
    icd10: string;
    diagnosis: string;
};

const Diagnosis = () => {
    const { formik } = useClaimsFormContext()
    const { mainConditionItems } = useDropdownItems()
    const { diagnosis = [] } = formik.values

    const addRow = () => {
        const newDiagnosis = [...diagnosis, { id: uuidv4(), gdrg: '', icd10: '', diagnosis: '' }];
        formik.setFieldValue('diagnosis', newDiagnosis);
    };

    const removeRow = (index: number) => {
        if (diagnosis.length > 1) {
            const newDiagnosis = [...diagnosis];
            newDiagnosis.splice(index, 1);
            formik.setFieldValue('diagnosis', newDiagnosis);
        }
    };

    const updateRow = (index: number, field: keyof DiagnosisRow, value: string) => {
        const newDiagnosis = [...diagnosis];
        newDiagnosis[index] = { ...newDiagnosis[index], [field]: value };
        formik.setFieldValue('diagnosis', newDiagnosis);
    };

    const GDRGInput = ({ index }: { index: number }) => (
        <Input
            value={diagnosis[index]?.gdrg || ''}
            onChange={(e) => updateRow(index, 'gdrg', e.target.value)}
            placeholder="GDRG"
            className="w-full !h-[32px] shadow-xs !px-2.5"
        />
    )

    const ICD10Input = ({ index }: { index: number }) => (
        <Input
            value={diagnosis[index]?.icd10 || ''}
            onChange={(e) => updateRow(index, 'icd10', e.target.value)}
            placeholder="ICD-10"
            className="w-full !h-[32px] shadow-xs !px-2.5"
        />
    )

    const DiagnosisInput = ({ index }: { index: number }) => (
        <Dropdown
            className="w-full"
            menuItems={mainConditionItems}
            onChange={(e) => updateRow(index, 'diagnosis', e.service)}
        >
            <div className="w-full">
                <Input
                    value={diagnosis[index]?.diagnosis || ''}
                    onChange={(e) => updateRow(index, 'diagnosis', e.target.value)}
                    placeholder="Select diagnosis"
                    className="w-full !h-[32px] shadow-xs !px-2.5"
                    PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                    PreIcon={<GiStethoscope color={theme.colors.text.tetiary} size={12} />}
                />
            </div>
        </Dropdown>
    )

    const heads = [
        "GDRG",
        "ICD-10",
        "Diagnosis"
    ]

    return (
        <div className="w-full flex flex-col gap-2 p-6 bg-bg-primary-lighter/0 rounded-2xl border border-border-primary">
            <div className="flex flex-col gap-1">
                <Text bold={TypographyBold.md2} className={gradientClass}>
                    Diagnosis
                </Text>
                <Text>
                    Select the primary and secondary diagnosis.
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
                        {diagnosis.map((row: DiagnosisRow, index: number) => (
                            <tr key={row.id} className={index === 0 ? 'bg-green-700/50' : 'hover:bg-gray-50'}>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <GDRGInput index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <ICD10Input index={index} />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <DiagnosisInput index={index} />
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

            <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-green-700/50 rounded-md" />
                <Text>
                    Primary Diagnosis
                </Text>
            </div>

            {formik.touched.diagnosis && formik?.errors?.diagnosis && (
                <Text textColor="#db3e1f" className="!pl-2">
                    {formik?.errors.diagnosis}
                </Text>
            )}

            {/* Diagnosis list will be shown in the table above */}
        </div>
    )
}
export default Diagnosis