import Text from "@styles/components/text"
import { Progress } from "antd"
import { BsThreeDots } from "react-icons/bs"
import { useTheme } from "@styles/theme-context"
import { getRelativeTime } from "@/utils/getDate"
import Image from "next/image"

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
    status = status ? "successful" : "failed"
    const { theme } = useTheme()

    const color = {
        "successful": theme.colors.text.success,
        "failed": theme.colors.text.danger
    }

    const bgColor = {
        "successful": "bg-green-100",
        "failed": "bg-red-100"
    }
    return (
        <div className={`flex items-center w-fit gap-2 px-3 py-1 rounded-full ${bgColor[status as keyof typeof bgColor]}`}>
            <Text
                textColor={color[status as keyof typeof color]}
            >
                {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
            </Text>
        </div>
    )
}

const useColumns = () => {
    const { theme } = useTheme()
    const columns = [
        // {
        //     accessorKey: 'image',
        //     header: 'Image',
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             getValue() ?
        //             <div className="rounded-lg overflow-hidden relative w-[35px] h-[35px] ">
        //                 <Image
        //                     src={getValue() ?? null}
        //                     alt="profile image"
        //                     width={35}
        //                     height={35}
        //                     style={{ height: "auto", width: "100%" }}
        //                 />
        //             </div>
        //             : null
        //         )
        //     }
        // },
        // {
        //     accessorKey: 'firstname',
        //     header: 'First Name',
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             <Text>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        {
            accessorKey : 'lastname',
            header : 'Last Name',
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <div className="py-2">
                        <Text bold={theme.text.bold.md}>
                            {getValue()}
                        </Text>
                    </div>
                )
            }
        },
        {
            accessorKey: 'othernames',
            header: 'Other Names',
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'nhisId',
            header: 'NHIS Number',
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'verificationStatus',
            header: 'Status',
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Status
                        status={getValue()}
                    />
                )
            }
        },
        {
            accessorKey: 'checkIn',
            header: 'Check in',
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text>
                        {getRelativeTime(getValue())}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'checkout',
            header: 'Check out',
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text>
                        {getRelativeTime(getValue())}
                    </Text>
                )
            }
        },
    ]
    return { columns }
}
export default useColumns