'use client'

import { protectedApi } from "@/app/utils/apis/api"
import { DispositionViewState } from "@/app/utils/types"
import { DropdownItem } from "@/utils/@types"
import Button from "@components/button/button"
import Container from "@components/container/container"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BiSolidCategoryAlt } from "react-icons/bi"
import { FaAngleDown } from "react-icons/fa"
import { IDispositionType } from "@/app/components/results table/utils/type"
import { useEncounterContext } from "../../../context/encounter.context"

const SelectDisposition = () => {
    const {setDispositionViewState, setSelectedDisposition} = useEncounterContext()
    const [isVisible, setIsVisible] = useState(true)
    const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([])
    const [dispositionValue, setDispositionValue] = useState<string>()
    const [searchValue, setSearchValue] = useState<string>('')
    const [error, setError] = useState<string>()

    const getDisposition = async () => {
        const response = await protectedApi.GET("/api/dispositions")
        return response.data
    }

    const setDispositionDropdown = (data: IDispositionType[]) => {
        const transformedData: DropdownItem[] = data.flatMap((item, index) => {
            const items : DropdownItem[] = [
                {
                    key: item.id,
                    label: item.name,
                    onClick: () => {
                        setSelectedDisposition(item)
                        setSearchValue(item.name)
                    }
                },
            ];
            if (index < data.length - 1) {
                items.push({
                    type: "divider",
                    key: `divider-${item.id}`,
                });
            }
            return items;
        });
    
        setDropdownItems(transformedData);
    };      

    const {mutate : getDispositionMutation, isPending} = useMutation({
        mutationFn : getDisposition,
        onSuccess : (data)=>setDispositionDropdown(data)
    })

    const handleContinue = () => {
        if(!searchValue.length)
            return setError("Please select a disposition")
        setDispositionViewState(DispositionViewState.INSTRUCTIONS)
    }

    useEffect(()=>{
        if(searchValue.length)
            setError(undefined)
    },[searchValue])

    useEffect(()=>{
        getDispositionMutation()
    },[])

    useEffect(()=>{
        if(!isVisible)
            setDispositionViewState(null)
    },[isVisible])
    return (
        <>
            <Overlay onClick={() => setDispositionViewState(null)}>
                <Container
                    className="w-[450px] !px-10 !py-6"
                    display={isVisible}
                    setDisplay={setIsVisible}
                >
                    <div className="flex w-full flex-col gap-1">
                        <Image
                            src={"/assets/prod/nhis-logo.png"}
                            alt="logo"
                            width={50}
                            height={50}
                            style={{ height: "auto", width: 50 }}
                            className="ml-[-3px]"
                        />
                        <Text
                            bold={TypographyBold.md}
                            size={TypographySize.HM}
                        >
                            Select Disposition
                        </Text>
                        <Dropdown
                            menuItems={dropdownItems}
                            className="w-full max-h-[300px] overflow-y-auto"
                            outterContainerClassName="w-full"
                        >
                            <Input 
                                value={searchValue}
                                setValue={setSearchValue}
                                className="!rounded-lg"
                                placeholder="Please select disposition"
                                PreIcon={(
                                    <BiSolidCategoryAlt 
                                        color={theme.colors.text.secondary}
                                    />
                                )}
                                PostIcon={(
                                    <FaAngleDown 
                                        color={theme.colors.text.secondary}
                                    />
                                )}
                            />
                        </Dropdown>
                        {
                            error &&
                            <Text textColor="#db4040" className="pl-1">
                                {error}
                            </Text>
                        }
                        <Button
                            text="Continue"
                            className="!bg-bg-quantinary !mt-1"
                            onClick={handleContinue}
                        />
                    </div>
                </Container>
            </Overlay>
        </>
    )
}
export default SelectDisposition