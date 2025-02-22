import { message } from "antd"
import axios from "axios"
import { useState } from "react"
import { IRecentVisits } from "./type"
import Image from "next/image"
import { VscUnverified } from "react-icons/vsc"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"

const useRecentVisits = () => {
    const [recentVisitsTableData, setRecentVisitsTableData] = useState<IRecentVisits[]>([])
    
    const getRecentVisits = async ({
        pageSize,
        pageNumber
    } : {
        pageSize? : number
        pageNumber? : number
    }) => {
        try {
            const getVisits = await axios.get(
                "https://j8juo9cz2p675o-8080.proxy.runpod.net/recent_visits?skip=0&limit=15", {
                    params : {
                        limit : pageSize,
                        skip : pageNumber ? pageNumber - 1 : undefined
                    }
                }
            )
            const visits =  getVisits.data
            console.log({visits})
            if(visits){
                const transformVisit : IRecentVisits[] = visits.map((visit : any) => {
                    console.log("hhfhgf")
                    return {
                        firstname : visit.first_name,
                        othernames : visit.middle_name,
                        lastname : visit.last_name,
                        NHISID : visit.nhis_number,
                        lastVisit : (new Date(visit.visit_date)).toDateString(),
                        gender : visit.gender,
                        dob : (new Date(visit.date_of_birth)).toDateString(),
                        image : (
                            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                                <Image
                                    src={`data:image/jpeg;base64,${visit.profile_image}`}
                                    alt="profile image"
                                    layout="intrinsic"
                                    width={50}
                                    height={50}
                                    className="w-[50px] h-[50px]"
                                />
                            </div>
                        ),
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
                    }
                })
                console.log({transformVisit})
                setRecentVisitsTableData(transformVisit)
            }
            return visits
        } catch (error) {
            console.log("Error fetching members", error)
        }
    }
    return {getRecentVisits, recentVisitsTableData}
}

export default useRecentVisits