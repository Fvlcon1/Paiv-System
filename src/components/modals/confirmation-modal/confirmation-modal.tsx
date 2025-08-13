'use client'

import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { TiWarning } from "react-icons/ti"
import { AnimatePresence } from "framer-motion"
import Button from "@components/button/button"
import OutlineButton from "@components/button/outlineButton"
import { hexOpacity } from "@/utils/hexOpacity"
import { useEffect } from "react"
import { BsInfoCircleFill } from "react-icons/bs"

type ConfirmationModalProps = {
    isVisible: boolean;
    close: () => void;
    description?: string;
    children?: React.ReactNode;
    onConfirm: () => void;
    cta?: string;
    loading?: boolean | (() => boolean);
    title?: string;
    icon?: React.ReactNode;
    color?: string;
};

const ConfirmationModal = ({
    isVisible,
    close,
    description,
    children,
    onConfirm,
    cta,
    loading,
    title,
    icon,
    color,
}: ConfirmationModalProps) => {
    const handleConfirm = () => {
        onConfirm()
    }

    return (
        <AnimatePresence>
            {
                isVisible && (
                    <Overlay
                        onClick={close}
                        key={1}
                    >
                        <Container
                            display={isVisible}
                            close={close}
                            closable={false}
                        >
                            <div className="w-[300px] p-1 bg-main-primary/10 rounded-2xl">
                                <div className="w-full px-2 py-2 flex items-center gap-1">
                                    <BsInfoCircleFill size={13} color={theme.colors.text.secondary} />
                                    <Text
                                        bold={theme.text.bold.md}
                                        textColor={theme.colors.text.secondary}
                                    >
                                        {title || "Confirmation"}
                                    </Text>
                                </div>
                                <div className="w-full shadow-xs rounded-2xl flex flex-col gap-3 bg-bg-primary p-3 border border-border-primary">
                                    <div className="flex flex-col gap-1 w-full justify-center items-center">
                                        <Text
                                            size={theme.text.size.HM}
                                            bold={theme.text.bold.md2}
                                        >
                                            {title || "Are you Sure?"}
                                        </Text>

                                        {/* Body */}
                                        <Text>
                                            {description || "Are you sure you want to continue?"}
                                        </Text>
                                    </div>

                                    {/* Footer */}
                                    <div className="w-full flex items-center gap-2">
                                        <OutlineButton
                                            onClick={close}
                                            text="Cancel"
                                            className="flex-1"
                                        />
                                        <Button
                                            onClick={handleConfirm}
                                            text={cta ?? "Submit Claims"}
                                            loading={typeof loading === 'function' ? loading() : loading}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Overlay>
                )
            }
        </AnimatePresence>
    )
}
export default ConfirmationModal