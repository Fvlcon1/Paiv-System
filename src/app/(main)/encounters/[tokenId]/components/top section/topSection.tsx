import Images from "./components/images"
import Details from "./components/details"

const TopSection = () => {

    return (
        <div className="flex gap-8 items-center justify-center">
            <Images />
            <Details />
        </div>
    )
}
export default TopSection