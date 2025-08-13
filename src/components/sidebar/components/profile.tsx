'use client'

import { useState, useRef } from "react";
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { FaAngleDown } from "react-icons/fa"
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from "react-use"
import Input from "@components/input/input"
import { FaMagnifyingGlass } from "react-icons/fa6"
import Link from "next/link";
import { IoMdPulse } from "react-icons/io";
import Image from "next/image";
import Logo from "@components/logo/logo";
import { MdLocalHospital } from "react-icons/md";

const Profile = () => {
    const [isProfileVisible, setIsProfileVisible] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const containerRef = useRef<HTMLDivElement>(null); 

    useClickAway(containerRef, () => {
        setIsProfileVisible(false);
    });

    const Hospital = () => {
        return (
            <div className="flex w-full p-3 border-b border-bg-primary/10">
                <div className="flex w-full h-[50px] gap-1 items-center p-3 px-2 rounded-lg bg-bg-primary/10">
                    <MdLocalHospital size={35} color={theme.colors.bg.primary} />
                    <div className="flex flex-col gap-1">
                        <Text 
                            textColor={theme.colors.bg.primary}
                        >
                            37 Military Hospital
                        </Text>
                        <Text 
                            textColor={theme.colors.bg.quantinary}
                        >
                            Liberation road, Accra
                        </Text>
                    </div>
                </div>
            </div>
        )
    }

    const LogoProfile = () => {
        return (
            <div className="w-full h-[50px] justify-center flex flex-col gap-1 p-4 border-b border-bg-primary/10">
                <div className="relative justify-center flex flex-col" ref={containerRef}>

                    {/* Profile Button */}
                    <Link className="flex items-center gap-2" href={'/'}>
                        <Logo size={22} color="light" />
                        <Text 
                            bold={TypographyBold.md}
                            size={TypographySize.body2}
                            textColor={theme.colors.bg.primary}
                        >
                            PAIV System
                        </Text>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col">
            {/* <LogoProfile /> */}
            <Hospital />
        </div>
    )
}
export default Profile