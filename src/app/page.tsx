import { redirect } from "next/navigation"
import Home from "./(main)/main"
import MainTemplate from "./(main)/template"

const Main = () => {
    redirect("/patient-verification")
    return (
        <div>
            <MainTemplate>
                <Home />
            </MainTemplate>
        </div>
    )
}
export default Main