import { useState } from "react"
import { useParams } from "next/navigation"
import { useTheme } from "@styles/theme-context"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useRouter } from "next/navigation"
import Text from "@styles/components/text"
import { RiHome6Fill } from "react-icons/ri"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { FaChevronDown } from "react-icons/fa"
import { IconType } from "react-icons"
import { Fragment } from "react"
import Link from "next/link"
import { DropdownItem } from "@/utils/@types"
import { IoFilter } from "react-icons/io5"
import { gradientClass } from "@/utils/constants"
import { HiAdjustmentsHorizontal, HiMiniMagnifyingGlass } from "react-icons/hi2"
import { DatePicker } from "antd"
import ClickableTab from "@components/clickable/clickabletab"
import { useEncounterContext } from "@/app/(main)/encounters/context/encounterContext"
import ConfirmationModal from "@components/modals/confirmation-modal/confirmation-modal"
const { RangePicker } = DatePicker;

interface ICrumbs {
    icon?: IconType
    title?: string
    path: string
    active?: boolean
}

const Top = () => {
    const [prescribingLevel, setPrescribingLevel] = useState<string>("All levels")
    const { isFilterVisible, setIsFilterVisible } = useEncounterContext()
    const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false)
    const [status, setStatus] = useState<string>("Active")
    const params = useParams()
    const batchId = params["batch-id"]
    const router = useRouter()
    const { theme } = useTheme()

    const crumbs: ICrumbs[] = [
        {
            icon: RiHome6Fill,
            path: "/dashboard",
        },
        {
            title: "Encounters",
            path: "/encounters",
            active: true
        },
    ]

    const Crumbs = () => {
        return (
            <div className="flex px-3 py-1 rounded-lg bg-bg-secondary items-center w-fit">
                <div className="flex items-center gap-1">
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
            </div>
        )
    }

    const Filter = () => {
        return (
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search token, patient name, NHIS ID etc..."
                        value={""}
                        onChange={(e) => { }}
                        PreIcon={<HiMiniMagnifyingGlass size={15} color={theme.colors.text.tetiary} />}
                        className="!h-[32px] !shadow-xs !w-[300px] !px-3 !pl-2"
                    />
                </div>
                <ClickableTab
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    className="bg-bg-tetiary hover:!bg-bg-quantinary !h-[35px] !w-[35px] flex items-center justify-center"
                >
                    <HiAdjustmentsHorizontal size={20} color={theme.colors.text.secondary} />
                </ClickableTab>
            </div>
        )
    }

    const Header = () => {
        return (
            <div className="flex items-center gap-2">
                <Text
                    size={theme.text.size.HM2}
                    textColor={theme.colors.text.secondary}
                    bold={theme.text.bold.md2}
                    className={`!pl-[2px] ${gradientClass}`}
                >
                    Encounters
                </Text>
            </div>
        )
    }

    return (
        <>
            <ConfirmationModal
                isVisible={showSubmitModal}
                close={() => setShowSubmitModal(false)}
                onConfirm={() => { }}
            />
            <div className="w-full flex flex-col gap-2 px-4">
                <Crumbs />
                <Header />
                <Filter />
            </div>
        </>
    )
}

export default Top
