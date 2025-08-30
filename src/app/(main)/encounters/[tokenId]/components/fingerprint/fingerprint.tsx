import Button from "@components/button/button"
import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdVerifiedUser } from "react-icons/md"
import { RiCameraLensFill } from "react-icons/ri"
import { TbFaceId } from "react-icons/tb"
import { ViewState } from "../../utils/types"
import { useEncounterContext } from "../../context/encounter.context"
import { useWebSocket } from "./useWebSocket"

const FingerPrint = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [status, setStatus] = useState('');
    const { setViewState } = useEncounterContext();
    
    const { isConnected, sendMessage, addMessageHandler } = useWebSocket({
        url: "ws://localhost:8080",
        onOpen: () => {
            console.log("WebSocket connected");
            setStatus('Connected, place your finger on the scanner');
        },
        onClose: () => {
            console.log("WebSocket disconnected");
            setStatus('Disconnected from fingerprint scanner');
        },
        onError: (error) => {
            console.error("WebSocket error:", error);
            setStatus('Connection error. Please try again.');
        },
        reconnect: true,
        reconnectInterval: 5000,
        reconnectAttempts: 5,
    });

    // Handle WebSocket messages
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                if (data.event === 'prompt' && data.status) {
                    setStatus(data.status);
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        const cleanup = addMessageHandler(handleMessage);
        return cleanup;
    }, [addMessageHandler]);

    useEffect(() => {
        if (!isVisible) {
            setViewState(null);
        }
    }, [isVisible, setViewState]);

    return (
        <Overlay onClick={() => setViewState(null)}>
            <Container  
                className="w-[450px] !px-10 !py-6"
                close={() => setViewState(null)}
            >
                <div className="flex w-full flex-col gap-4">
                    <Text
                        bold={TypographyBold.md}
                        size={TypographySize.HM}
                        className="text-center"
                    >
                        Fingerprint Verification
                    </Text>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[100px] flex items-center justify-center">
                        <Text 
                            size={theme.text.size.HM} 
                            className="text-center text-gray-700"
                        >
                            {status || (isConnected ? 'Connected, waiting for input...' : 'Connecting to scanner...')}
                        </Text>
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button 
                            text="Cancel"
                            onClick={() => setViewState(null)}
                            className="w-full"
                        />
                    </div>
                </div>
            </Container>
        </Overlay>
    )
}
export default FingerPrint