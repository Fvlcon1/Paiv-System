'use client'

import { useState, useEffect } from "react";
import Container from "@components/container/container";
import Overlay from "@components/overlay/overlay";
import Text from "@styles/components/text";
import { TypographyBold } from "@styles/style.types";
import { AnimatePresence } from "framer-motion";
import { IClaimsDetailType } from "../../utils/types";
import Actions from "./components/actions";
import Main from "./components/main";
import theme from "@styles/theme";

const ClaimDetails = ({
    claimDetails,
    isVisible,
    close,
    onSubmit,
    loading
} : {
    claimDetails?: IClaimsDetailType
    isVisible : boolean
    close : ()=>void
    onSubmit? : ()=>void
    loading? : boolean
}) => {
    const [maxHeight, setMaxHeight] = useState<number | null>(null);
    const [isReasonVisible, setIsReasonVisible] = useState(false)
console.log("sidjlkj")
    useEffect(() => {
        const updateHeight = () => {
            setMaxHeight(window.innerHeight - 200);
        };

        console.log({height : window.innerHeight})

        updateHeight(); // Set initial height
        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && claimDetails && (
                <Overlay 
                    onClick={close} 
                    className="!px-6 !z-[13]"
                >
                    <Container 
                        display={isVisible} 
                        close={close} 
                        className={``}
                        closeButtonClassName="!top-[15px]"
                    >
                        <div
                            className="md:w-[800px] w-full flex flex-col"
                        >

                            {/* Title */}
                            <div className="bg-bg-tetiary border-solid border-b-[1px] border-border-secondary rounded-t-[20px] h-[55px] flex items-center pl-6">
                                <Text bold={TypographyBold.md}>
                                    Claim Details
                                </Text>
                            </div>

                            {/* Scrollable Content */}
                            <Main
                                maxHeight={maxHeight}
                                claimDetails={claimDetails}
                            />

                            {/* Actions */}
                            <Actions
                                close={close}
                                onSubmit={onSubmit}
                                loading={loading}
                                expectedPayout={claimDetails.expectedPayout}
                            />
                        </div>
                    </Container>
                </Overlay>
            )}
        </AnimatePresence>
    );
};

export default ClaimDetails;
