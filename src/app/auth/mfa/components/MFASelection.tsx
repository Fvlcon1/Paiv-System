'use client'

import Button from '@components/button/button';
import Text from '@styles/components/text';
import { TypographySize } from '@styles/style.types';
import theme from '@styles/theme';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { TbShieldLockFilled } from 'react-icons/tb';

const MFASelection = () => {
    const [selectedMfa, setSelectedMfa] = useState<'otp' | 'app'>()
    return (
        <div
            className="w-full flex justify-center items-center h-screen"
        >
            <div className="flex flex-col gap-4 items-center mt-[-50px] w-[500px]">
                <TbShieldLockFilled 
                    size={40}
                    color={theme.colors.text.primary}
                />
                <div className="flex flex-col gap-0 items-center">
                    <Text
                        fontfamily="greater-theory"
                        textColor={theme.colors.text.primary}
                        size={TypographySize.HM}
                    >
                        Two-Factor authentication
                    </Text>
                    <Text
                        textAlign='center'
                    >
                        For added security, please select how you'd like to verify your identity. Choose your preferred authentication method to continue logging in.
                    </Text>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <div 
                        className={`w-full p-4  gap-4 flex items-center cursor-pointer hover:bg-bg-tetiary duration-200 h-[100px] bg-bg-secondary border-[1px] border-solid ${selectedMfa === 'app' ? 'border-main-primary bg-[#6060d01e]' : 'border-border-tetiary'} rounded-xl`}
                        onClick={()=>setSelectedMfa('app')}    
                    >
                        {
                            selectedMfa === 'app' ?
                            <FaCheckCircle
                                size={20}
                                color={theme.colors.main.primary}
                            />
                            :
                            <div className='rounded-full w-[20px] h-[20px] bg-bg-quantinary'>

                            </div>
                        }
                        <div className='flex flex-col gap-[2px]'>
                            <Text
                                fontfamily='greater-theory'
                            >
                                Mobile app authenticator
                            </Text>
                            <Text>
                                Use a mobile app like google authenticator to generate verification codes
                            </Text>
                        </div>
                    </div>
                    <div 
                        className={`w-full p-4  gap-4 flex items-center cursor-pointer hover:bg-bg-tetiary duration-200 h-[100px] bg-bg-secondary border-[1px] border-solid ${selectedMfa === 'otp' ? 'border-main-primary bg-[#6060d01e]' : 'border-border-tetiary'} rounded-xl`}
                        onClick={()=>setSelectedMfa('otp')}    
                    >
                        {
                            selectedMfa === 'otp' ?
                            <FaCheckCircle
                                size={20}
                                color={theme.colors.main.primary}
                            />
                            :
                            <div className='rounded-full w-[20px] h-[20px] bg-bg-quantinary'>

                            </div>
                        }
                        <div className='flex flex-col gap-[2px]'>
                            <Text
                                fontfamily='greater-theory'
                            >
                                Email Verification
                            </Text>
                            <Text>
                                Receive verification codes via email
                            </Text>
                        </div>
                    </div>
                </div>
                <Button 
                    text='Continue'
                    className='!w-full !bg-main-primary !h-[45px]'
                />
            </div>
        </div>
    )
}
export default MFASelection