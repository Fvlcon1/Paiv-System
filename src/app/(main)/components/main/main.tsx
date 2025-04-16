import { mainContext } from "@/app/context/context";
import { useContext } from "react";
import TopSection from "./components/topSection";
import ResultsTable from "./components/results table/resultsTable";
import RecentTable from "./components/recent table/recentTable";

const Main = () => {
    const {searchValue, setSearchValue, setShowNhisDetails, showNhisDetails} = useContext(mainContext)
    return (
        <div className="w-full px-8 pt-4">
            {/* Top Section */}
            <TopSection />

            {/* Search */}
                {
                    searchValue.length ?
                    <ResultsTable />
                    :
                    <RecentTable />
                  }
        </div>
    )
}
export default Main