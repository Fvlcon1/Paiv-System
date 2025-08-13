'use client'    
import SlideIn from "@styles/components/slidein"
import TableHead from "./components/table-head"
import TableBodySorted from "./components/table-body-sorted"
import Top from "./components/top"


const HospitalPage = () => {
    return (
        <SlideIn
            direction="right"
            className="w-full flex flex-col gap-2 py-4"
        >
            <Top />
            <TableHead />
            <TableBodySorted />
        </SlideIn>
    )
}
export default HospitalPage