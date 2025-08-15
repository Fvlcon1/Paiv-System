import Divider from "@components/divider/divider"
import Text from "@styles/components/text"
import PatientBanner from "../../patientBanner"
import { gradientClass } from "@/utils/constants"
import theme from "@styles/theme"
import { IoMdListBox } from "react-icons/io"
import { useState } from "react"

const tabs = [
    { label : "Service Type" },
    { label : "Service Outcome" },
    { label : "Type of Attendance" },
    { label : "Specialties Attended" },
    { label : "Diagnosis" },
    { label : "Medical Procedures" },
    { label : "Prescriptions" },
    { label : "Investigations" }
]

const Sidenav = () => {
    const [activeTab, setActiveTab] = useState("Service Type")
    const handleTabClick = (tab : string) => {
        setActiveTab(tab)
    }
    return (
        <div className="py-2 pr-4 w-[300px] h-[800px] flex flex-col gap-2">
            <div className="flex flex-col w-full gap-2">
                {/* <PatientBanner /> */}
                {/* <Divider /> */}
                <div className="flex flex-col gap-2">
                    <div className="flex rounded-full items-center gap-1 bg-bg-secondary px-3 py-2">
                        <IoMdListBox color={theme.colors.text.secondary} />
                        <Text bold={theme.text.bold.md}>
                            Tabs
                        </Text>
                    </div>
                    <div className="flex flex-col gap-2 border-l border-border-primary ml-5">
                        {
                            tabs.map((tab, index) => {
                                return (
                                    <div 
                                        className={`flex py-2 px-4 relative`}
                                        key={index}
                                        onClick={() => handleTabClick(tab.label)}
                                    >
                                        <div className={`absolute left-[-2px] top-0 rounded-full h-full w-[3px] ${activeTab === tab.label ? "bg-gradient-to-b from-main-primary to-main-primary-gradient" : "hidden"}`} />
                                        <Text
                                            textColor={theme.colors.text.tetiary}
                                            bold={activeTab === tab.label ? theme.text.bold.md2 : theme.text.bold.sm2}
                                            className={`${activeTab === tab.label ? gradientClass : ""} cursor-pointer duration-200 hover:!text-text-secondary`}
                                        >
                                            {tab.label}
                                        </Text>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sidenav