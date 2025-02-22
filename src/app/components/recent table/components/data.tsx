import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Image from "next/image"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { VscUnverified } from "react-icons/vsc"

export const data = [
    {
        image : (
            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                <Image
                    src={"/assets/dev/profile.png"}
                    alt="Fvlcon logo"
                    width={50}
                    height={50}
                />
            </div>
        ),
        firstname : "Chris",
        othernames : "Oduro",
        lastname : "Ampeh",
        NHISID : "9832993",
        lastVisit : (new Date()).toDateString(),
        gender : 'male',
        cardValidity : (
            <div className="flex gap-1 items-center">
                <VscUnverified
                    color="#db4040"
                    size={18}
                />
                <Text
                    textColor="#db4040"
                    bold={TypographyBold.md}
                >
                    Expired
                </Text>
            </div>
        ),
    },
    {
        image : (
            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                <Image
                    src={"/assets/dev/profile.png"}
                    alt="Fvlcon logo"
                    width={50}
                    height={50}
                    layout="intrinsic"
                />
            </div>
        ),
        firstname : "Chris",
        othernames : "Oduro",
        lastname : "Ampeh",
        NHISID : "9832993",
        lastVisit : (new Date()).toDateString(),
        gender : 'male',
        cardValidity : (
            <div className="flex gap-1 items-center">
                <RiVerifiedBadgeFill
                    color="green"
                    size={18}
                />
                <Text
                    textColor="green"
                    bold={TypographyBold.md}
                >
                    Valid Card
                </Text>
            </div>
        ),
    },
    {
        image : (
            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                <Image
                    src={"/assets/dev/profile.png"}
                    alt="Fvlcon logo"
                    width={50}
                    height={50}
                    layout="intrinsic"
                />
            </div>
        ),
        firstname : "Chris",
        othernames : "Oduro",
        lastname : "Ampeh",
        NHISID : "9832993",
        lastVisit : (new Date()).toDateString(),
        gender : 'male',
        cardValidity : (
            <div className="flex gap-1 items-center">
                <VscUnverified
                    color="#db4040"
                    size={18}
                />
                <Text
                    textColor="#db4040"
                    bold={TypographyBold.md}
                >
                    Expired
                </Text>
            </div>
        ),
    },
    {
        image : (
            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                <Image
                    src={"/assets/dev/profile.png"}
                    alt="Fvlcon logo"
                    width={50}
                    height={50}
                    layout="intrinsic"
                />
            </div>
        ),
        firstname : "Chris",
        othernames : "Oduro",
        lastname : "Ampeh",
        NHISID : "9832993",
        lastVisit : (new Date()).toDateString(),
        gender : 'male',
        cardValidity : 
            <div className="flex gap-1 items-center">
                <RiVerifiedBadgeFill
                    color="green"
                    size={18}
                />
                <Text
                    textColor="green"
                    bold={TypographyBold.md}
                >
                    Valid Card
                </Text>
            </div>,
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
        accessorKey : 'dob',
        header : 'DOB',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'NHISID',
        header : 'NHISID',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'lastVisit',
        header : 'Last Visit',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'gender',
        header : 'Gender',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    {
        accessorKey : 'cardValidity',
        header : 'Card Validity',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
]