import { message } from "antd"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { INhisDetails, IRearchResults } from "./type"
import Image from "next/image"
import { VscUnverified } from "react-icons/vsc"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import { mainContext } from "@/app/context/context"
import Button from "@components/button/button"
import { ViewState } from "@/app/utils/types"

const useSearchResults = () => {
    const {setSearchMembersResult, setNhisDetails, setShowNhisDetails, setViewState} = useContext(mainContext)
    
    const getSearchResults = async ({
        searchValue,
    } : {
        searchValue? : string
    }) => {
        try {
            const getVisits = await axios.get(
                "https://j8juo9cz2p675o-8080.proxy.runpod.net/autocomplete/memberships", {
                    params : {
                        query : searchValue,
                    }
                }
            )
            const visits =  getVisits.data
            console.log({visits})
            if(visits){
                const transformVisit : IRearchResults[] = visits.map((visit : any) => {
                    const NHISDetails : INhisDetails = {
                        firstname : visit.first_name,
                        othernames : visit.middle_name,
                        lastname : visit.last_name,
                        nhisId : visit.nhis_number,
                        lastVisit : (new Date(visit.last_visit)).toDateString(),
                        gender : visit.gender,
                        dob : (new Date(visit.date_of_birth)).toDateString(),
                        maritalStatus : visit.marital_status,
                        expirtyDate : visit.current_expiry_date,
                        enrolementStatus : visit.enrolment_status,
                        insuranceType : visit.insurance_type,
                        issueDate : visit.issue_date,
                        residentialAddress : visit.residential_address,
                        phoneNumber : visit.phone_number,
                        ghanaCardNumber : visit.ghana_card_number,
                        memberShipId : visit.membership_id
                    }
                    return {
                        ...NHISDetails,
                        image : (
                            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                                <Image
                                    src={visit.profile_image_url}
                                    alt="profile image"
                                    layout="intrinsic"
                                    width={50}
                                    height={50}
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
                        verifyVisit : (
                            <Button
                                text="View Details"
                                onClick={()=>{
                                    setNhisDetails({...NHISDetails, imageUrl : visit.profile_image_url})
                                    setViewState(ViewState.NHIS_DETAILS)
                                }}
                            />
                        )
                    }
                })
                console.log({transformVisit})
                setSearchMembersResult(transformVisit)
            }
            return visits
        } catch (error) {
            console.log("Error fetching members", error)
        }
    }
    return {getSearchResults}
}

export default useSearchResults