import { protectedApi } from "@/app/utils/apis/api"
import { useMutation, useQuery } from "@tanstack/react-query"

const useClaims = () => {
    const fetchClaims = async () => {
        const response = await protectedApi.GET('/claims/')
        console.log({response})
        return response
    }

    const {data: claimsData, isLoading: fetchClaimsLoading} = useQuery({
        queryKey: ['claims'],
        queryFn: fetchClaims
    })

    return {
        claimsData,
        fetchClaimsLoading
    }
}
export default useClaims