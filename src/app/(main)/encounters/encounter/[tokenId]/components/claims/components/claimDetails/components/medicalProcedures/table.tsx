import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useEffect, useState } from "react"

const Table = ({
  procedures
} : {
  procedures: any[]
}) => {
  const tableHeads = ["Code", "Description", "Tariff"]
  const [tableBody, setTableBody] = useState<string[][]>([])

  useEffect(()=>{
    setTableBody(procedures.map((item) => [item.code, item.service, `GHS ${item.tariff}`]))
  },[procedures])
  
  return (
    <table className="w-full">
      <thead>
        <tr>
          { tableHeads.map((head, index)=> (
            <th
              key={index} 
              className={`pl-4 py-[15px] text-left border-b-[1px] border-r-[1px] border-solid border-border-tetiary`}
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
                  className={`pl-4 ${bodyIndex !== tableBody.length - 1 ? "border-b-[1px]" : ""} py-[15px] text-left border-r-[1px] border-solid border-border-tetiary`}
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
