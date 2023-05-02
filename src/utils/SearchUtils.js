export function getFiltersObject(searchParams, filtersList) {
    let filters = {};
    for (const filter of filtersList) {
        const value = searchParams.get(filter.id);
        filters = {
            [filter.id]: {
                name: filter.name,
                value: value === null ? "" : value
            },
            ...filters
        }
    }
    return filters;
}

export function getQuery(filters) {
    let query = filters["global"].value;
    for (const filter of Object.keys(filters)) {
        if (filter === "global") {
            continue;
        }
        const value = filters[filter].value;
        if (value) {
            if (query) {
                query += "+";
            }
            query += (filter + ":" + value);
        }
    }
    return query ? query : '""';
}