export const getFiltersObject = (searchParams, filtersList) => {
    return filtersList.reduce((filters, filter) => {
        const value = searchParams.get(filter.id);
        filters[filter.id] = {
            name: filter.name,
            value: value === null ? "" : value
        };
        return filters;
    }, {});
};

export const getQuery = (filters) => {
    const query = Object.keys(filters).reduce((query, filter) => {
        if (filter === "global") {
            return query;
        }
        const value = filters[filter].value;
        if (value) {
            if (query) {
                query += "+";
            }
            query += filter + ":" + value;
        }
        return query;
    }, filters["global"].value);

    return query ? query : "\"\"";
};