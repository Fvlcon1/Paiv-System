import Text from "@styles/components/text";
import Hero from "./components/hero/hero";
import RecentTable from "./components/recent table/recentTable";
import { TypographyBold } from "@styles/style.types";
import theme from "@styles/theme";
import NhisDetails from "./components/nhis details/nhisDetails";
import Instructions from "./components/instructions/instructions";
import ResultsTable from "./components/results table/resultsTable";

export default function Home() {
  return (
    <>
      {/* <NhisDetails /> */}
      {/* <Instructions /> */}
      <div className="flex flex-col gap-[30px]">
        <Hero />
        <div className="w-full flex flex-col px-[30px] gap-[15px] items-center">
          <div className="w-full min-[800px] max-w-[1024px]">
            <Text
              textColor={theme.colors.text.primary}
              bold={TypographyBold.md}
            >
              Recent Visits
            </Text>
          </div>
          {/* <RecentTable /> */}
          <ResultsTable />
        </div>
      </div>
    </>
  );
}
