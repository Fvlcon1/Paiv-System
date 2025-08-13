'use client'
import SlideIn from "@styles/components/slidein"
import Table from "./components/table"
import Top from "./components/top"
import FilterSlider from "./components/filter-slider"

const Encounters = () => {
    return (
        <>
            <FilterSlider />
            <SlideIn
                direction="right"
                className="w-full flex flex-col gap-2 py-4"
            >
                <Top />
                <Table />
            </SlideIn>
        </>
    )
}
export default Encounters