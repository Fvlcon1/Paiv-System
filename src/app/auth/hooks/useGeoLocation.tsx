import theme from "@styles/theme";
import { useState } from "react"
import toast from "react-hot-toast"
import { IoIosInformationCircle, IoMdPulse } from "react-icons/io";

const useGeoLocation = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const getLocation = () : Promise<any> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(toast.error('Geolocation is not supported by your browser.'));
                return;
            }
    
            toast.loading('Please allow access when prompted...', {
                duration: 0,
                id: "location",
            })
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    toast.dismiss("location")
                    toast.success('Location access granted.', {
                        icon : (
                            <IoIosInformationCircle 
                                color="#4287f5"
                                size={20}
                                className="mr-[-5px]"
                            />
                        )
                    });
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (err) => {
                    toast.dismiss("location")
                    switch (err.code) {
                        case err.PERMISSION_DENIED:
                          reject(toast.error("Location access denied. Please allow location access."));
                          break;
                        case err.POSITION_UNAVAILABLE:
                          reject(toast.error("Location unavailable. Ensure GPS or Wi-Fi is enabled."));
                          break;
                        case err.TIMEOUT:
                          reject(toast.error("Location request timed out. Try again."));
                          break;
                        default:
                          reject(toast.error("An unknown error occurred."));
                          break;
                      }
                    console.error(err);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        })
    };

    return {
        location,
        getLocation
    }
}
export default useGeoLocation