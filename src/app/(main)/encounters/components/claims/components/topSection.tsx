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
        <div className="w-full bg-[#ffffff05] border-b-[1px] border-solid border-b-border-primary justify-center pt-[30px] h-[200px] flex items-center">
            <div className="max-w-[1024px] w-full flex flex-col justify-center gap-1">
                <Text
                    size={TypographySize.HL}
                    bold={TypographyBold.lg}
                    textColor={theme.colors.text.primary}
                    fontfamily="greater-theory"
                    className="pl-1"
                >
                    NHIS Claims
                </Text>
                <Input
                    value={searchValue}
                    setValue={setSearchValue}
                    inputClassName="!h-[25px]"
                    className="!bg-bg-tetiary"
                    ref={inputRef}
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
export default TopSection