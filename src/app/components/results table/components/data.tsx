import Text from "@styles/components/text"

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
    // {
    //     accessorKey : 'checkout',
    //     header : 'Checkout',
    //     cell : ({getValue} : {getValue : any}) => {
    //         return (
    //             <Text>
    //                 {getValue()}
    //             </Text>
    //         )
    //     }
    // },
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
    {
        accessorKey : 'verifyVisit',
        header : 'Verify Visit',
        cell : ({getValue} : {getValue : any}) => {
            return (
                <>{getValue()}</>
            )
        }
    },
]