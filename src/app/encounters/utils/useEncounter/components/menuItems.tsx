'use client'

import { useMemo, useContext, useEffect, useState } from "react";
import { mainContext } from "@/app/context/context";
import { useEncounterContext } from "@/app/encounters/context/encounterContext";
import { DispositionViewState } from "@/app/utils/types";
import { DropdownItem } from "@/utils/@types";

const useDropdownItems = () => {
    const { setDispositionViewState, nhisDetails } = useContext(mainContext);
    const { setShowClaims, setShowEncounterDetails } = useEncounterContext();
    const [menuItems, setMenuItems] = useState<DropdownItem[]>([])

    useEffect(()=>{
        console.log({nhisDetails})
        const menuItems: DropdownItem[] = [
            { key: "1", label: "Close Encounter", onClick: () => {
                setDispositionViewState(DispositionViewState.NHIS_DETAILS);
            }},
            { key: "2", label: "Submit Claim", onClick: () => {
                setShowClaims(true);
            }},
            { key: "3", label: "Visit Encounter", type: "link", href: nhisDetails?.token ? `/encounter/${nhisDetails.token}` : "#" },
            { type: "divider", key: "divider-1" },
            { key: "4", label: "More Details...", onClick: () => {
                setShowEncounterDetails(true);
            }},
        ]
        setMenuItems(menuItems)
    },[nhisDetails])


    return { menuItems };
};

export default useDropdownItems;
