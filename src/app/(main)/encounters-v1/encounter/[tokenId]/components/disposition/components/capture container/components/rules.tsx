import Text from "@styles/components/text"
import { FaCheckSquare } from "react-icons/fa"

const Rules = () => {
    return (
        <div className="w-full flex flex-col gap-1 py-[15px] px-2">
            <div className="flex gap-1 items-center">
                <FaCheckSquare
                    color="green"
                />
                <Text>
                    Face the Camera Directly
                </Text>
            </div>
            <div className="flex gap-1 items-center">
                <FaCheckSquare
                    color="green"
                />
                <Text>
                    Ensure Good Lighting
                </Text>
            </div>
            <div className="flex gap-1 items-center">
                <FaCheckSquare
                    color="green"
                />
                <Text>
                    Remove Obstructions
                </Text>
            </div>
            <div className="flex gap-1 items-center">
                <FaCheckSquare
                    color="green"
                />
                <Text>
                    Position Within the Frame
                </Text>
            </div>
            <div className="flex gap-1 items-center">
                <FaCheckSquare
                    color="green"
                />
                <Text>
                    Stay Still
                </Text>
            </div>
        </div>
    )
}
export default Rules