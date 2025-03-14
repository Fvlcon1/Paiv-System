'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Table from "./components/table"
import { data } from "./components/data"
import Input from "@components/input/input"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { useContext, useEffect, useRef, useState } from "react"
import { mainContext } from "../context/context"
import Controls from "./components/controls"
import Button from "@components/button/button"
import TopSection from "./components/topSection"
import ClaimsForm from "./components/claimsForm"
import { AnimatePresence } from "framer-motion"

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
            <AnimatePresence>
                <div className="flex flex-col gap-10 items-center">
                    <TopSection />
                    <div className="w-full max-w-[1024px] flex flex-col gap-3">
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button 
                                    text="Add Claim"
                                    className="!bg-bg-secondary"
                                    onClick={()=>{
                                        setShowClaims(true)
                                    }}
                                />
                            </div>
                            <Controls 
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                                view={view}
                                setView={setView}
                            />
                        </div>
                        <Table data={data} isLoading={false}/>
                    </div>
                </div>
            </AnimatePresence>
        </>
    )
}
export default Claims