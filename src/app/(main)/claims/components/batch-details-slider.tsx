'use client'

import { AnimatePresence } from "framer-motion"
import Overlay from "@components/overlay/overlay"
import SlideIn from "@styles/components/slidein"
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Input from "@components/input/input"
import OutlineButton from "@components/button/outlineButton"
import { GiMagicBroom } from "react-icons/gi"
import Button from "@components/button/button"
import { FaCheckCircle, FaTimesCircle, FaFlag, FaUserCheck, FaUserClock, FaUserTimes } from "react-icons/fa"
import { MdAttachMoney } from "react-icons/md"
import Divider from "@components/divider/divider"
import { useClaimsContext } from "../context/claims-context"

const formatNumber = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return Number.isInteger(num) && num < 10 && num >= 0 ? `0${num}` : String(value);
};

interface FinancialInfoItemProps {
    icon?: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
    value: string | number;
    valueColor?: string;
    showDivider?: boolean;
    iconColor?: string;
}

const FinancialInfoItem = ({
    icon: Icon,
    label,
    value,
    valueColor,
    showDivider = true,
    iconColor = theme.colors.text.secondary
}: FinancialInfoItemProps) => (
    <>
        <div className="flex justify-between items-center py-2.5">
            <div className="flex items-center gap-2">
                {Icon && <Icon size={16} color={iconColor} />}
                <Text>{label}</Text>
            </div>
            <Text
                bold={theme.text.bold.md}
                textColor={valueColor}
            >
                {value}
            </Text>
        </div>
        {showDivider && <Divider className="!bg-border-secondary/50" />}
    </>
);

const StatCard = ({
    title,
    value,
    icon: Icon,
    color = theme.colors.text.secondary,
    bgColor = theme.colors.bg.secondary
}: {
    title: string;
    value: string | number;
    icon: any;
    color?: string;
    bgColor?: string;
}) => (
    <div className="flex items-center gap-3 p-2 rounded-xl" style={{ backgroundColor: bgColor }}>
        <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Icon size={15} color={color} />
        </div>
        <div className="flex flex-1 justify-between gap-1">
            <Text>
                {title}
            </Text>
            <Text bold={theme.text.bold.md} size={theme.text.size.body2}>
                {formatNumber(value)}
            </Text>
        </div>
    </div>
)


const BatchDetailsSlider = () => {
    const { isBatchDetailsVisible, setIsBatchDetailsVisible, selectedBatch } = useClaimsContext()

    // Mock data - in a real app, this would come from your API
    const stats = {
        totalClaims: selectedBatch?.totalClaims || 156,
        approved: selectedBatch?.processedClaims || 142,
        rejected: selectedBatch?.rejectedClaims || 8,
        flagged: selectedBatch?.flaggedClaims || 6,
        expectedAmount: selectedBatch?.expectedPayout || 'GHS 8,112.00',
        approvedAmount: selectedBatch?.totalCost || 'GHS 7,850.50',
        verification: {
            full: 98,
            partial: 42,
            none: 16
        },
        claimTypes: {
            ipd: 45,      // In-Patient Department
            opd: 78,      // Out-Patient Department
            paed: 12,     // Pediatrics
            medi: 15,     // Medical
            opdc: 32,     // Out-Patient Dental Care
            asur: 8,      // Ambulatory Surgery
            ent: 4,       // Ear, Nose, and Throat
            lab: 22,      // Laboratory
            radio: 18,    // Radiology
            physio: 7     // Physiotherapy
        },
        verificationStatus: {
            fullyVerified: Math.floor((selectedBatch?.totalClaims || 156) * 0.7),
            partiallyVerified: Math.floor((selectedBatch?.totalClaims || 156) * 0.25),
            notVerified: (selectedBatch?.totalClaims || 156) - Math.floor((selectedBatch?.totalClaims || 156) * 0.7) - Math.floor((selectedBatch?.totalClaims || 156) * 0.25)
        }
    }

    const ClaimTypes = () => {
        return (
            <div className="flex flex-col bg-bg-secondary py-0.5 px-3 rounded-lg">
                {
                    Object.entries(stats.claimTypes).map(([key, value], index) => (
                        <FinancialInfoItem
                            label={key.toUpperCase()}
                            value={value}
                            showDivider={index !== Object.entries(stats.claimTypes).length - 1}
                        />
                    ))
                }
            </div>
        )
    }

    return (
        <AnimatePresence>
            {isBatchDetailsVisible && (
                <Overlay onClick={() => setIsBatchDetailsVisible(false)}>
                    <AnimatePresence>
                        {isBatchDetailsVisible && (
                            <SlideIn
                                direction="right"
                                className="absolute top-0 right-0 w-[350px] bg-bg-primary h-full flex flex-col gap-2 px-4 py-4 overflow-y-auto"
                            // onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between border-b border-border-primary pb-3">
                                    <div className="flex items-center gap-2">
                                        <Text size={theme.text.size.HM} bold={theme.text.bold.md2}>
                                            Batch Details
                                        </Text>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* Verification Status */}
                                    <div className="space-y-2">
                                        <Text size={theme.text.size.body} bold={theme.text.bold.md2}>
                                            Verification Status
                                        </Text>
                                        <div className="flex flex-col gap-1.5">
                                            <StatCard
                                                title="Fully Verified"
                                                value={stats.verificationStatus.fullyVerified}
                                                icon={FaUserCheck}
                                                color={theme.colors.text.success}
                                                bgColor={`${theme.colors.text.success}10`}
                                            />
                                            <StatCard
                                                title="Partially Verified"
                                                value={stats.verificationStatus.partiallyVerified}
                                                icon={FaUserClock}
                                                color={"#d96e11"}
                                                bgColor={"#FFA50010"}
                                            />
                                            <StatCard
                                                title="Not Verified"
                                                value={stats.verificationStatus.notVerified}
                                                icon={FaUserTimes}
                                                color={theme.colors.text.danger}
                                                bgColor={`${theme.colors.text.danger}10`}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Text size={theme.text.size.body} bold={theme.text.bold.md2}>
                                            Financials
                                        </Text>
                                        <div className="bg-bg-secondary py-0.5 px-3 rounded-lg">
                                            <FinancialInfoItem
                                                label="Expected Amount"
                                                value={stats.expectedAmount}
                                                showDivider={true}
                                            />
                                            <FinancialInfoItem
                                                label="Approved Amount"
                                                value={stats.approvedAmount}
                                                valueColor={theme.colors.text.success}
                                                showDivider={false}
                                            />
                                        </div>
                                    </div>

                                    {/* Claim Types */}
                                    <div className="space-y-2">
                                        <Text size={theme.text.size.body} bold={theme.text.bold.md2}>
                                            Claim Types
                                        </Text>
                                        <ClaimTypes />
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-border-primary">
                                    <Button
                                        text="Close Details"
                                        onClick={() => setIsBatchDetailsVisible(false)}
                                        className="w-full"
                                    />
                                </div>
                            </SlideIn>
                        )}
                    </AnimatePresence>
                </Overlay>
            )}
        </AnimatePresence>
    )
}

export default BatchDetailsSlider
