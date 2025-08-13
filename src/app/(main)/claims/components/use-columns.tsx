import Text from "@styles/components/text"
import { Progress } from "antd"
import { BsThreeDots } from "react-icons/bs"
import { useTheme } from "@styles/theme-context"
import { getRelativeTime } from "@/utils/getDate"

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

const useColumns = () => {
    const { theme } = useTheme()
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
            accessorKey: 'expectedPayout',
            header: 'Expected Payout',
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
            accessorKey: 'actions',
            header: 'Actions',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <BsThreeDots color={theme.colors.text.tetiary} size={20} />
                )
            }
        },
    ]
    return { columns }
}
export default useColumns