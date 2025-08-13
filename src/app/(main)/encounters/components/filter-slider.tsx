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
import { useEncounterContext } from "@/app/(main)/encounters/context/encounterContext"
import { useEffect } from "react"
import { DatePicker, Switch } from "antd"
import Divider from "@components/divider/divider"
import ClickableTab from "@components/clickable/clickabletab"
import { IoClose } from "react-icons/io5"
const { RangePicker } = DatePicker;

const FilterSlider = () => {
    const { isFilterVisible, setIsFilterVisible } = useEncounterContext()
    useEffect(() => {
        console.log({ isFilterVisible })
    }, [isFilterVisible])
    return (
        <AnimatePresence>
            {
                isFilterVisible && (
                    <Overlay
                        onClick={() => setIsFilterVisible(false)}
                    >
                        <AnimatePresence>
                            {
                                isFilterVisible && (
                                    <SlideIn
                                        direction="right"
                                        className="absolute top-0 right-0 w-[300px] bg-bg-primary h-full flex flex-col gap-4 px-4 py-4"
                                    >
                                        <div className="flex w-full justify-between items-center border-b border-border-primary py-2 ml-[-1px]">
                                            <div className="flex items-center gap-2">
                                                <HiAdjustmentsHorizontal size={17} color={theme.colors.text.secondary} />
                                                <Text
                                                    size={theme.text.size.HM}
                                                    bold={theme.text.bold.md2}
                                                >
                                                    Filter
                                                </Text>
                                            </div>
                                            <ClickableTab
                                                onClick={() => setIsFilterVisible(false)}
                                            >
                                                <IoClose size={20} color={theme.colors.text.secondary} />
                                            </ClickableTab>
                                        </div>


                                        <div className="flex flex-col gap-3 h-full relative">
                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Date Submitted
                                                </Text>
                                                <div className="shadow-xs rounded-lg">
                                                    <RangePicker
                                                        style={{
                                                            height: "35px",
                                                            borderRadius: "8px",
                                                            fontFamily: "montserrat",
                                                            width: "100%",
                                                            fontSize: "12px",
                                                            color: theme.colors.text.secondary,
                                                            fontWeight: theme.text.bold.sm2,
                                                            borderColor: theme.colors.border.secondary,
                                                        }}
                                                    // value={fromDate ? [dayjs(fromDate), dayjs(toDate)] : undefined}
                                                    // onChange={(dates) => {
                                                    //     if (dates) {
                                                    //         setFromDate(dates[0].toISOString().split('T')[0]);
                                                    //         setToDate(dates[1].toISOString().split('T')[0]);
                                                    //     } else {
                                                    //         resetDate();
                                                    //     }
                                                    // }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Processing Date
                                                </Text>
                                                <div className="shadow-xs rounded-lg">
                                                    <RangePicker
                                                        style={{
                                                            height: "35px",
                                                            borderRadius: "8px",
                                                            fontFamily: "montserrat",
                                                            width: "100%",
                                                            fontSize: "12px",
                                                            color: theme.colors.text.secondary,
                                                            fontWeight: theme.text.bold.sm2,
                                                            borderColor: theme.colors.border.secondary,
                                                        }}
                                                    // value={fromDate ? [dayjs(fromDate), dayjs(toDate)] : undefined}
                                                    // onChange={(dates) => {
                                                    //     if (dates) {
                                                    //         setFromDate(dates[0].toISOString().split('T')[0]);
                                                    //         setToDate(dates[1].toISOString().split('T')[0]);
                                                    //     } else {
                                                    //         resetDate();
                                                    //     }
                                                    // }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex w-full rounded-xl p-3 bg-bg-secondary flex-col gap-3">
                                                <div className="flex items-center gap-2">
                                                    <Switch size="small" defaultChecked onChange={()=>{}} />
                                                    <Text>
                                                        Approved
                                                    </Text>
                                                </div>
                                                <Divider />
                                                <div className="flex items-center gap-2">
                                                    <Switch size="small" defaultChecked onChange={()=>{}} />
                                                    <Text>
                                                        Declined
                                                    </Text>
                                                </div>
                                                <Divider />
                                                <div className="flex items-center gap-2">
                                                    <Switch size="small" defaultChecked onChange={()=>{}} />
                                                    <Text>
                                                        Pending
                                                    </Text>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-2 absolute bottom-0 w-full">
                                                <OutlineButton
                                                    text="Reset"
                                                    icon={<GiMagicBroom size={15} color={theme.colors.text.secondary} />}
                                                    className="!flex-1"
                                                />
                                                <Button
                                                    text="Apply"
                                                    className="!flex-1"
                                                />
                                            </div>
                                        </div>
                                    </SlideIn>
                                )
                            }
                        </AnimatePresence>
                    </Overlay>
                )
            }
        </AnimatePresence>
    )
}

export default FilterSlider
