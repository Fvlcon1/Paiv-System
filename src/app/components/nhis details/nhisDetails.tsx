import Overlay from "@components/overlay/overlay"
import Image from "next/image"
import Table from "./components/table/table"
import { IoMdCloseCircle } from "react-icons/io"
import theme from "@styles/theme"
import ClickableTab from "@components/clickable/clickabletab"

const NhisDetails = () => {
    return (
        <div>
            <Overlay>
                <div 
                    className="w-[500px] flex flex-col items-center p-2 relative rounded-[20px] border-[1px] border-solid border-border-tetiary h-[750px] bg-[#1F1F28]"
                    style={{
                        backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}                    
                >
                    <div className="absolute left-[-3px] top-[-3px] w-[70px] h-[70px] rounded-tl-[20px] border-t-[5px] border-l-[5px] border-solid border-[#3C3C53]">

                    </div>
                    <div className="absolute right-[-3px] bottom-[-3px] w-[70px] h-[70px] rounded-br-[20px] border-b-[5px] border-r-[5px] border-solid border-[#3C3C53]">

                    </div>
                    <div className="w-full rounded-[10px] h-[100px] border-[1px] border-solid border-border-secondary bg-[#4f4f631d]">

                    </div>
                    <div className="p-2 w-[120px] h-[120px] bg-[#24242F] rounded-full mt-[-60px] border-b-[1px] border-solid border-border-tetiary">
                        <div className="relative overflow-hidden rounded-full w-full h-full">
                            <Image
                                src={"/assets/dev/profile.png"}
                                alt="Fvlcon logo"
                                width={110}
                                height={110}
                                layout="intrinsic"
                            />
                        </div>
                    </div>
                    <div className="mt-[10px] w-full flex justify-center px-4">
                        <Table />
                    </div>
                    <Image
                        src={"/assets/prod/nhis-logo.png"}
                        alt="Fvlcon logo"
                        width={50}
                        height={50}
                        layout="intrinsic"
                        className="mt-[30px]"
                    />
                    <div className="absolute top-[15px] right-[15px]">
                        <ClickableTab className="!rounded-full hover:!bg-bg-tetiary">
                            <IoMdCloseCircle color={theme.colors.text.secondary} />
                        </ClickableTab>
                    </div>
                </div>
            </Overlay>
        </div>
    )
}
export default NhisDetails