import {createContext, useContext} from "react";

const BooksApiServiceContext = createContext({
    getVolumes: (queryPath, query, maxResults) => {},
    getVolume: (id) => {},
    getShelves: () => {},
    getShelve: (id) => {},
    addToShelve: (shelveId, volumeId) => {},
    removeFromShelve: (shelveId, volumeId) => {}
});

export const useBooksApiService = () => {
    const context = useContext(BooksApiServiceContext);
    if (context == null) {
        throw new Error("BooksApiServiceContext must be provided!");
    }
    return context;
};

export default BooksApiServiceContext;