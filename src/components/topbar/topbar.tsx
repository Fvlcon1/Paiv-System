import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"

const Topbar = () => {
    const navTabs = [
        {
            name : "Add Questions",
            active : true
        },
        {
            name : "Curate Questions",
            active : false
        }
    ]
    return (
        <div className="w-full h-[60px] flex justify-center fixed top-0 left-0">
            <div className="max-w-[1024px] w-full h-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Image 
                        src={"/assets/prod/logo.png"}
                        alt="Fvlcon logo"
                        width={25}
                        height={25}
                    />
                    <Text
                        bold={TypographyBold.md}
                    >
                        NHIS System
                    </Text>
                </div>
                <div className="flex px-2 py-[6px] border-[1px] border-solid border-border-tetiary rounded-full bg-bg-secondary h-fit items-center gap-1">
                    <FaUserCircle 
                        color={theme.colors.text.primary}
                    />
                    <Text 
                        textColor={theme.colors.text.primary}
                    >
                        Prince Nedjoh
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default Topbar