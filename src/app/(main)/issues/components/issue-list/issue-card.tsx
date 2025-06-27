import { useState } from "react"
import Text from "@styles/components/text"
import { BsClipboard2CheckFill } from "react-icons/bs"
import theme from "@styles/theme"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@components/button/button"
import { TiUserAdd } from "react-icons/ti"
import { hexOpacity } from "@/utils/hexOpacity"
import { MdPending } from "react-icons/md"
import { FaCheckCircle, FaUserClock } from "react-icons/fa"
import { IoMdAddCircle } from "react-icons/io"
import { Issue } from "../../utils/types"
import getDate from "@/utils/getDate"

const Priority = ({
    priority
}: {
    priority: string
}) => {
    const getPriorityColor = () => {
        switch (priority) {
            case "high":
                return "#c74c4c"
            case "medium":
                return "#FF5555"
            case "low":
                return "#FF5555"
            default:
                return "#FF5555"
        }
    }
    return (
        <div
            className="px-3 py-1 rounded-full flex border-[1px]"
            style={{
                backgroundColor: getPriorityColor() + hexOpacity(10),
                borderColor: getPriorityColor() + hexOpacity(20)
            }}
        >
            <Text
                bold={theme.typography.bold.md}
                textColor={getPriorityColor()}
            >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Text>
        </div>
    )
}

const Completed = () => {
    return (
        <div
            className="px-3 py-1 rounded-full flex w-fit"
            style={{
                backgroundColor : getStatusColor({ status: "completed" }),
            }}
        >
            <Text
                bold={theme.typography.bold.md}
                textColor={theme.colors.bg.primary}
            >
                Completed
            </Text>
        </div>
    )
}

const Pending = () => {
    return (
        <div
            className="px-3 py-1 rounded-full flex w-fit"
            style={{
                backgroundColor : getStatusColor({ status: "pending" }),
            }}
        >
            <Text
                bold={theme.typography.bold.md}
                textColor={theme.colors.bg.primary}
            >
                Pending
            </Text>
        </div>
    )
}

const Unassigned = () => {
    return (
        <div
            className="px-3 py-1 rounded-full flex w-fit border-[1px]"
            style={{
                borderColor : getStatusColor({ status: "unassigned" }),
            }}
        >
            <Text
                bold={theme.typography.bold.md}
                textColor={theme.colors.main.primary}
            >
                Unassigned
            </Text>
        </div>
    )
}

const New = () => {
    return (
        <div
            className="px-3 py-1 rounded-full flex w-fit"
            style={{
                backgroundColor : getStatusColor({ status: "new" }),
            }}
        >
            <Text
                bold={theme.typography.bold.md}
                textColor={theme.colors.bg.primary}
            >
                New
            </Text>
        </div>
    )
}

const getStatus = ({
    status
}: {
    status: string
}) => {
    switch (status) {
        case "completed":
            return <Completed />
        case "pending":
            return <Pending />
        case "unassigned":
            return <Unassigned />
        case "new":
            return <New />
        default:
            return <Unassigned />
    }
}

const getStatusColor = ({
    status
}: {
    status: string
}) => {
    switch (status) {
        case "new":
            return "#C786E8"
        case "completed":
            return "#69A862"
        case "pending":
            return "#fc7f03"
        case "unassigned":
            return "#7798A8"
        default:
            return "#7798A8"
    }
}

const getStatusIcon = ({
    status
}: {
    status: string
}) => {
    switch (status) {
        case "new":
            return <IoMdAddCircle size={13} color={theme.colors.bg.primary}/>
        case "completed":
            return <FaCheckCircle size={13} color={theme.colors.bg.primary}/>
        case "pending":
            return <MdPending size={13} color={theme.colors.bg.primary}/>
        case "unassigned":
            return <FaUserClock size={13} color={theme.colors.bg.primary}/>
        default:
            return <BsClipboard2CheckFill size={13} color={theme.colors.bg.primary}/>
    }
}

const IssueCard = ({
    title,
    status,
    id,
    reasons,
    createdAt,
}: Issue) => {
    const [expanded, setExpanded] = useState(false)
    const color = getStatusColor({ status })

    return (
        <div className="flex w-full flex-col">
            <div className="flex w-full">
                {/* left */}
                <div className="flex flex-col pt-8">
                    <div className="flex items-center">
                        <Text className="mr-2">{getDate(new Date(createdAt))}</Text>
                        <div className="w-[30px] h-[1px] bg-[#DFE7EA]" />
                        <div 
                            className="w-[35px] h-[35px] border-[3px] border-bg-primary rounded-full flex items-center justify-center"
                            style={{
                                backgroundColor: color
                            }}
                        >
                            {getStatusIcon({ status })}
                        </div>
                        <div className="w-[30px] h-[1px] bg-[#DFE7EA]" />
                    </div>
                    {getStatus({ status })}
                </div>

                {/* right */}
                <div className="flex-1 flex flex-col gap-2 relative py-6">
                    <div 
                        className="absolute top-0 left-[-48px] z-[-1] w-[1px] h-full" 
                        style={{
                            backgroundColor: color
                        }}
                    />
                    <div 
                        className="w-full rounded-2xl flex flex-col"
                        style={{
                            backgroundColor: color + hexOpacity(10)
                        }}
                    >
                        {/* title */}
                        <div className="flex items-center gap-3 px-3 py-2">
                            <Text bold={theme.typography.bold.md}>
                                {title} &nbsp;&nbsp;&nbsp;-
                            </Text>
                            <div 
                                className="flex px-3 py-1 rounded-full"
                                style={{
                                    backgroundColor: color + hexOpacity(20)
                                }}
                            >
                                <Text bold={theme.typography.bold.md}>
                                    #{id}
                                </Text>
                            </div>
                        </div>

                        {/* body */}
                        <div 
                            className="flex-1 px-3 py-3 border-[1px] bg-bg-primary rounded-2xl flex items-stretch"
                            style={{
                                borderColor: color + hexOpacity(20)
                            }}
                        >
                            <div 
                                className="self-stretch w-[5px] rounded-full" 
                                style={{
                                    backgroundColor: color
                                }}
                            />
                            <div className="h-full w-full gap-2 flex flex-col pl-4">
                                <div className="flex flex-col">
                                    <Text>
                                        {reasons[0]?.description}
                                    </Text>
                                    <Text>
                                        {reasons[0]?.detail}
                                    </Text>
                                </div>

                                {/* Collapsible */}
                                <AnimatePresence initial={false}>
                                    {expanded && (
                                        <motion.div
                                            className="w-full flex flex-col gap-2"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="w-full h-[1px] bg-[#DFE7EA]" />
                                            <Text>
                                                {reasons[0].evidence}
                                            </Text>

                                            <div 
                                                className="w-full flex flex-col px-3 py-2 rounded-xl"
                                                style={{
                                                    backgroundColor: color + hexOpacity(10)
                                                }}
                                            >
                                                <Text textColor={theme.colors.text.tetiary}>
                                                    Recommendation
                                                </Text>
                                                <Text>
                                                    {reasons[0].recommendations}
                                                </Text>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* <div className="flex items-center">
                                    <Text
                                        textColor={theme.colors.text.tetiary}
                                        className="!cursor-pointer hover:!opacity-[0.5] duration-200"
                                        onClick={() => setExpanded(!expanded)}
                                    >
                                        {expanded ? "Collapse" : "Expand"}
                                    </Text>
                                </div> */}

                            </div>
                        </div>
                    </div>

                    {/* actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            text="Assign to"
                            icon={(
                                <TiUserAdd />
                            )}
                            background="#7798A8"
                            className="!rounded-full !h-[28px] !py-0"
                        />
                        {/* <Priority
                            priority={priority}
                        /> */}
                        <Text
                            textColor={theme.colors.text.tetiary}
                            className="!cursor-pointer hover:!opacity-[0.5] duration-200"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? "Collapse" : "Expand"}
                        </Text>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default IssueCard
