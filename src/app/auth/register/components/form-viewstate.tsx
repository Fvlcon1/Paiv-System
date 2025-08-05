import { useRegisterContext } from "../context/register-context"
import FacilityInfoForm from "./facility-info-form"
import LocationInfoForm from "./location-info-form"
import ContactPersonForm from "./contact-person-form"
import CredentialingForm from "./credentialing-form"
import CompletedForm from "./completed"

const FormViewState = () => {
    const { step, setStep } = useRegisterContext()
    
    return (
        step === 1 
        ? <FacilityInfoForm /> 
        : step === 2 
        ? <LocationInfoForm /> 
        : step === 3 
        ? <ContactPersonForm /> 
        : step === 4 
        ? <CredentialingForm /> 
        : step === 5 
        ? <CompletedForm /> 
        : null
    )
}
export default FormViewState