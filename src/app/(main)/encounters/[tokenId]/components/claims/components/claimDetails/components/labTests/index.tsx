import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Table from "./table";

const LabTests = ({
  tests
} : {
  tests: any[]
}) => {
  return (
    <div className="w-full border-solid border-[1px] border-border-secondary rounded-xl flex flex-col">
      <div className="flex w-full border-solid border-b-[1px] border-border-secondary bg-bg-secondary min-h-[45px] items-center pl-4 rounded-t-xl">
        <Text bold={TypographyBold.md}>
          Lab Tests
        </Text>
      </div>
      <div className="flex w-full flex-col">
        <Table tests={tests} />
      </div>
    </div>
  )
}

export default LabTests
