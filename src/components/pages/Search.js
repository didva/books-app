import React, {useCallback, useState} from "react";
import {useSearchParams} from "react-router-dom";
import VolumeList from "../VolumeList";
import FiltersList from "../FiltersList";
import {getFiltersObject, getQuery} from "../../utils/SearchUtils";

const filtersList = [
    {id: "global", name: "General"},
    {id: "intitle", name: "Title"},
    {id: "inauthor", name: "Author"},
    {id: "inpublisher", name: "Publisher"},
    {id: "subject", name: "Subject"}];

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(getFiltersObject(searchParams, filtersList));
    const [query, setQuery] = useState(getQuery(filters));

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setQuery(getQuery(filters));
        const searchParamsObj = Object.keys(filters).reduce((searchParamsObj, filter) => {
            searchParamsObj[filter] = filters[filter].value;
            return searchParamsObj;
        }, {});
        setSearchParams(searchParamsObj);
    }, [filters, setSearchParams, setQuery]);

    return (
        <div>
            <h1 className="page-header">Search</h1>
            <FiltersList filters={filters} setFilters={setFilters} onSubmit={onSubmit}/>
            <VolumeList queryPath={"/volumes"} query={query}/>
        </div>
    );
};

export default Search;