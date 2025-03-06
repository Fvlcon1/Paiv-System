"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Container from "@components/container/container";
import Overlay from "@components/overlay/overlay";
import Button from "@components/button/button";
import Text from "@styles/components/text";
import { TbAlertSquareFilled } from "react-icons/tb";
import theme from "@styles/theme";

const SessionTimeoutAlert = ({ show }: { show: boolean }) => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    if (!isVisible) return null;

    return (
        <Overlay>
            <Container
                display={isVisible}
                setDisplay={setIsVisible}
                className="!w-fit"
                closable={false}
            >
                <div className="p-6 rounded-lg h-[200px] bg-[#ffffff08] border-[1px] border-solid border-border-tetiary flex flex-col justify-center items-center text-center w-[300px]">
                    <TbAlertSquareFilled 
                        color={theme.colors.text.primary}
                        size={20}
                        className="mb-1"
                    />
                    <Text
                        fontfamily="greater-theory"
                        textColor={theme.colors.text.primary}
                    >
                        Session Expired
                    </Text>
                    <Text>
                        Your session has expired. Please log in again.
                    </Text>
                    <Button
                        onClick={() => router.push("/auth/login")}
                        text="Relogin"
                        className="!bg-bg-quantinary hover:!bg-bg-tetiary mt-2"
                    />
                </div>
            </Container>
        </Overlay>
    );
};

export default SessionTimeoutAlert;
