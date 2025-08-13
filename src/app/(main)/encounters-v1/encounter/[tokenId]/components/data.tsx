import Text from "@styles/components/text"
import Image from "next/image"
import Copychip from "@components/chip/copyChip"
import { IClaims } from "@/app/(main)/claims-v1/utils/types"

export const data : IClaims[] = [
    {
        image : (
            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                <Image
                    src={"/assets/dev/profile.png"}
                    alt="logo"
                    width={50}
                    height={50}
                />
            </div>
        ),
        status : <Text textColor="green">Successful</Text>,
        token : (
            <Copychip>
                lkjsdfasdf89uaweoifjdsasdf
            </Copychip>
        ),
        visitDate : new Date(),
        firstname : "Chris",
        othernames : "Oduro",
        lastname : "Ampeh",
        nhisId : "9832993",
    },
    {
        image : (
            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                <Image
                    src={"/assets/dev/profile.png"}
                    alt="logo"
                    width={50}
                    height={50}
                />
            </div>
        ),
        status : <Text textColor="orange">pending</Text>,
        token : (
            <Copychip>
                lkjsdfasdf89uaweoifjdsasdf
            </Copychip>
        ),
        visitDate : new Date(),
        firstname : "Chris",
        othernames : "Oduro",
        lastname : "Ampeh",
        nhisId : "9832993",
    },
    {
        image : (
            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                <Image
                    src={"/assets/dev/profile.png"}
                    alt="logo"
                    width={50}
                    height={50}
                />
            </div>
        ),
        status : <Text textColor="red">Declined</Text>,
        token : (
            <Copychip>
                lkjsdfasdf89uaweoifjdsasdf
            </Copychip>
        ),
        visitDate : new Date(),
        firstname : "Chris",
        othernames : "Oduro",
        lastname : "Ampeh",
        nhisId : "9832993",
    }
]

export const columns = [
    {
        accessorKey : 'image',
        header : 'Image',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'firstname',
        header : 'First Name',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'othernames',
        header : 'Other Names',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'lastname',
        header : 'Last Name',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'nhisId',
        header : 'NHIS Number',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'token',
        header : 'Token',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'visitDate',
        header : 'Visit Date',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue().toDateString()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'status',
        header : 'Status',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
]