'use client'

import React, { useState, useEffect } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { BsMailbox } from 'react-icons/bs';
import { useSearchParams } from 'next/navigation';
import Text from '@styles/components/text';
import theme from '@styles/theme';
import Button from '@components/button/button';
import Link from 'next/link';
import { IoIosMail } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import OutlineButton from '@components/button/outlineButton';
import { useRouter } from 'next/navigation';

const HospitalRegistrationSuccess = () => {
    const searchParams = useSearchParams();
    const userEmail = searchParams.get('email')
    const hospitalName = searchParams.get('hospitalName')

    const [isVisible, setIsVisible] = useState(true);
    const [showConfetti, setShowConfetti] = useState(true);
    const [toastMessage, setToastMessage] = useState('');
    const router = useRouter()

    useEffect(() => {
        if(!userEmail || !hospitalName) {
            router.push('/auth/register')
            return
        }

        // Hide confetti after animation
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(confettiTimer);
    }, []);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage('');
        }, 3000);
    };

    const ConfettiParticle = ({ delay, color, shape, left }: { delay: number, color: string, shape: string, left: number }) => {
        const shapeClass = shape === 'circle'
            ? 'rounded-full'
            : shape === 'triangle'
                ? 'w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent'
                : '';

        return (
            <div
                className={`absolute w-2.5 h-2.5 ${shapeClass} animate-pulse`}
                style={{
                    left: `${left}%`,
                    backgroundColor: shape === 'triangle' ? 'transparent' : color,
                    borderBottomColor: shape === 'triangle' ? color : undefined,
                    animation: `confettiFall 4s ease-in ${delay}s forwards`,
                }}
            />
        );
    };

    const confettiColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const confettiShapes = ['circle', 'square', 'triangle'];

    if(!userEmail || !hospitalName) return null

    return (
        <>
            <style jsx>{`
        @keyframes confettiFall {
          0% {
            opacity: 1;
            top: -10px;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            top: 100vh;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes progressBar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>

            <div className="fixed inset-0 bg-gray-100 flex justify-center items-center p-4 z-50">
                <div
                    className={`w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative ${isVisible ? 'animate-pulse' : ''
                        }`}
                    style={{
                        animation: isVisible ? 'slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'slideOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                    }}
                >
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

                    {/* Success Header */}
                    <div className="bg-gradient-to-br from-green-300 to-green-600 p-8 text-center relative overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                animation: 'rotate 60s linear infinite'
                            }}
                        />

                        {/* Success Icon */}
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg mb-2 relative z-10">
                            <BiCheckCircle
                                className="w-10 h-10 text-green-500"
                                style={{ animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}
                            />
                        </div>

                        <Text
                            size={theme.typography.size.HL}
                            textColor={theme.colors.bg.primary}
                            bold={theme.typography.bold.md}
                            lineHeight={1}
                        >
                            Registration Successful!
                        </Text>
                        <Text
                            textColor={theme.colors.bg.secondary}
                        >
                            Your hospital account has been created
                        </Text>
                    </div>

                    {/* Success Content */}
                    <div className="p-8">
                        <Text textAlign='center'>
                            Thank you for registering with {hospitalName}. Your patient account has been successfully created and is now active.
                        </Text>

                        {/* Email Notification */}
                        <div className="bg-green-50 rounded-xl p-5 flex items-start gap-4 mb-6">
                            <BsMailbox className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <Text
                                    size={theme.typography.size.body2}
                                    bold={theme.typography.bold.md}
                                >
                                    Check your email
                                </Text>
                                <Text>
                                    We've sent your registration details and next steps to{' '}
                                    <Text>
                                        {userEmail}
                                    </Text>.
                                    Please check your inbox.
                                </Text>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 w-full">
                            <Link
                                href='/auth/login'
                                className='flex flex-1'
                            >
                                <OutlineButton
                                    icon={(
                                        <FaUser size={15}/>
                                    )}
                                    className="!w-full !h-[45px]"
                                    text='Got to Login'
                                />
                            </Link>
                            <Link
                                href='https://mail.google.com/mail'
                                className='flex flex-1'
                            >
                                <Button
                                    icon={(
                                        <IoIosMail size={18}/>
                                    )}
                                    className="!flex-1 !h-[45px]"
                                    text='Go to Mail'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Auto-dismiss Progress Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 origin-left"
                            style={{
                                animation: `progressBar ${10000}ms linear forwards`
                            }}
                        />
                    </div>
                </div>

                {/* Toast Notification */}
                {toastMessage && (
                    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                        {toastMessage}
                    </div>
                )}
            </div>
        </>
    );
};

export default HospitalRegistrationSuccess;