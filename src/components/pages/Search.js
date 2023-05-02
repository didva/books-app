import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom'
import VolumeList from "../VolumeList";
import FiltersList from "../FiltersList";
import {getFiltersObject, getQuery} from "../../utils/SearchUtils";

const filtersList = [
    {id: "global", name: "General"},
    {id: "intitle", name: "Title"},
    {id: "inauthor", name: "Author"},
    {id: "inpublisher", name: "Publisher"},
    {id: "subject", name: "Subject"}]

function Search(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(getFiltersObject(searchParams, filtersList));
    const [query, setQuery] = useState(getQuery(filters));

    const onSubmit = (e) => {
        e.preventDefault();
        setQuery(getQuery(filters));
        let searchParamsObj = {};
        for (const filter of Object.keys(filters)) {
            searchParamsObj = {
                [filter]: filters[filter].value,
                ...searchParamsObj
            };
        }
        setSearchParams(searchParamsObj);
    };

    return (
        <div>
            <h1 className="page-header">Search</h1>
            <FiltersList filters={filters} setFilters={setFilters} onSubmit={onSubmit}/>
            <VolumeList url={props.baseUrl + '/volumes'} apiKey={props.apiKey} query={query}/>
        </div>
    );
}

export default Search;