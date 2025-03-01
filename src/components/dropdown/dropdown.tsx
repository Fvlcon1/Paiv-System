"use client";

import { useState, useRef, ReactNode } from "react";
import { useClickAway } from "react-use";
import { FiMenu } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import ClickableTab from "@components/clickable/clickabletab";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import Link from "next/link";
import { DropdownItem } from "@/utils/@types";
import { AnimatePresence, motion } from 'framer-motion';

const Dropdown = (
    { 
        children,
        menuItems
     }: { 
        children?: ReactNode
        menuItems: DropdownItem[]
      }
) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useClickAway(menuRef, () => setIsOpen(false));

    return (
        <div className="relative inline-block" ref={menuRef}>
            {/* Toggle Button */}
            <div
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {children}
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>

                {isOpen && (
                    <motion.div
                        initial={{opacity : 0}}
                        animate={{opacity : 1}}
                        exit={{opacity : 0}}
                        className="absolute right-0 mt-2 min-w-[150px] bg-bg-tetiary border border-border-quantinary rounded-xl shadow-lg z-50"
                    >
                        <div className="py-1 flex flex-col">
                            {
                                menuItems.map((item, index) =>
                                    item.type === "divider" ?
                                    <div key={item.key} className="border-t border-border-quantinary my-1" />
                                    : 
                                    (
                                        <div
                                            key={item.key}
                                            className={` ${item.type === 'title' ? 'px-3' : 'px-1'}  gap-2 ${
                                                item.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                                            }`}
                                            onClick={() => {
                                                if(!item.disabled) 
                                                    setIsOpen(false)
                                                if(item.onClick)
                                                    item.onClick()
                                            }}
                                        >
                                            {
                                                item.type === 'link' ?
                                                <Link href={item.href ?? '#'}>
                                                    <div className={`${!item.disabled ? 'hover:bg-bg-quantinary px-2 py-1 rounded-md flex gap-[6px] items-center' : ''}`}>
                                                        {item.icon && <span>{item.icon}</span>}
                                                        {typeof item.label === "string" ? <Text>{item.label}</Text> : item.label}
                                                    </div>
                                                </Link>
                                                :
                                                <div className={`${!item.disabled ? 'hover:bg-bg-quantinary px-2 py-1 rounded-md flex gap-[6px] items-center' : ''}`}>
                                                    {item.icon && <span>{item.icon}</span>}
                                                    {typeof item.label === "string" ? <Text>{item.label}</Text> : item.label}
                                                </div>
                                            }
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
