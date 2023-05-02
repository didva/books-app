import React from 'react';
import Filter from "./Filter";

function FiltersList({filters, setFilters, onSubmit}) {

    const onChange = (id, value) => {
        setFilters((prev) => {
           return {
               ...prev,
               [id]: {
                   value: value,
                   name: prev[id].name
               }
           };
        });
    }

    return (
        <div className="search-filters-container">
            <form onSubmit={onSubmit}>
                <div className="filters">
                    {filters && Object.keys(filters).map(filter =>
                        <Filter  key={filter} id={filter} name={filters[filter].name} value={filters[filter].value} onChange={onChange}/>
                    )}
                    <input type="submit" value="Search..." className="search-submit"/>
                </div>
            </form>
        </div>
    );
}

export default FiltersList;