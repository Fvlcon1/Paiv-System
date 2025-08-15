import { flexRender, useReactTable } from "@tanstack/react-table";
import useColumns from "../hooks/use-columns";
import { getCoreRowModel } from "@tanstack/react-table";
import Text from "@styles/components/text";
import { useState, useEffect } from "react";
import { useTheme } from "@styles/theme-context";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { gradientClass } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { data } from "./data";
import useEncounter from "../hooks/use-encounter";
import RecentVisitsDetails from "../../components/recent visit details/recentVisitsDetails";
import { IRecentVisitsTable } from "../utils/type";
import { useEncounterContext } from "../context/encounterContext";
import TableComponent from "@components/table/table";

const Table = () => {
    const { columns } = useColumns()
    const { theme } = useTheme()
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const { recentVisitsTableData } = useEncounter()

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: recentVisitsTableData ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    });

    const [selectedVisit, setSelectedVisit] = useState<IRecentVisitsTable>()
    const { setShowEncounterDetails, showEncounterDetilas } = useEncounterContext()

    return (
        <>
            <RecentVisitsDetails
                data={selectedVisit}
                display={showEncounterDetilas}
                setDisplay={setShowEncounterDetails}
            />
            <div className="px-4">
                <TableComponent 
                    data={recentVisitsTableData}
                    columns={columns}
                    isLoading={isLoading}
                    isError={false}
                    error={null}
                    title="Recent Visits"
                    handleOnRowClick={(dataItem) => {
                        router.push(`/encounters/${dataItem.token}`)
                    }}
                />
            </div>
        </>
    )
}
export default Table