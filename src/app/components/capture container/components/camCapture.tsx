'use client'

import { mainContext } from "@/app/context/context"
import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import VerificationSccessfulContainer from "../../verification successful container/verificationSuccessfulContainer"
import { ViewState } from "@/app/utils/types"
import VeficationFailed from "./verificationFailed"

const CamCapture = ({
    setViewState
} : {
    setViewState: Dispatch<SetStateAction<ViewState | null>>
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const {nhisDetails, setCaptureImageUrl, capturedImageUrl} = useContext(mainContext)

    // Start the camera
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
            setStream(mediaStream)
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream
            }
        } catch (error) {
            console.error("Error accessing camera:", error)
        }
    }

    // Capture an image from the video stream
    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext("2d")
            
            // Ensure video dimensions match canvas for better quality
            const videoWidth = videoRef.current.videoWidth
            const videoHeight = videoRef.current.videoHeight
            canvas.width = videoWidth
            canvas.height = videoHeight

            if (context) {
                context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight)
                const imageData = canvas.toDataURL("image/png")
                const binaryData = dataURLToUint8Array(imageData)
                setCaptureImageUrl(imageData)
                return binaryData
            }

            stopCamera()
        }
    }

    function dataURLToUint8Array(dataURL: string): Uint8Array {
        const base64String = dataURL.split(',')[1] // Remove the prefix
        const binaryString = atob(base64String) // Decode Base64
        const length = binaryString.length
        const bytes = new Uint8Array(length)
    
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i) // Convert to binary
        }
    
        return bytes
    }
    
    const verifyVisitMutation = useMutation({
        mutationFn: async (binaryImage: Uint8Array) => {
            const formData = new FormData();
            formData.append("membership_id", nhisDetails?.memberShipId || "");
            formData.append("webcam_image", new Blob([binaryImage], { type: "image/png" }), "image.png");
    
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/compare`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            return response.data; // Ensure response is returned
        }
    });   

    const handleCapture = () => {
        const binaryImage = captureImage()
        if(binaryImage)
            verifyVisitMutation.mutate(binaryImage)
    }

    const stopCamera = async () => {
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop(); // Stop all tracks
            });
        }
    
        if (videoRef.current) {
            videoRef.current.srcObject = null; // Ensure video feed is released
        }
    
        setStream(null); // Reset state
    
        // Double-check if camera is still active
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for cleanup
        checkCameraStatus();
    };
    
    const checkCameraStatus = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === "videoinput");
    
        const activeTracks = videoInputs.length > 0 && stream?.getTracks().some(track => track.readyState === "live");
    
        if (activeTracks) {
            console.log("Camera is still in use!");
        } else {
            console.log("Camera is fully stopped.");
        }
    };

    useEffect(()=>{
        if(!verifyVisitMutation.data)
            return
        if(verifyVisitMutation.data?.match_summary?.is_match){
            setViewState(ViewState.VERIFICATION_SUCCESS)
        } else {
            setViewState(ViewState.VERIFICATION_FAILED)
        }
    },[verifyVisitMutation.data])

    useEffect(()=>{
        if(verifyVisitMutation.isError)
            setViewState(ViewState.VERIFICATION_FAILED)
    },[verifyVisitMutation.isError])

    useEffect(() => {
        setCaptureImageUrl(null)
        startCamera()
        return () => {
            stopCamera()
        }
    }, [])

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
                        {
                            verifyVisitMutation.isPending &&
                            <div className="flex absolute justify-center items-center h-full w-full top-0 left-0 bg-[#15151fca] backdrop-filter backdrop-blur-sm">
                                <div className="flex flex-col justify-center items-center gap-2 animate-pulse">
                                    <div className="face-loader"></div> 
                                    <Text
                                        textColor={theme.colors.text.primary}
                                    >
                                        Verifying Visit...
                                    </Text>
                                </div>
                            </div>
                        }
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

                {
                    capturedImageUrl ?
                    <Button 
                        text="Retake"
                        onClick={()=>{
                            setCaptureImageUrl(null)
                            startCamera()
                        }}
                        className="absolute bottom-5 !bg-bg-quantinary"
                    />
                    :
                    <Button 
                        text="Capture"
                        onClick={handleCapture}
                        className="absolute bottom-5 !bg-bg-quantinary"
                    />
                }
            </div>
        </>
    )
}

export default CamCapture