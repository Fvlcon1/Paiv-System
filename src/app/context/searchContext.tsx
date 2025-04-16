'use client'

import { createContext, ReactNode, useContext, useState } from "react";
import useSearchResults from "../(main)/components/main/components/results table/utils/useSearchResults";
import { UseMutateFunction } from "@tanstack/react-query";

export const SearchContext = createContext<{
    getSearchResults: UseMutateFunction<any, Error, {
        searchValue?: string;
    }, unknown>,
    isLoading: boolean
    isError: boolean
    error: Error | null
}>({
    getSearchResults : ()=>{},
    isLoading : true,
    isError : false,
    error : null
});

export const SearchProvider = (
    {
        children
    } : {
        children : ReactNode
    }
) => {
    const { getSearchResults, isLoading, isError, error } = useSearchResults();

    return (
        <SearchContext.Provider
            value={{ getSearchResults, isLoading, isError, error }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
