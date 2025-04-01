'use client'

import { protectedApi } from "@/app/utils/apis/api";
import { DropdownItem } from "@/utils/@types";
import { useEffect, useRef, useState } from "react";
import { useClaimsFormContext } from "../../context/context";
import { useMutation } from "@tanstack/react-query";

const useDrugs = () => {
    const [drugItems, setDrugItems] = useState<DropdownItem[]>([])
    const {drugFormik} = useClaimsFormContext()

    const useDrugs = async (query: string, controller?: AbortController) => {
        const response = await protectedApi.GET(`medicines/search?query=${query}&limit=10`, {}, controller?.signal);
        return response;
    };

    const convertToDrugItem = (drugs : any[]) => {
        const newDrugs : DropdownItem[] = []
        drugs.map((drug, index) => {
            newDrugs.push({ key: drug.code, label: `${drug.code} (${drug.generic_name})`, onClick: () => drugFormik.setFieldValue("code", drug.code) })
            if(drugs.length - 1 !== index)
                newDrugs.push({ type: "divider", key: `divider-${drug.code}` })
        })
        setDrugItems(newDrugs)
    }
    
    const { mutate: useDrugsMutation, isPending: isDrugsPending } = useMutation({
        mutationFn: async (query: string) => {
            controllerRef.current?.abort();
            controllerRef.current = new AbortController();
            return useDrugs(query, controllerRef.current);
        },
        onSuccess: (data) => {
            convertToDrugItem(data)
        },
    });

    useEffect(()=>{
        if(isDrugsPending)
            setDrugItems([{type : "loading", key : "loading"}])
    },[isDrugsPending])
    
    const controllerRef = useRef<AbortController | null>(null);
    
    useEffect(() => {
        if (drugFormik.values.code) {
            useDrugsMutation(drugFormik.values.code);
        }
    }, [drugFormik.values.code]);

    return {drugItems}
}

export default useDrugs