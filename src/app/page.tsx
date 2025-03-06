'use client'

import Hero from "./components/hero/hero";
import RecentTable from "./components/recent table/recentTable";
import NhisDetails from "./components/nhis details/nhisDetails";
import ResultsTable from "./components/results table/resultsTable";
import { useContext } from "react";
import { mainContext } from "./context/context";

export default function Home() {
  const {searchValue, setSearchValue, setShowNhisDetails, showNhisDetails} = useContext(mainContext)
  return (
    <>
      <NhisDetails />
      <div className="flex flex-col gap-[30px]">
        <Hero />
        {
          searchValue.length ?
          <ResultsTable />
          :
          <RecentTable />
        }
      </div>
    </>
  );
}
