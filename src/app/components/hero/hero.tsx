'use client'

import { mainContext } from "@/app/context/context"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
import useSearchResults from "../results table/utils/useSearchResults"
import { SearchContext } from "@/app/context/searchContext"

const Hero = () => {
    const {searchValue, setSearchValue} = useContext(mainContext)
    const {getSearchResults} = useContext(SearchContext)

    useEffect(()=>{
        if(searchValue.length)
            getSearchResults({searchValue})
    },[searchValue])
    return (
        <div className="w-full bg-[#ffffff05] border-b-[1px] border-solid border-b-border-tetiary justify-center h-[300px] flex items-center">
            <div className="max-w-[1024px] w-full flex flex-col items-center justify-center gap-3">
                <div className="max-w-[600px] w-full flex flex-col gap-[2px] items-center justify-center">
                    <Image
                        src={"/assets/prod/nhis-logo.png"}
                        alt="Fvlcon logo"
                        width={70}
                        height={70}
                        layout="intrinsic"
                        className="mb-[5px]"
                    />
                    <Text
                        size={TypographySize.HL}
                        bold={TypographyBold.lg}
                        textColor={theme.colors.text.primary}
                        fontfamily="greater-theory"
                    >
                        Find and Verify NHIS Patient
                    </Text>
                    <Text
                        textAlign="center"
                    >
                        Enter the NHIS ID or patient name to retrieve their details. Verify insurance status and proceed 
                        with facial recognition for check-in.
                    </Text>
                </div>
                <Input 
                    value={searchValue}
                    setValue={setSearchValue}
                    inputClassName="!h-[30px]"
                    className="!bg-bg-tetiary"
                    placeholder="Search card ID or patient name..."
                    PreIcon={<FaMagnifyingGlass color={theme.colors.text.tetiary} />}
                    PostIcon={
                        <div className="py-[1px] px-2 border-[1px] border-solid border-[#3A3A46] rounded-lg bg-[#30303D]">
                            <div className="mt-[-2px]">
                                <Text bold={TypographyBold.md}>
                                    ⌘ K
                                </Text>
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    )
}
export default Hero