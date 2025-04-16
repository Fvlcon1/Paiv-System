import { mainContext } from "@/app/context/context"
import { SearchContext } from "@/app/context/searchContext"
import Input from "@components/input/input"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useContext, useEffect, useRef } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"

const TopSection = () => {
    const {searchValue, setSearchValue} = useContext(mainContext)
    const inputRef = useRef<HTMLInputElement>(null);
    const {getSearchResults} = useContext(SearchContext)

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

    useEffect(()=>{
        if(searchValue)
            getSearchResults({searchValue})
    },[searchValue])

    return (
        <div className="flex flex-col w-full gap-0">
            <Text
                size={TypographySize.HL}
                bold={TypographyBold.lg}
                textColor={theme.colors.text.secondary}
                fontfamily="greater-theory"
            >
                Verify Patients
            </Text>
            <Text 
                className="pl-1"
                bold={TypographyBold.md}
            >
                Enter the NHIS ID or Patient Name to retrieve their details. Verify insurance status and proceed with facial recognition for check-in
            </Text>
            <Input
                value={searchValue}
                setValue={setSearchValue}
                inputClassName="!h-[30px]"
                className="mt-2 !h-[45px] !bg-bg-primary"
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