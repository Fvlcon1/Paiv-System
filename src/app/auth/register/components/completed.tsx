'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useRegisterContext } from "../context/register-context"
import { BsFillCheckCircleFill } from "react-icons/bs"
import Button from "@components/button/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styles from './completed.module.css'
import OutlineButton from "@components/button/outlineButton"
import { IoIosMail } from "react-icons/io"

const Completed = () => {
    const { step, setStep } = useRegisterContext()
    const router = useRouter()
    const [showConfetti, setShowConfetti] = useState(true)

    useEffect(() => {
        // Hide confetti after animation
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false)
        }, 5000)

        return () => clearTimeout(confettiTimer)
    }, [])

        const ConfettiParticle = ({ delay, color, shape, left }: { delay: number, color: string, shape: string, left: number }) => {
        const shapeClass = shape === 'circle'
            ? 'rounded-full'
            : shape === 'triangle'
                ? 'w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent'
                : ''

        return (
            <div
                className={`absolute w-2.5 h-2.5 ${shapeClass} animate-pulse ${styles.confettiParticle}`}
                style={{
                    left: `${left}%`,
                    backgroundColor: shape === 'triangle' ? 'transparent' : color,
                    borderBottomColor: shape === 'triangle' ? color : undefined,
                    animationDelay: `${delay}s`,
                }}
            />
        )
    }

    const confettiColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    const confettiShapes = ['circle', 'square', 'triangle']

    return (
        <div className="w-full h-full relative">
            {/* Confetti Container */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <ConfettiParticle
                            key={i}
                            delay={Math.random() * 3}
                            color={confettiColors[Math.floor(Math.random() * confettiColors.length)]}
                            shape={confettiShapes[Math.floor(Math.random() * confettiShapes.length)]}
                            left={Math.random() * 100}
                        />
                    ))}
                </div>
            )}

            <div className="absolute inset-0 flex flex-col h-full items-center justify-center gap-1">
                <div className="flex p-4 rounded-full bg-[#188947]/10">
                    <BsFillCheckCircleFill
                        size={24}
                        color="#188947"
                    />
                </div>
                <Text
                    size={theme.text.size.HL}
                    bold={theme.text.bold.md2}
                    textColor="#188947"
                >
                    Completed
                </Text>
                <Text>
                    Registration completed successfully
                </Text>
                <Text 
                    textAlign="center" 
                    textColor={theme.colors.text.tetiary}
                    lineHeight={1.2}
                >
                    We've sent your registration details and next steps to your email. Please check your inbox.
                </Text>
                <div className="flex gap-2 w-[80%]">
                    <Button
                        text="Login"
                        onClick={() => router.push('/auth/login')}
                        className="mt-2 !w-[200px] !h-[40px]"
                    />
                    <OutlineButton
                        icon={(
                            <IoIosMail size={18}/>
                        )}
                        text="Go to Mail"
                        onClick={() => window.open('https://mail.google.com/mail')}
                        className="mt-2 !w-[200px] !h-[40px]"
                    />
                </div>
            </div>
        </div>
    )
}

export default Completed
