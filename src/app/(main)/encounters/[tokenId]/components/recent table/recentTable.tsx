'use client'

import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import Table from "./components/table"
import useRecentVisits from "./utils/useRecentVisits"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import NoData from "@components/NoData/noData"
import Top from "./components/top"
import TableComponent from "@components/table/table"
import { columns } from "./components/data"
import RecentVisitsDetails from "./components/recent visit details/recentVisitsDetails"
import { useState } from "react"
import { IRecentVisitsTable } from "../../../utils/type"

const RecentTable = () => {
	const { getRecentVisits, recentVisitsTableData } = useRecentVisits()
	const { tokenId } = useParams()
	const [displayRecentVisitsDetails, setDisplayRecentVisitsDetails] = useState(false)
	const [selectedVisit, setSelectedVisit] = useState<IRecentVisitsTable>()

	const getPastEncounters = async () => {
		const response = await protectedApi.GET(`/encounter/members/${tokenId}`)
		return response
	}

	const { mutate: getPastEncountersMutation, isPending, data: pastEncounters } = useMutation({
		mutationFn: getPastEncounters,
		onSuccess: (data) => {
			getRecentVisits(data.related_verifications)
		}
	})

	useEffect(() => {
		getPastEncountersMutation()
	}, [])

	if (isPending) (
		<div className="w-full flex h-[500px] justify-center items-center">
			<div className="normal-loader"></div>
		</div>
	)

	if (!pastEncounters) (
		<div className="w-full flex h-[500px] justify-center items-center">
			<NoData />
		</div>
	)

	return (
		<>
			<RecentVisitsDetails
				data={selectedVisit}
				display={displayRecentVisitsDetails}
				setDisplay={setDisplayRecentVisitsDetails}
			/>
			<div className="w-full flex flex-col items-center">
				<div className="flex gap-[15px] flex-col min-w-[800px] w-full">
					<Top handleReload={getPastEncountersMutation} />
					<TableComponent
						data={recentVisitsTableData}
						isLoading={isPending}
						isError={false}
						error={null}
						columns={columns}
						title="Past Encounters"
						handleOnRowClick={(data) => {
							setSelectedVisit(data)
							setDisplayRecentVisitsDetails(true)
						}}
					/>
				</div>
			</div>
		</>
	)
}
export default RecentTable