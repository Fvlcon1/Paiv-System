'use client'
import { useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useTheme } from "@styles/theme-context"
import Text from "@styles/components/text"
import { RiHome6Fill } from "react-icons/ri"
import { DropdownItem } from "@/utils/@types"
import { Fragment } from "react"
import Link from "next/link"
import { IoFilter } from "react-icons/io5"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { FaChevronDown, FaFolder } from "react-icons/fa6"
import { IoMdArrowRoundBack } from "react-icons/io"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { gradientClass } from "@/utils/constants"
import { IconType } from "react-icons"
import { DatePicker } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

interface ICrumbs {
    icon?: IconType
    title?: string
    path: string
    active?: boolean
}

const Top = () => {
    const [prescribingLevel, setPrescribingLevel] = useState<string>("All levels")
    const [status, setStatus] = useState<string>("Active")
    const { hospital } = useParams<{ hospital: string }>()
    const formattedHospitalName = hospital ? decodeURIComponent(hospital).replace(/%20/g, ' ') : ''
    const router = useRouter()
    const { theme } = useTheme()

    const crumbs: ICrumbs[] = [
        {
            icon: RiHome6Fill,
            path: "/dashboard",
        },
        {
            title: "Claims",
            path: "/claims",
            active: true
        },
    ]

    const prescribingLevels: DropdownItem[] = [
        { key: "All levels", label: "All levels", value: "All levels", isSelected: prescribingLevel === "All levels" },
        { key: "A", label: "Level A (CHIPS Compounds)", value: "A", isSelected: prescribingLevel === "A" },
        { key: "B1", label: "Level B1 (Healthe centers without a doctor)", value: "B1", isSelected: prescribingLevel === "B1" },
        { key: "B2", label: "Level B2 (Healthe centers with a doctor)", value: "B2", isSelected: prescribingLevel === "B2" },
        { key: "C", label: "Level C (District Hospitals - Primary Hospitals)", value: "C", isSelected: prescribingLevel === "C" },
        { key: "D", label: "Level D (Regional and tertiary hospitals)", value: "D", isSelected: prescribingLevel === "D" },
        { key: "M", label: "Level M (Midwifery Practice)", value: "M", isSelected: prescribingLevel === "M" },
        { key: "V", label: "Level V (Diagnostic/Dispensing-only Facilities)", value: "V", isSelected: prescribingLevel === "V" },
    ]

    const statusOptions: DropdownItem[] = [
        { key: "Active", label: "Active", value: "Active", isSelected: status === "Active" },
        { key: "Inactive", label: "Inactive", value: "Inactive", isSelected: status === "Inactive" }
    ]

    const Crumbs = () => {
        return (
            <div className="flex px-3 py-1 rounded-lg bg-bg-secondary items-center w-fit gap-1">
                {
                    crumbs.map((crumb, index) => (
                        <Fragment key={index}>
                            <Link
                                href={crumb.path}
                            >
                                <div className="flex items-center">
                                    {
                                        crumb.icon &&
                                        <crumb.icon size={15} color={theme.colors.text.tetiary} />
                                    }
                                    <Text
                                        textColor={crumb.active ? theme.colors.text.secondary : theme.colors.text.tetiary}
                                        bold={crumb.active ? theme.text.bold.md : theme.text.bold.sm2}
                                    >
                                        &nbsp;{crumb.title}
                                    </Text>
                                </div>
                            </Link>
                            {index < crumbs.length - 1 && <Text textColor={theme.colors.text.tetiary}>/</Text>}
                        </Fragment>
                    ))
                }
            </div>
        )
    }

    const Filter = () => {
        return (
            <div className="flex items-center gap-2">
                <div className="flex p-2 rounded-lg bg-bg-secondary border border-border-primary items-center">
                    <IoFilter size={17} color={theme.colors.text.secondary} />
                </div>
                <DatePicker
                    picker="year"
                    style={{
                        height: "32px",
                        borderRadius: "8px",
                        fontFamily: "montserrat",
                        fontSize: "12px",
                        color : theme.colors.text.secondary,
                        fontWeight: theme.text.bold.sm2,
                        borderColor: theme.colors.border.secondary,
                    }}
                    // value={fromDate ? [dayjs(fromDate), dayjs(toDate)] : undefined}
                    // onChange={(dates) => {
                    //     if (dates) {
                    //         setFromDate(dates[0].toISOString().split('T')[0]);
                    //         setToDate(dates[1].toISOString().split('T')[0]);
                    //     } else {
                    //         resetDate();
                    //     }
                    // }}
                />
                <Input
                    placeholder="Search batch number"
                    value={""}
                    onChange={(e) => { }}
                    PreIcon={<HiMiniMagnifyingGlass size={15} color={theme.colors.text.tetiary} />}
                    className="!h-[32px] !shadow-xs !w-[300px] !px-3"
                />
            </div>
        )
    }

    const Header = () => {
        return (
            <div className="flex items-center gap-2">
                <FaFolder
                    color={theme.colors.text.tetiary}
                    size={30}
                />
                <Text
                    size={theme.text.size.HM2}
                    textColor={theme.colors.text.secondary}
                    bold={theme.text.bold.md2}
                    className={`!pl-[2px] ${gradientClass}`}
                >
                    Claims
                </Text>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 px-4">
            <Crumbs />
            <Header />
            <Filter />
        </div>
    )
}

export default Top
