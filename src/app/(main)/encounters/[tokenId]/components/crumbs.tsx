import { Fragment } from "react"
import Link from "next/link"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { RiHome6Fill } from "react-icons/ri"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { IoMdArrowRoundBack } from "react-icons/io"

const Crumbs = () => {
    const { tokenId } = useParams()
    const router = useRouter()
    const crumbs = [
        {
            icon: RiHome6Fill,
            path: "/dashboard",
        },
        {
            title: "Encounters",
            path: "/encounters",
        },
        {
            title: `${tokenId}`,
            path: `/encounters/${tokenId}`,
            active: true
        },
    ]

    return (
        <div className="flex items-center gap-2">
            <div
                className="flex gap-1 px-3 py-1 rounded-lg bg-bg-secondary items-center w-fit cursor-pointer hover:bg-bg-tetiary duration-200"
                onClick={() => router.back()}
            >
                <IoMdArrowRoundBack size={15} color={theme.colors.text.tetiary} />
                <Text
                    bold={theme.text.bold.sm2}
                >
                    Back
                </Text>
            </div>
            <div className="flex px-3 py-1 rounded-lg bg-bg-secondary items-center w-fit">
                <div className="flex items-center gap-1">
                    {
                        crumbs.map((crumb, index) => (
                            <Fragment key={index}>
                                <Link
                                    href={crumb.path}
                                >
                                    <div className="flex items-center">
                                        {
                                            crumb.icon &&
                                            <crumb.icon size={15} color={theme.colors.text.tetiary} />
                                        }
                                        <Text
                                            textColor={crumb.active ? theme.colors.text.secondary : theme.colors.text.tetiary}
                                            bold={crumb.active ? theme.text.bold.md : theme.text.bold.sm2}
                                        >
                                            &nbsp;{crumb.title}
                                        </Text>
                                    </div>
                                </Link>
                                {index < crumbs.length - 1 && <Text textColor={theme.colors.text.tetiary}>/</Text>}
                            </Fragment>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Crumbs
