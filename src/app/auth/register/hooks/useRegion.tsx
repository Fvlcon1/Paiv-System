import { useState, useEffect } from "react"
import { DropdownItem } from "@/utils/@types"
import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"

const useRegion = (formik : any) => {
    const [searchRegion, setSearchRegion] = useState("")
    const [regionDropdown, setRegionDropdown] = useState<DropdownItem[]>([])
    const [searchDistrict, setSearchDistrict] = useState("")
    const [districtDropdown, setDistrictDropdown] = useState<DropdownItem[]>([])

    const getRegions = async () => {
        const response = await protectedApi.GET("https://regions-and-districts-in-ghana.onrender.com/regions")
        return response
    }

    const { data: regionsData, isLoading: regionsLoading, isRefetching : regionsRefetching } = useQuery({
        queryKey: ["regions"],
        queryFn: getRegions,
        refetchOnWindowFocus: false
    })

    const getRegionsDropdown = () => {
        const regex = new RegExp(searchRegion, 'i');
        const filteredRegions = regionsData?.regions?.filter((region: any) => regex.test(region.label));

        const dropdown : DropdownItem[] = []
        filteredRegions?.map((region: any, index : number) => {
            dropdown.push({
                key: index.toString(),
                label: region.label,
                onClick: () => {
                    formik.setFieldValue("region", region.label)
                    setSearchRegion(region.label)
                }
            })
            if(index !== filteredRegions.length - 1) {
                dropdown.push({
                    type: "divider",
                    key: `divider-${index}`
                })
            }
        })

        setRegionDropdown(dropdown)
    }

    const getDistrictsDropdown = () => {
        if(!formik.values.region)
            return setDistrictDropdown([{key : "1", label : "Select region first", disabled : true}])

        const regex = new RegExp(searchDistrict, 'i');
        const region = regionsData?.regions?.find((region: any) => region.label === formik.values.region)
        const filteredDistricts = region?.districts?.filter((district: any) => regex.test(district.label));

        const dropdown : DropdownItem[] = []
        filteredDistricts?.map((district: any, index : number) => {
            dropdown.push({
                key: index.toString(),
                label: district.label,
                onClick: () => {
                    formik.setFieldValue("district", district.label)
                    setSearchDistrict(district.label)
                }
            })
            if(index !== filteredDistricts.length - 1) {
                dropdown.push({
                    type: "divider",
                    key: `divider-${index}`
                })
            }
        })

        setDistrictDropdown(dropdown)
    }

    useEffect(()=>{
        if(regionsLoading){
            console.log("loading")
            setRegionDropdown([{key : "1", label : "Loading...", disabled : true}])
        }
    },[regionsLoading, regionsRefetching])

    useEffect(() => {
        getRegionsDropdown()
    }, [regionsData, searchRegion])

    useEffect(() => {
        getDistrictsDropdown()
    }, [regionsData, searchDistrict, formik.values.region])
    
    return {
        regionDropdown,
        districtDropdown,
        getRegionsDropdown,
        searchRegion,
        searchDistrict,
        getDistrictsDropdown,
        setSearchRegion,
        setSearchDistrict,
    }
}
export default useRegion