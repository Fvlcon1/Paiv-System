'use client'

import { useState } from "react"
import TopSection from "./components/topSection"
import ClaimsForm from "../components/claimsForm/claimsForm"
import ClaimsTable from "./components/claimsTable/claimsTable"

const Claims = () => {
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