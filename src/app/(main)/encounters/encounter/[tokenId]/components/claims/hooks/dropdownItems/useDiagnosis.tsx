'use client'

import { protectedApi } from "@/app/utils/apis/api";
import { DropdownItem } from "@/utils/@types";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useClaimsFormContext } from "../../context/context";
import { useDebouncedCallback } from "use-debounce";

const useDiagnosis = () => {
    const [diagnosisItems, setDiagnosisItems] = useState<DropdownItem[]>([])
    const {handleAddDiagnosis, setDiagnosis, diagnosis} = useClaimsFormContext()
    const controllerRef = useRef<AbortController | null>(null);

    const getDiagnosis = async (query? : string) => {
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();
        const response = await protectedApi.GET(`icd10/search?query=${query}&limit=10`, {}, controllerRef.current?.signal);
        return response;
    };

    const convertToDiagnosisItem = useCallback((diagnosis : any[]) => {
        const newDiagnosis : DropdownItem[] = []
        diagnosis.forEach((item, index) => {
            newDiagnosis.push({ key: `${item.icd_code}-${index}`, label: `${item.icd_code} (${item.diagnosis_description})`, onClick: () => {
                handleAddDiagnosis({
                    description : item.diagnosis_description,
                    GRDG : item.gdrg_code,
                    GDRGName : item.gdrg_name,
                    ICD10 : item.icd_code,
                    tariff : item.tariff ?? 0,
                    primary : false
                })
                setDiagnosis("")
            }})
            if(diagnosis.length - 1 !== index)
                newDiagnosis.push({ type: "divider", key: `divider-${item.icd_code}-${index}` })
        })
        setDiagnosisItems(newDiagnosis)
    }, [handleAddDiagnosis, setDiagnosis, setDiagnosisItems])

    const {mutate : getDiagnosisMutation, isPending : isDiagnosisPending} = useMutation({
        mutationFn : getDiagnosis,
        onSuccess : (data) => {
            convertToDiagnosisItem(data)
        }
    })

    const debouncedGetDiagnosis = useDebouncedCallback((query: string) => {
        getDiagnosisMutation(query);
    }, 300);

    useEffect(()=>{
        if(isDiagnosisPending)
            setDiagnosisItems([{type : "loading", key : "loading"}])
    },[isDiagnosisPending])
    
    useEffect(() => {
        debouncedGetDiagnosis(diagnosis);
        return () => {
            debouncedGetDiagnosis.cancel();
        };
    }, [diagnosis, debouncedGetDiagnosis])

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    return {diagnosisItems}
}
export default useDiagnosis