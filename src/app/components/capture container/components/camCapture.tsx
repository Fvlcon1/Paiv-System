'use client'

import { mainContext } from "@/app/context/context"
import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import axios from "axios"
import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"

const CamCapture = ({
    isVisible
} : {
    isVisible : boolean
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const spinnerRef = useRef<HTMLVideoElement>(null)
    const [capturedImageUrl, setCaptureImageUrl] = useState<string | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const {nhisDetails} = useContext(mainContext)

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
    

    const verifyVisit = (binaryImage :  Uint8Array<ArrayBufferLike>) => {
        try {
            const compareImage = axios.post("https://j8juo9cz2p675o-8080.proxy.runpod.net/api/compare", {
                membership_id : nhisDetails?.memberShipId,
                webcam_image : binaryImage
            })
            console.log({compareImage})
        } catch (error) {
            console.log({error})
        }
    }

    const handleCapture = () => {
        const binaryImage = captureImage()
        if(binaryImage)
            verifyVisit(binaryImage)
    }

    const stopCamera = async () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop()) // Stop all tracks
        }
        
        if (videoRef.current) {
            videoRef.current.srcObject = null // Release video feed
        }
    
        setStream(null) // Reset state
    
        await checkCameraStatus() // Verify if camera is still active
    }
    
    const checkCameraStatus = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const activeCameras = devices.filter(device => device.kind === "videoinput")
    
        if (activeCameras.length > 0) {
            console.log("Camera is still in use by another process!")
        } else {
            console.log("Camera is fully stopped.")
        }
    }     

    useEffect(()=>{
        if(!isVisible)
            stopCamera()
    },[isVisible])

    useEffect(() => {
        startCamera()

        if (spinnerRef.current) {
            spinnerRef.current.playbackRate = 5 // Increase playback speed (only works with .webm)
        }

        return () => {
            stopCamera()
        }
    }, [])

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black rounded-lg overflow-hidden">
            {capturedImageUrl ? (
                <div className="w-full h-full relative">
                    <Image 
                        src={capturedImageUrl}
                        alt="Captured Image"
                        className="object-cover"
                        fill
                    />
                    <div className="flex absolute justify-center items-center h-full w-full top-0 left-0 bg-[#15151fca] backdrop-filter backdrop-blur-sm">
                        <div className="flex flex-col justify-center gap-2 animate-pulse">
                            <div className="loader"></div> 
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Verifying Visit...
                            </Text>
                        </div>
                    </div>
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

            <Button 
                text="Capture"
                onClick={handleCapture}
                className="absolute bottom-5 !bg-bg-quantinary"
            />
        </div>
    )
}

export default CamCapture