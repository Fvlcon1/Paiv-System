import Text from "@styles/components/text";
import { TypographyBold } from "@styles/style.types";
import theme from "@styles/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { RiHome6Fill } from "react-icons/ri";

interface IMenuType {
    title: string;
    icon: IconType;
    path: string;
}

const RenderMenuSection = ({
    title,
    menuItems
} : {
    title: string, 
    menuItems: IMenuType[]
}) => {
    const pathname = usePathname()

    const isActive = (pathname: string, itemPath: string) => {
        if (itemPath === '/') return pathname === '/'
        return pathname.startsWith(itemPath)
      }      

    const getActiveTailwindStyle = (item:IMenuType) => {
        return isActive(pathname, item.path)
        ? "bg-[#6969ce23] border-l-[5px] border-solid border-main-primary px-3"
        : "px-4 hover:bg-bg-tetiary"
    }

    const getActiveJsStyle = (item:IMenuType) => {
        return isActive(pathname, item.path)
        ? theme.colors.main.primary
        : theme.colors.text.secondary
    }

    return (
        <div className="w-full flex flex-col gap-1 py-2">
            <Text 
                textColor={theme.colors.text.tetiary} 
                bold={TypographyBold.md}
                className="px-4"
            >
                {title}
            </Text>
            <div className="w-full flex flex-col">
                {
                    menuItems.map((item, index) => (
                        <Link
                            className={`flex gap-2 items-center justify-between ${getActiveTailwindStyle(item)} duration-200 py-2 cursor-pointer`}
                            href={item.path}
                            key={index}
                        >
                            <div className="flex items-center gap-2">
                                <item.icon
                                    color={getActiveJsStyle(item)}
                                    size={"15px"}
                                />
                                <Text
                                    textColor={getActiveJsStyle(item)}
                                    bold={isActive(pathname, item.path) ? TypographyBold.md : TypographyBold.sm2}
                                >
                                    {item.title}
                                </Text>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default RenderMenuSection