'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { DispositionViewState, ViewState } from "@/app/utils/types"
import VeficationFailed from "./verificationFailed"
import { protectedApi } from "@/app/utils/apis/api"
import { useEncounterContext } from "@/app/(main)/encounters/encounter/[tokenId]/context/encounter.context"
import { useParams } from "next/navigation"

const CamCapture = ({
    setDispositionViewState
} : {
    setDispositionViewState: Dispatch<SetStateAction<DispositionViewState | null>>
}) => {
    const {tokenId} = useParams()
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const { nhisDetails, setCaptureImageUrl, capturedImageUrl, selectedDisposition, getEncounterMutation } = useEncounterContext()

    // Start Camera (Ensures no duplicate streams)
    const startCamera = async () => {
        try {
            stopCamera(); // Stop any existing stream before starting a new one
            
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
            stream.getTracks().forEach(track => track.stop()); // Stop all tracks
            setStream(null);
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null; // Release video feed
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
                stopCamera(); // Stop camera after capturing
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
            formData.append("token_id", tokenId as string);
            formData.append("disposition_id", selectedDisposition?.id || 1 as any);
            formData.append("webcam_image", new Blob([binaryImage], { type: "image/png" }), "image.png");

            const response = await protectedApi.POST("/encounter/finalize", formData)

            return response;
        },
        onSuccess : (response) => {
            getEncounterMutation()
            setDispositionViewState(
                response.status
                    ? DispositionViewState.VERIFICATION_SUCCESS
                    : DispositionViewState.VERIFICATION_FAILED
            );
        }
    });

    const handleCapture = () => {
        const binaryImage = captureImage();
        if (binaryImage) verifyVisitMutation.mutate(binaryImage);
    }

    useEffect(() => {
        if (verifyVisitMutation.isError) {
            setDispositionViewState(DispositionViewState.VERIFICATION_FAILED);
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
            <div className="relative w-full h-full flex items-center justify-center bg-bg-primary rounded-lg overflow-hidden">
                {capturedImageUrl ? (
                    <div className="w-full h-full relative">
                        <Image 
                            src={capturedImageUrl}
                            alt="Captured Image"
                            className="object-cover"
                            fill
                        />
                        {verifyVisitMutation.isPending && (
                            <div className="flex absolute justify-center items-center h-full w-full top-0 left-0 bg-[#f3f3ff9f] backdrop-filter backdrop-blur-sm">
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
