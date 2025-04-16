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

const Profile = () => {
    const [isProfileVisible, setIsProfileVisible] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const containerRef = useRef<HTMLDivElement>(null); 

    useClickAway(containerRef, () => {
        setIsProfileVisible(false);
    });

    return (
        <div className="w-full h-[60px] justify-center flex flex-col gap-1 p-3 border-b border-border-primary">
            <div className="relative justify-center flex flex-col" ref={containerRef}>

                {/* Profile Button */}
                <Link className="flex items-center gap-2" href={'/'}>
                    <Logo />
                    <Text 
                        bold={TypographyBold.md2}
                        size={TypographySize.HM}
                        textColor={theme.colors.main.primary}
                    >
                        PAIV System
                    </Text>
                </Link>
                
            </div>
        </div>
    )
}
export default Profile