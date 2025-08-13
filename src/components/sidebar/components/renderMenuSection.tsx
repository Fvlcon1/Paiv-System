import { hexOpacity } from "@/utils/hexOpacity";
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
    size? : number
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
        ? "bg-bg-primary/20"
        : "hover:bg-bg-primary/10"
    }

    const getActiveJsStyle = (item:IMenuType) => {
        return isActive(pathname, item.path)
        ? theme.colors.bg.primary
        : theme.colors.bg.primary + hexOpacity(80)
    }

    return (
        <div className="w-full flex flex-col gap-1">
            {/* <Text 
                textColor={theme.colors.text.tetiary} 
                bold={TypographyBold.md}
                className="px-4"
            >
                {title}
            </Text> */}
            <div className="w-full flex flex-col">
                {
                    menuItems.map((item, index) => (
                        <Link
                            className={`flex gap-2 items-center justify-between ${getActiveTailwindStyle(item)} duration-200 px-4 py-3 cursor-pointer`}
                            href={item.path}
                            key={index}
                        >
                            <div className="flex items-center gap-2">
                                <item.icon
                                    color={getActiveJsStyle(item)}
                                    size={item.size || 13}
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