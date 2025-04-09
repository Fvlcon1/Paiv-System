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
import { FaHistory } from "react-icons/fa"
import NoData from "@components/NoData/noData"

const RecentTable = () => {
  const {getRecentVisits, recentVisitsTableData} = useRecentVisits()
  const {tokenId} = useParams()

  const getPastEncounters = async () => {
      const response = await protectedApi.GET(`/encounter/members/${tokenId}`)
      return response
  }

  const {mutate : getPastEncountersMutation, isPending, data : pastEncounters} = useMutation({
      mutationFn : getPastEncounters,
      onSuccess : (data) => {
        getRecentVisits(data.related_verifications)
      }
  })

  useEffect(()=>{
      getPastEncountersMutation()
  },[])

  if(isPending)(
      <div className="w-full flex h-[500px] justify-center items-center">
          <div className="normal-loader"></div>
      </div>
  )

  if(!pastEncounters)(
      <div className="w-full flex h-[500px] justify-center items-center">
          <NoData />
      </div>
  )

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex gap-[15px] flex-col min-w-[800px] w-full max-w-[1024px]">
            <div className="flex gap-1 items-center">
              <div className="w-[20px] h-[20px] flex justify-center items-center bg-main-primary rounded-[5px]">
                  <FaHistory
                      color="white"
                      size={12}
                  />
              </div>
              <Text>
                  Past Encounters
              </Text>
          </div>
          <Table
            data={recentVisitsTableData}
            error={null}
            isError={false}
            isLoading={false}
          />
        </div>
      </div>
    </>
    )
}
export default RecentTable