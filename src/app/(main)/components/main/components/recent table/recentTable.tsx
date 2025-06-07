'use client'

import useRecentVisits from "./utils/useRecentVisits"
import { useEffect, useState } from "react"
import Slidein from "@styles/components/slidein"
import Controls from "@components/table/controls"
import Table from "./components/table"

const RecentTable = () => {
	const [view, setView] = useState<"list" | "grid">("list")
	const { getRecentVisits, recentVisitsTableData, isLoading, isError, error, pageSize, pageNumber, setPageSize, setPageNumber, isRefetching } = useRecentVisits()
	const [manualRefetching, setManualRefetching] = useState(false)

	const handleManualRefetch = async () => {
		setManualRefetching(true);
		try {
			await getRecentVisits();
		} finally {
			setManualRefetching(false);
		}
	};

	let firstload = false
	useEffect(() => {
		if (!firstload) {
			firstload = true
			return
		}
		setManualRefetching(false)
	}, [pageNumber, pageSize])

	useEffect(() => {
		if (!isRefetching)
			setManualRefetching(false)
	}, [isRefetching])

	return (
		<>
			<Slidein className="w-full flex flex-col items-center">
				<div className="flex gap-[15px] flex-col min-w-[800px] w-full py-4">
					<div className="w-full">
						<Controls
							pageSize={pageSize}
							setPageSize={setPageSize}
							pageNumber={pageNumber}
							setPageNumber={setPageNumber}
							view={view}
							setView={setView}
							handleReload={handleManualRefetch}
						/>
					</div>
					<Table
						data={recentVisitsTableData}
						isError={isError}
						isLoading={isLoading || manualRefetching}
						error={error}
					/>
				</div>
			</Slidein>
		</>
	)
}
export default RecentTable