"use client";

import { useState, useRef, ReactNode } from "react";
import { useClickAway } from "react-use";
import { FiMenu } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import ClickableTab from "@components/clickable/clickabletab";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import Link from "next/link";

interface DropdownItem {
    key: string;
    label?: ReactNode | string;
    disabled?: boolean;
    type?: "divider" | "title" | "link"
    href? : string
    icon?: ReactNode;
}

const Dropdown = ({ children }: { children?: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useClickAway(menuRef, () => setIsOpen(false));

    const menuItems: DropdownItem[] = [
        { key: "1", label: "Menu", type : 'title', disabled: true },
        { key: "2", type : 'link', href : "/claims", label: "Claims" },
        { type: "divider", key: "divider-2" },
        { key: "3", label: "Settings", icon: <IoMdSettings color={theme.colors.text.secondary} /> },
    ];

    return (
        <div className="relative inline-block" ref={menuRef}>
            {/* Toggle Button */}
            <div
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <ClickableTab>
                    <FiMenu color={theme.colors.text.secondary} />
                </ClickableTab>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
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
                                        onClick={() => !item.disabled && setIsOpen(false)}
                                    >
                                        {
                                            item.type === 'link' ?
                                            <Link href={item.href ?? '#'}>
                                                <div className={`${!item.disabled ? 'hover:bg-bg-quantinary px-2 py-[6px] rounded-md flex gap-[6px] items-center' : ''}`}>
                                                    {item.icon && <span>{item.icon}</span>}
                                                    {typeof item.label === "string" ? <Text>{item.label}</Text> : item.label}
                                                </div>
                                            </Link>
                                            :
                                            <div className={`${!item.disabled ? 'hover:bg-bg-quantinary px-2 py-[6px] rounded-md flex gap-[6px] items-center' : ''}`}>
                                                {item.icon && <span>{item.icon}</span>}
                                                {typeof item.label === "string" ? <Text>{item.label}</Text> : item.label}
                                            </div>
                                        }
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
