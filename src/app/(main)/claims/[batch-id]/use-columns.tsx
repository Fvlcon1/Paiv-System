import Text from "@styles/components/text"
import { Progress } from "antd"
import { BsThreeDots } from "react-icons/bs"
import { useTheme } from "@styles/theme-context"
import { getRelativeTime } from "@/utils/getDate"
import Dropdown from "@components/dropdown/dropdown"
import ClickableTab from "@components/clickable/clickabletab"
import { DropdownItem } from "@/utils/@types"

const ProgressCircle = ({ percent }: { percent: number }) => {
    const { theme } = useTheme()
    return (
        <Progress
            //   type="circle"
            percent={percent}
            steps={8}
            trailColor={theme.colors.bg.tetiary}
            strokeColor={"#24ad4e"}
            strokeWidth={10}
            size={15}
        />
    )
}

const Status = ({ status }: { status: string }) => {
    const { theme } = useTheme()

    const color = {
        "pending": "#f59e0b",
        "approved": theme.colors.text.success,
        "rejected": theme.colors.text.danger
    }

    const bgColor = {
        "pending": "bg-orange-100",
        "approved": "bg-green-100",
        "rejected": "bg-red-100"
    }
    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bgColor[status as keyof typeof bgColor]}`}>
            <Text
                textColor={color[status as keyof typeof color]}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
        </div>
    )
}

const useColumns = () => {
    const { theme } = useTheme()

    const actionOptions: DropdownItem[] = [
        { key: "edit-claim", label: "Edit Claim", onClick: () => {  } },
        { key: "delete-claim", label: "Delete Claim", onClick: () => {  } },
    ]

    const columns = [
        {
            accessorKey: 'id',
            header: 'Encounter Token',
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
            accessorKey: 'claimId',
            header: 'Claim ID',
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
            accessorKey: 'patientName',
            header: 'Patient Name',
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
            accessorKey: 'nhisId',
            header: 'NHIS ID',
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
            accessorKey: 'status',
            header: 'Verification Status',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Status status={getValue()} />
                )
            }
        },
        {
            accessorKey: 'dateSubmitted',
            header: 'Date Submitted',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getRelativeTime(getValue())}
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
                    <Text ellipsis lineHeight={1}>
                        {getRelativeTime(getValue())}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'serviceType',
            header: 'Service Type',
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
        //     accessorKey : 'dateProcessed',
        //     header : 'Date Processed',
        //     enableSorting : true,
        //     cell : ({getValue} : {getValue : any}) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getRelativeTime(getValue())}
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