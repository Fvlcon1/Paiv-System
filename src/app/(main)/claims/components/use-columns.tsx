import Text from "@styles/components/text"
import { Progress, ProgressProps } from "antd"
import { BsThreeDots } from "react-icons/bs"
import { useTheme } from "@styles/theme-context"
import getDate, { getRelativeTime } from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import Dropdown from "@components/dropdown/dropdown"
import { DropdownItem } from "@/utils/@types"
import { useClaimsContext } from "../context/claims-context"

const ProgressCircle = ({ percent }: { percent: number }) => {
    const strokeColor: ProgressProps['strokeColor'] = {
        // '0%': '#f09e60',
        '100%': '#55c416',
    };

    return (
        <Progress
            percent={percent}
            strokeColor={strokeColor}
        />
    )
}

const Status = ({ status }: { status: string }) => {
    const { theme } = useTheme()
    const color = {
        "not submitted" : theme.colors.text.tetiary,
        "submitted" : theme.colors.text.secondary,
        "processing" : "#f59e0b",
        "completed" : theme.colors.text.success,
        "under review" : theme.colors.text.danger    
    }
    const bgColor = {
        "not submitted" : "bg-bg-tetiary",
        "submitted" : "bg-bg-tetiary",
        "processing" : "bg-orange-100",
        "completed" : "bg-green-100",
        "under review" : "bg-red-100"    
    }
    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bgColor[status as keyof typeof bgColor]}`}>
            <Text
                textColor={color[status as keyof typeof color]}
                ellipsis
            >
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </Text>
        </div>
    )
}


const useColumns = () => {
    const { theme } = useTheme()
    const { showSubmitModal, setShowSubmitModal, setIsBatchDetailsVisible } = useClaimsContext()
    
    const actionOptions: DropdownItem[] = [
        { key: "submit-batch", label: "Submit Batch", onClick : () => { setShowSubmitModal(true) } },
        { key: "submit-delete", label: "Delete Batch", onClick : () => { setShowSubmitModal(true) } },
        { key: "view-batch", label: "View Details", onClick : () => { setIsBatchDetailsVisible(true) } },
    ]

    const columns = [
        {
            accessorKey: 'batchId',
            header: 'Batch ID',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text bold={theme.text.bold.md} ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'status',
            header: 'Processing Status',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Status status={getValue()} />
                )
            }
        },
        {
            accessorKey: 'submissionDate',
            header: 'Submission Date',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    getValue() ?
                    <Text ellipsis lineHeight={1}>
                        { getRelativeTime(getValue())}
                    </Text> 
                    :
                    <Text 
                        ellipsis 
                        lineHeight={1}
                        textColor={theme.colors.text.tetiary}
                    >
                        Pending...
                    </Text>
                )
            }
        },
        {
            accessorKey: 'lastModified',
            header: 'Last Modified',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    getValue() ?
                    <Text ellipsis lineHeight={1}>
                        { getRelativeTime(getValue())}
                    </Text> 
                    :
                    <Text 
                        ellipsis 
                        lineHeight={1}
                        textColor={theme.colors.text.tetiary}
                    >
                        .......
                    </Text>
                )
            }
        },
        {
            accessorKey: 'batchProgress',
            header: 'Batch Progress',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <ProgressCircle percent={getValue()} />
                )
            }
        },
        {
            accessorKey: 'claimPeriod',
            header: 'Claim Period',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getDate(new Date(getValue()), {shortmonth : true})}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'totalClaims',
            header: 'Total Claims',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'totalCost',
            header: 'Total Cost',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        // {
        //     accessorKey: 'processedClaims',
        //     header: 'Processed Claims',
        //     enableSorting: true,
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        // {
        //     accessorKey: 'flaggedClaims',
        //     header: 'Flagged Claims',
        //     enableSorting: true,
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        // {
        //     accessorKey: 'rejectedClaims',
        //     header: 'Rejected Claims',
        //     enableSorting: true,
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        // {
        //     accessorKey: 'expectedPayout',
        //     header: 'Expected Payout',
        //     enableSorting: true,
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        {
            accessorKey: 'actions',
            header: 'Actions',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Dropdown
                        menuItems={actionOptions}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <ClickableTab>
                            <BsThreeDots color={theme.colors.text.tetiary} size={20} />
                        </ClickableTab>
                    </Dropdown>
                )
            }
        },
    ]
    return { columns }
}
export default useColumns