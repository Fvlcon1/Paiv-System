import { useRegisterContext } from "../context/register-context"
import FacilityInfoForm from "./facility-info-form"
import LocationInfoForm from "./location-info-form"
import ContactPersonForm from "./contact-person-form"
import CredentialingForm from "./credentialing-form"
import CompletedForm from "./completed"
import AuthenticationDetailsForm from "./authentication-details-form"

const FormViewState = () => {
    const { step, setStep, showForm } = useRegisterContext()
    
    return (
        step === 1 
        ? <AuthenticationDetailsForm />
        : step === 2 
        ? <FacilityInfoForm /> 
        : step === 3 
        ? <LocationInfoForm /> 
        : step === 4 
        ? <ContactPersonForm /> 
        : step === 5 
        ? <CredentialingForm /> 
        : step === 6 
        ? <CompletedForm /> 
        : null
    )
}
export default FormViewState