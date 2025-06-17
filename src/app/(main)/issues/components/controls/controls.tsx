import DateRange from "./date-range"
import Priorities from "./priorities"
import Status from "./status"

const Controls = () => {
    return (
        <div className="w-full items-center gap-4 flex">
            <Status />
            <div className="h-[20px] w-[1px] bg-[#DFE7EA]" />
            <Priorities />
            <div className="h-[20px] w-[1px] bg-[#DFE7EA]" />
            <DateRange />
        </div>
    )
}

export default Controls