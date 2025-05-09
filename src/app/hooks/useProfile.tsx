import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useAuth } from "../context/authContext"

const useProfile = () => {
    const {setUserDetails, userDetails} = useAuth()

    const getUserProfile = async() => {
        const response = await protectedApi.GET("/user/profile")
        return response
    }
    
    const {mutate : getUserProfileMutation, isPending : isUserProfileLoading} = useMutation({
        mutationFn : getUserProfile,
        onSuccess : (data)=>{
            console.log({data})
            setUserDetails({
                hospitalName : data.hospital_name,
                email : data.email
            })
        }
    })

    useEffect(()=>{
        if(!userDetails){
            getUserProfileMutation()
        }
    },[userDetails])
    
    return {
        isUserProfileLoading, 
        getUserProfileMutation
    }
}
export default useProfile