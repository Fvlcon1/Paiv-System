'use client'

import Pressable from "@components/button/pressable"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { ReactNode, useState } from "react"
import { IoCopy } from "react-icons/io5"

const Copychip = ({
    children,
    containerClassName,
} : {
    children? : ReactNode
    containerClassName? : string
}) => {
    const [hover, setHover] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        if (!children) return
        
        // Copy text to clipboard
        navigator.clipboard.writeText(children.toString()).then(() => {
            setCopied(true)

            // Hide "Copied" message after 2 seconds
            setTimeout(() => setCopied(false), 2000)
        }).catch(err => console.error("Failed to copy:", err))
    }

    return (
        <div className="relative flex flex-col items-center w-fit">
            {copied && (
                <div className="absolute bottom-[115%] bg-bg-tetiary px-2 py-1 rounded-md">
                    <Text textColor={theme.colors.text.tetiary}>
                        Copied
                    </Text>
                </div>
            )}
            
            <Pressable scaleFactor={1.015}>
                <div 
                    className={`relative px-3 py-1 bg-bg-tetiary overflow-hidden hover:bg-bg-quantinary rounded-lg cursor-pointer w-fit ${containerClassName}`}
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleCopy}
                >
                    {children}
                    {hover && (
                        <div 
                            className="absolute right-0 top-0 px-2 flex items-center justify-center h-full bg-[#00000006] backdrop-filter backdrop-blur-sm"
                        >
                            <IoCopy />
                        </div>
                    )}
                </div>
            </Pressable>
        </div>
    )
}

export default Copychip
