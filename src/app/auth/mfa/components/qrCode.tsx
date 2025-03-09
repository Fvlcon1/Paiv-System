'use client'

import { protectedApi } from "@/app/utils/apis/api"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import toast from "react-hot-toast"
import MobileAuthCode from "./mobileAuthCode"

const QRCode = () => {
    const getQRCode = async () => {
        const response = await protectedApi.POST("2fa/setup")
        console.log({response})
    }

    const {mutate : getQRCodeMutation, isPending} = useMutation({
        mutationFn : getQRCode,
        onError : (error) => {
            toast.error("Error getting qr code")
            console.log({error})
        }
    })

    useEffect(()=>{
        getQRCodeMutation()
    },[])

    return (
        <div className="flex flex-col mt-[35px]">
            <div className="flex flex-col gap-2 items-center">
                <Text
                    fontfamily="greater-theory"
                    textColor={theme.colors.text.primary}
                    size={TypographySize.body2}
                >
                    Scan Qr code
                </Text>
                <div className="w-[300px] h-[300px] rounded-xl bg-[#ffffff0a] p-6">

                </div>
                <MobileAuthCode />
            </div>
        </div>
    )
}
export default QRCode