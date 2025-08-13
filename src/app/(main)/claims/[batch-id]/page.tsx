'use client'
import Text from "@styles/components/text"
import { useParams } from "next/navigation"
import { useState } from "react"
import { DropdownItem } from "@/utils/@types"
import { Fragment } from "react"
import Link from "next/link"
import { RiHome6Fill } from "react-icons/ri"
import { IconType } from "react-icons"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { FaChevronDown } from "react-icons/fa6"
import { IoFilter } from "react-icons/io5"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { gradientClass } from "@/utils/constants"
import SlideIn from "@styles/components/slidein"
import { useTheme } from "@styles/theme-context"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useRouter } from "next/navigation"
import Table from "./table"
import Top from "./top"
import FilterSlider from "./filter-slider"

interface ICrumbs {
    icon?: IconType
    title?: string
    path: string
    active?: boolean
}

const Claims = () => {
    return (
        <>
            <FilterSlider />
            <SlideIn
                direction="right"
                className="w-full flex flex-col gap-2 py-4"
            >
                <Top />
                <Table />
            </SlideIn>
        </>
    )
}
export default Claims