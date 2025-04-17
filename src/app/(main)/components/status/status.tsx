import Text from "@styles/components/text"

const Status = ({
    status
} : {
    status : "successful" | "failed"
}) => {
    return (
        status === "successful" ?
        (
            <div className="px-2 py-1 rounded-lg bg-[#57cc7e2b]">
                <Text textColor="#1f753b">
                    Successful
                </Text>
            </div>
        ) : (
            <div className="px-2 py-1 rounded-lg bg-[#db40401a]">
                <Text textColor="#db4040">
                    Failed
                </Text>
            </div>
        )
    )
}
export default Status