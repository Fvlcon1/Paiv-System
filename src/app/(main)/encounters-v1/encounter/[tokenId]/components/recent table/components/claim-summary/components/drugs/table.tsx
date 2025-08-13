import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useState, useEffect } from "react"
import { IDrugsType } from '../../utils/types';

const Table = ({
    drugs
} : {
    drugs : IDrugsType[]
}) => {
    const tableHeads = ["Code", "Description", "Dosage", "Quantity", "Tariff", "Total"]
    const [tableBody, setTableBody] = useState<string[][]>([])

    useEffect(()=>{
        setTableBody(drugs.map((item) => [item.code, (item as any).generic_name, item.dosage, item.quantity?.toString(), `GHS ${item.tariff?.toString()}`, `GHS ${item.total?.toString()}`]))
    },[drugs])
    
    return (
        <table>
            <thead>
                <tr>
                    { tableHeads.map((head, index)=> (
                        <th
                            key={index} 
                            className={`pl-4 py-2 text-left ${tableBody.length > 0 ? "border-b-[1px]" : ""} ${index !== tableHeads.length - 1 ? "border-r-[1px]" : ""} border-solid border-bg-tetiary`}
                        >
                            <Text textColor={theme.colors.text.tetiary}>{head}</Text>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                { tableBody.map((body, bodyIndex)=> (
                    <tr key={bodyIndex}>
                        {
                            body.map((item, index) => (
                                <td
                                    key={index} 
                                    className={`pl-4 ${bodyIndex !== tableBody.length - 1 ? "border-b-[1px]" : ""} py-2 text-left ${index !== body.length - 1 ? "border-r-[1px]" : ""} border-solid border-bg-tetiary`}
                                >
                                    <Text>{item}</Text>
                                </td>
                            ))
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Table