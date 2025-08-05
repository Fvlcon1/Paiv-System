import { useTheme } from "@/app/styles/theme-context"
import { columns } from "./data"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { useVerificationContext } from "../context/verification-context"
import TableComponent from "@components/table/table"

const Table = ({
    handleOnRowClick
}: {
    handleOnRowClick?: (dataItem: any) => void
}) => {
    const { theme } = useTheme()
    const { searchMembersResult, isSearchPending, isSearchError, searchError } = useVerificationContext()

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: searchMembersResult,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <TableComponent
            data={searchMembersResult}
            isLoading={isSearchPending}
            isError={isSearchError}
            error={searchError}
            columns={columns}
            title="Patients"
        />
    )
}

export default Table
