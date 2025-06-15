'use client'

import { useState, useEffect } from "react";
import Container from "@components/container/container";
import Overlay from "@components/overlay/overlay";
import Text from "@styles/components/text";
import { TypographyBold } from "@styles/style.types";
import { AnimatePresence } from "framer-motion";
import Main from "./components/main";
import { IClaimsType } from "../claim-details/utils/types";
import Actions from "./components/actions";
import theme from "@styles/theme";

const ClaimSummary = ({
    claimDetails,
    isVisible,
    close,
    loading
} : {
    claimDetails?: IClaimsType
    isVisible : boolean
    close : ()=>void
    loading? : boolean
}) => {
    const [maxHeight, setMaxHeight] = useState<number | null>(null);

    useEffect(() => {
        const updateHeight = () => {
            setMaxHeight(window.innerHeight - 200);
        };

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
                    >
                        <div
                            className="md:w-[800px] w-full flex flex-col"
                        >

                            {/* Title */}
                            <div className="bg-bg-secondary border-solid border-b-[1px] border-border-secondary rounded-t-[20px] h-[55px] flex items-center pl-4">
                                <Text 
                                    bold={TypographyBold.md2}
                                    textColor={theme.colors.main.primary}
                                    size={theme.typography.size.body2}
                                >
                                    Claim Summary
                                </Text>
                            </div>

                            {/* Scrollable Content */}
                            <Main
                                maxHeight={maxHeight}
                                claimDetails={claimDetails}
                            />

                            {/* Actions */}
                            <Actions
                                expectedPayout={claimDetails?.expectedPayout}
                            />
                        </div>
                    </Container>
                </Overlay>
            )}
        </AnimatePresence>
    );
};

export default ClaimSummary;
