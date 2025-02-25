import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Table from "./components/table"
import { data } from "./components/data"

const Claims = () => {
    return (
        <div className="flex flex-col gap-10 items-center">
            <div className="w-full bg-[#ffffff05] border-b-[1px] border-solid border-b-border-tetiary justify-center h-[200px] flex items-center">
                <div className="max-w-[1024px] w-full flex flex-col items-center justify-center gap-3">
                    <div className="max-w-[600px] w-full flex flex-col gap-[2px] mt-[30px] items-center justify-center">
                        <Text
                            size={TypographySize.HL}
                            bold={TypographyBold.lg}
                            textColor={theme.colors.text.primary}
                            fontfamily="greater-theory"
                        >
                            NHIS Claims
                        </Text>
                    </div>
                </div>
            </div>
            <Table data={data} isLoading={false}/>
        </div>
    )
}
export default Claims