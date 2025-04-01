'use client'

import { protectedApi } from "@/app/utils/apis/api";
import { DropdownItem } from "@/utils/@types";
import { useEffect, useRef, useState } from "react";
import { useClaimsFormContext } from "../../context/context";
import { useMutation } from "@tanstack/react-query";

const useServices = () => {
    const [serviceItems, setServiceItems] = useState<DropdownItem[]>([])
    const {formik, handleAddLabTest, labTestValue, setLabtestValue} = useClaimsFormContext()

    const useServices = async (query: string, controller?: AbortController) => {
        const response = await protectedApi.GET(`services/search?query=${query}&limit=10`, {}, controller?.signal);
        return response;
    };

    const convertToServiceItem = (services : any[]) => {
        const newServices : DropdownItem[] = []
        services.map((service, index) => {
            newServices.push({ key: service.code, label: `${service.code} (${service.service})`, onClick: () => {
                handleAddLabTest(service.code)
                setLabtestValue("")
            }})
            if(services.length - 1 !== index)
                newServices.push({ type: "divider", key: `divider-${service.code}` })
        })
        setServiceItems(newServices)
    }
    
    const { mutate: useServicesMutation, isPending: isServicesPending } = useMutation({
        mutationFn: async (query: string) => {
            controllerRef.current?.abort();
            controllerRef.current = new AbortController();
            return useServices(query, controllerRef.current);
        },
        onSuccess: (data) => {
            convertToServiceItem(data)
        },
    });

    useEffect(()=>{
        if(isServicesPending)
            return setServiceItems([{type : "loading", key : "loading"}])
    },[isServicesPending])
    
    const controllerRef = useRef<AbortController | null>(null);
    
    useEffect(() => {
        if (labTestValue) {
            useServicesMutation(labTestValue);
        }
    }, [labTestValue]);

    return {serviceItems}
}

export default useServices