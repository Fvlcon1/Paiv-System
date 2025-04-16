import { mainContext } from "@/app/context/context"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useContext, useEffect, useRef, useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"

const TopSection = () => {
    const {searchValue, setSearchValue} = useContext(mainContext)
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (event.metaKey && event.key.toLowerCase() === "k") || // ⌘ + K for Mac
                (event.ctrlKey && event.key.toLowerCase() === "k")  // Ctrl + K for Windows
            ) {
                event.preventDefault(); // Prevent browser search popup
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="flex flex-col w-full gap-1">
            <Text
                size={TypographySize.HL}
                bold={TypographyBold.lg}
                textColor={theme.colors.text.secondary}
                fontfamily="greater-theory"
                className="pl-[2px]"
            >
                Encounters
            </Text>
            <Input
                value={searchValue}
                setValue={setSearchValue}
                inputClassName="!h-[30px]"
                className="!h-[45px] !bg-bg-primary"
                ref={inputRef}
                placeholder="Search card ID or patient name..."
                PreIcon={<FaMagnifyingGlass color={theme.colors.text.tetiary} />}
                PostIcon={
                    <div className="py-[1px] px-2 border-[1px] border-solid border-border-primary rounded-lg bg-bg-secondary">
                        <div className="mt-[-2px]">
                            <Text bold={TypographyBold.md}>
                                ⌘ K
                            </Text>
                        </div>
                    </div>
                }
            />
        </div>
    )
}
export default TopSection