import Text from "@styles/components/text"

export const columns = [
    {
        accessorKey : 'image',
        header : 'IMAGE',
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
        header : 'FIRST NAME',
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
        header : 'OTHER NAMES',
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
        header : 'LAST NAME',
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
        accessorKey : 'nhisId',
        header : 'NHIS NUMBER',
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
        header : 'LAST VISIT',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    // {
    //     accessorKey : 'checkout',
    //     header : 'CEHCKOUT',
    //     cell : ({getValue} : {getValue : any}) => {
    //         return (
    //             <Text>
    //                 {getValue()}
    //             </Text>
    //         )
    //     }
    // },
    {
        accessorKey : 'verificationStatus',
        header : 'VERIFICATION STATUS',
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
        header : 'GENDER',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <Text>
                    {getValue()}
                </Text>
            )
        }
    },
    // {
    //     accessorKey : 'cardValidity',
    //     header : 'CARD VALIDITY',
    //     cell : ({getValue} : {getValue : any}) => {
    //         return (
    //             <Text>
    //                 {getValue()}
    //             </Text>
    //         )
    //     }
    // },
]