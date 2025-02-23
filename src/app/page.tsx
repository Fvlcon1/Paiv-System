'use client'

import Text from "@styles/components/text";
import Hero from "./components/hero/hero";
import RecentTable from "./components/recent table/recentTable";
import { TypographyBold } from "@styles/style.types";
import theme from "@styles/theme";
import NhisDetails from "./components/nhis details/nhisDetails";
import Instructions from "./components/instructions/instructions";
import ResultsTable from "./components/results table/resultsTable";
import CaptureContainer from "./components/capture container/captureContainer";
import VerificationSccessfulContainer from "./components/verification successful container/verificationSuccessfulContainer";
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
