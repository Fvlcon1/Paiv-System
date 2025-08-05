'use client'

import TopSection from "./components/top-section";
import Table from "./components/table";

const PatientVerification = () => {
    return (
        <div className="w-full h-full flex flex-col pt-12 gap-6 px-8 items-center">
            <div className="px-4 py-2 w-full max-w-[var(--max-page-width)] flex items-center justify-center">
                <TopSection />
            </div>
            <Table />
        </div>
    )
}
export default PatientVerification