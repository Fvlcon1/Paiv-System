import { getWithExpiry, setWithExpiry } from "@/utils/storage";
import { Provider } from "./types";

export const storeProviderId = (providerId: string) => {
    const ONE_HOUR_MS = 60 * 60 * 1000; // 1 hour in milliseconds
    setWithExpiry('providerId', providerId, ONE_HOUR_MS);
};

export const getProviderId = (): string | null => {
    return getWithExpiry('providerId');
};

export const transformProviderData = (data: any): Provider => {
    return {
        id: data.id,
        credentialingDocument: data.credentialing_document,
        credentialId: data.credential_id,
        issueDate: data.issue_date,
        expiryDate: data.expiry_date,
        contactPersonName: data.contact_person_name,
        contactPersonPhone: data.contact_person_phone,
        contactPersonEmail: data.contact_person_email,
        contactPersonRole: data.contact_person_role,
        region: data.region,
        district: data.district,
        gpsCoordinates: data.gps_coordinates,
        physicalAddress: data.physical_address,
        digitalAddress: data.digital_address,
        facilityName: data.facility_name,
        facilityId: data.facility_id,
        facilityType: data.facility_type,
        prescribingLevel: data.prescribing_level,
        phoneNumber: data.phone_number,
        email: data.email,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};