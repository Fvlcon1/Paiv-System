'use client'

import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import Table from "./components/table"
import useRecentVisits from "./utils/useRecentVisits"
import { useEffect } from "react"

const RecentTable = () => {
  const {getRecentVisits, recentVisitsTableData, isLoading, isError, error} = useRecentVisits()

  useEffect(()=>{
    getRecentVisits({})
  },[])

  useEffect(()=>{
    console.log({recentVisitsTableData})
  },[recentVisitsTableData])

  return (
    <>
      <div className="w-full flex flex-col px-[30px] items-center">
        <div className="flex gap-[15px] flex-col min-w-[800px] w-full max-w-[1200px]">
          <div className="w-full">
            <Text
              textColor={theme.colors.text.primary}
              bold={TypographyBold.md}
            >
              Recent Verifications
            </Text>
          </div>
          <Table
            data={recentVisitsTableData}
            isError={isError}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </>
    )
}
export default RecentTable