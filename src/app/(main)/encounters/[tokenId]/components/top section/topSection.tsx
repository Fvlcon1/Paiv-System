import Images from "./components/images"
import Details from "./components/details"

const TopSection = () => {

    return (
        <div className="flex gap-8 w-full items-center">

            {/* Images */}
            <Images />

            {/* Details */}
            <Details />
            
        </div>
    )
}
export default TopSection