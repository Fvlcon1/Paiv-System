'use client'

import { useTheme } from "@/app/styles/theme-context"
import { useState } from "react"
import { FaUsers, FaFolderClosed } from "react-icons/fa6"
import { HiMiniWrenchScrewdriver } from "react-icons/hi2"
import { HiMagnifyingGlass } from "react-icons/hi2"
import Link from "next/link"
import Chip from "./chip"
import Text from "@styles/components/text"
import Input from "@components/input/input"
import { MdKeyboardCommandKey } from "react-icons/md"
import { useVerificationContext } from "../context/verification-context"

const TopSection = () => {
    const { theme } = useTheme()
    const [selectedFilter, setSelectedFilter] = useState<string>("All")
    const filters = ["All", "NHIS Id", "Name"]

    const links = [
        {
            href: "/encounters",
            label: "Encounters",
            icon: <FaUsers size={12} color={theme.colors.text.secondary} />
        },
        {
            href: "/claims",
            label: "Claims",
            icon: <FaFolderClosed size={12} color={theme.colors.text.secondary} />
        },
        {
            href: "/issues",
            label: "Issues",
            icon: <HiMiniWrenchScrewdriver size={12} color={theme.colors.text.secondary} />
        },
        {
            href: "/claim-support",
            label: "Claim Support",
            icon: <FaFolderClosed size={12} color={theme.colors.text.secondary} />
        },
    ]

    const LinkChips = () => {
        return (
            <div className="w-full justify-center flex mt-2">
                <div className="flex gap-2">
                    {
                        links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                            >
                                <Chip
                                    onClick={() => { }}
                                    value={link.label}
                                    icon={link.icon}
                                    className="!bg-main-primary/5"
                                />
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }

    const SearchSection = () => {
        const {searchValue, setSearchValue} = useVerificationContext()
        return (
            <div className="flex flex-col w-full max-w-[800px] bg-main-primary/5 rounded-2xl mt-2">
                <div className="flex py-2.5 px-3 items-center gap-1 w-full">
                    <HiMagnifyingGlass color={theme.colors.text.secondary} />
                    <Text>
                        Search
                    </Text>
                </div>
                <div className="flex flex-col justify-between px-3 py-2.5 w-full bg-bg-primary h-[100px] rounded-2xl border border-border-primary">
                    <Input
                        placeholder="Enter NHIS ID or patient name"
                        value={searchValue}
                        setValue={setSearchValue}
                        className="!border-none !p-0 !bg-transparent"
                    />
                    <div className="w-full justify-between flex">
                        <div className="flex items-center gap-2">
                            {
                                filters.map((filter, index) => (
                                    <Chip
                                        key={index}
                                        onClick={() => { setSelectedFilter(filter) }}
                                        value={filter}
                                        isSelected={filter === selectedFilter}
                                    />
                                ))
                            }
                        </div>
                        <div className="flex p-2 rounded-lg border border-border-primary bg-main-primary/5 items-center gap-0">
                            <MdKeyboardCommandKey size={12} color={theme.colors.text.secondary} />
                            <Text>K</Text>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const HeadSection = () => {
        return (
            <>
                <div className="flex px-2.5 py-1.5 rounded-full border border-border-primary bg-main-primary/5 items-center gap-2">
                    <div className="flex h-[7px] w-[7px] rounded-full bg-gradient-to-r from-main-primary to-main-primary-gradient" />
                    <Text>
                        Patient Verification
                    </Text>
                </div>
                <Text
                    size={theme.text.size.HM2}
                    bold={theme.text.bold.md2}
                    className="!bg-gradient-to-r !from-main-primary !to-main-primary-gradient !bg-clip-text !text-transparent"
                >
                    Find and verify patients
                </Text>
                <Text>
                    Enter the NHIS ID or patient name to retrieve patient details
                </Text>
            </>
        )
    }

    return (
        <div className="flex flex-col gap-1 items-center w-full">
            <HeadSection />
            <SearchSection />
            <LinkChips />
        </div>
    )
}

export default TopSection