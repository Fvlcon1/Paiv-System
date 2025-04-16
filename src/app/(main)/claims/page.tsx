'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Table from "./components/table"
import Input from "@components/input/input"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { useContext, useEffect, useRef, useState } from "react"
import Controls from "./components/controls"
import Button from "@components/button/button"
import TopSection from "./components/topSection"
import ClaimsForm from "./components/claimsForm"
import { AnimatePresence } from "framer-motion"
import { data } from './components/claimsTable/data';
import ClaimsTable from "./components/claimsTable/claimsTable"

const Claims = () => {
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")
    const [showClaims, setShowClaims] = useState(false)

    return (
        <>
            {
                showClaims &&
                <ClaimsForm 
                    close={()=>setShowClaims(false)}
                />
            }
            <div className="w-full px-8 pt-4 flex flex-col">
                {/* Top Section */}
                <TopSection />

                {/* <div className="flex items-center gap-2">
                    <Button 
                        text="Add Claim"
                        className="!bg-bg-secondary"
                        onClick={()=>{
                            setShowClaims(true)
                        }}
                    />
                </div> */}
                <ClaimsTable />
            </div>

        </>
    )
}
export default Claims