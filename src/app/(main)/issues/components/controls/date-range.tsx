import Text from "@styles/components/text"
import theme from "@styles/theme"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import { useIssuesContext } from "../../context/context"

const DateRange = () => {
    const { selectedDateRange, setSelectedDateRange } = useIssuesContext()
    const { RangePicker } = DatePicker
    const handleDateChange = (value: string) => {
        setSelectedDateRange(value)
    }
    return (
        <div className="flex items-center gap-2">
            <Text
                bold={theme.text.bold.md}
            >
                Date Range
            </Text>
            <RangePicker
                placeholder={["dd/mm/yy", "dd/mm/yy"]}
                format="DD/MM/YYYY"
                style={{
                    outline: "none",
                    backgroundColor: "transparent",
                    color: theme.colors.text.secondary,
                    fontSize: "14px",
                    height: "30px"
                }}
                picker="date"
                value={selectedDateRange ? [dayjs(selectedDateRange), dayjs(selectedDateRange)] : undefined}
                onChange={(value) => {
                    if (value && Array.isArray(value) && value[0]) {
                        handleDateChange(value[0].format("DD/MM/YYYY"));
                    } else {
                        handleDateChange("");
                    }
                }}
            />
        </div>
    )
}

export default DateRange