'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import VerificationSccessfulContainer from "../../verification successful container/verificationSuccessfulContainer"
import { ViewState } from "../../../utils/types"
import VeficationFailed from "./verificationFailed"
import { protectedApi } from "@/app/utils/apis/api"
import { useParams } from "next/navigation"
import { useEncounterContext } from "../../../context/encounter.context"
import useGetEncounter from "../../../utils/useGetEncounter"

const CamCapture = ({
    setViewState
} : {
    setViewState: Dispatch<SetStateAction<ViewState | null>>
}) => {
    const {tokenId} = useParams()
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const { nhisDetails, setCaptureImageUrl, capturedImageUrl, setEncounterDetails, getEncounterMutation } = useEncounterContext()
    const { encounterDetails} = useGetEncounter()

    // Start Camera (Ensures no duplicate streams)
    const startCamera = async () => {
        try {
            stopCamera();
            
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            setStream(mediaStream)

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream
            }
        } catch (error) {
            console.error("Error accessing camera:", error)
        }
    }

    // Stop Camera
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }

    // Capture Image from Video
    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext("2d")

            const videoWidth = videoRef.current.videoWidth
            const videoHeight = videoRef.current.videoHeight
            canvas.width = videoWidth
            canvas.height = videoHeight

            if (context) {
                context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight)
                const imageData = canvas.toDataURL("image/png")
                const binaryData = dataURLToUint8Array(imageData)
                setCaptureImageUrl(imageData)
                stopCamera();
                return binaryData
            }
        }
    }

    // Convert Image to Uint8Array
    function dataURLToUint8Array(dataURL: string): Uint8Array {
        const base64String = dataURL.split(',')[1]
        const binaryString = atob(base64String)
        const length = binaryString.length
        const bytes = new Uint8Array(length)

        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
        }

        return bytes
    }

    // Verify Visit Mutation
    const verifyVisitMutation = useMutation({
        mutationFn: async (binaryImage: Uint8Array) => {
            const formData = new FormData();
            formData.append("verification_token_str", tokenId as string);
            formData.append("webcam_image", new Blob([binaryImage], { type: "image/png" }), "image.png");

            const response = await protectedApi.POST("/encounter/compare", formData)

            return response.data;
        },
        onSuccess : (data) => {
            getEncounterMutation()
            setViewState(
                data.match_summary?.is_match
                    ? ViewState.VERIFICATION_SUCCESS
                    : ViewState.VERIFICATION_FAILED
            );
        }
    });

    const handleCapture = () => {
        const binaryImage = captureImage();
        if (binaryImage) verifyVisitMutation.mutate(binaryImage);
    }

    useEffect(() => {
        if (verifyVisitMutation.isError) {
            setViewState(ViewState.VERIFICATION_FAILED);
        }
    }, [verifyVisitMutation.isError]);

    useEffect(() => {
        setCaptureImageUrl(null);
        startCamera();

        return () => {
            stopCamera(); // Cleanup on unmount
        };
    }, []);

    return (
        <>
            <div className="relative w-full h-full flex items-center justify-center bg-black rounded-lg overflow-hidden">
                {capturedImageUrl ? (
                    <div className="w-full h-full relative">
                        <Image 
                            src={capturedImageUrl}
                            alt="Captured Image"
                            className="object-cover"
                            fill
                        />
                        {verifyVisitMutation.isPending && (
                            <div className="flex absolute justify-center items-center h-full w-full top-0 left-0 bg-[#15151fca] backdrop-filter backdrop-blur-sm">
                                <div className="flex flex-col justify-center items-center gap-2 animate-pulse">
                                    <div className="face-loader"></div> 
                                    <Text textColor={theme.colors.bg.primary}>
                                        Verifying Visit...
                                    </Text>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        playsInline
                    />
                )}

                {/* Hidden canvas for capturing the image */}
                <canvas ref={canvasRef} className="hidden" />

                {capturedImageUrl ? (
                    <Button 
                        text="Retake"
                        onClick={() => {
                            setCaptureImageUrl(null);
                            startCamera();
                        }}
                        className="absolute bottom-12"
                    />
                ) : (
                    <Button 
                        text="Capture"
                        onClick={handleCapture}
                        className="absolute bottom-12"
                    />
                )}
            </div>
        </>
    );
}

export default CamCapture;
