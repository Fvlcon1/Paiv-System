import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import Image from "next/image"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import Table from "./table/table"
import Button from "@components/button/button"

const VerificationSccessfulContainer = () => {
    return (
        <div>
            <Overlay>
                <Container className="!w-[500px] pb-[30px]">
                    <div className="py-[30px]">
                        <div className="relative h-[200px] w-[280px] flex justify-center">
                            <div className="absolute bottom-0 left-0 p-2 w-[140px] h-[140px] bg-[#24242F] rounded-full border-b-[1px] border-solid border-border-tetiary">
                                <div className="relative overflow-hidden rounded-full w-full h-full">
                                    <Image
                                        src={"/assets/dev/profile.png"}
                                        alt="profile"
                                        width={130}
                                        height={130}
                                    />
                                </div>
                            </div>
                            <div className="absolute right-0 top-0 p-2 w-[140px] h-[140px] bg-[#24242F] rounded-full border-b-[1px] border-solid border-border-tetiary">
                                <div className="relative overflow-hidden rounded-full w-full h-full">
                                    <Image
                                        src={"/assets/dev/profile.png"}
                                        alt="profile"
                                        width={130}
                                        height={130}
                                    />
                                </div>
                            </div>
                            <div className="absolute right-0 top-0 w-full h-full flex justify-center items-center">
                                <div className="relative overflow-hidden rounded-full bg-[#ffffff1e] p-1">
                                    <div className="relative overflow-hidden rounded-full bg-[#24242fb7] p-1">
                                        <RiVerifiedBadgeFill
                                            color="#60B956"
                                            size={30}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Text
                        fontfamily="greater-theory"
                        textColor="#60B956"
                        size={TypographySize.HM}
                    >
                        Verification Successful
                    </Text>
                    <div className="w-full relative h-[350px] px-4 overflow-hidden">
                        <Table />
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#1F1F28] via-[#1F1F28]/80 to-transparent">
                            
                        </div>
                        <div className="absolute bottom-0 w-full flex justify-center">
                            <Button 
                                text="View NHIS Details"
                                className="!border-none !bg-bg-quantinary hover:!bg-bg-tetiary"
                            />
                        </div>
                    </div>
                </Container>
            </Overlay>
        </div>
    )
}
export default VerificationSccessfulContainer