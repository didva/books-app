import React, {useCallback, useContext} from 'react';
import UserContext from "../contexts/UserContext";
import BooksApiServiceContext from "../contexts/BooksApiServiceContext";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const BooksApiService = ({children, baseUrl, apiKey}) => {

    const {user} = useContext(UserContext);
    const getUrl = useCallback((path) => {
        return `${baseUrl}${path}?key=${apiKey}${user?.token ? '&access_token=' + user?.token : ""}`;
    }, [baseUrl, apiKey, user]);

    const bookApiService = {
        getVolumes: async (queryPath, query, maxResults) => {
            let queryParam = ""
            if (query || queryPath === '/volumes') {
                queryParam = `&q=${query ? query : '""'}`;
            }
            if (maxResults) {
                queryParam += `&maxResults=${maxResults}`
            }
            const url = getUrl(queryPath) + queryParam;
            return fetch(url, {
                method: 'GET',
                headers
            }).then(
                response => response.json()
            );
        },

        getVolume: async (id) => {
            const url = getUrl(`/volumes/${id}`);
            return fetch(url, {
                method: 'GET',
                headers
            }).then(response => response.json());
        },

        getShelves: async () => {
            const url = getUrl('/mylibrary/bookshelves');
            return fetch(url, {
                method: 'GET',
                headers
            }).then(response =>
                response.json()
            );
        },

        getShelve: async (id) => {
            const url = getUrl(`/mylibrary/bookshelves/${id}`);
            return fetch(url, {
                method: 'GET',
                headers
            }).then(
                response => response.json()
            );
        },

        addToShelve: async (shelveId, volumeId) => {
            const url = getUrl(`/mylibrary/bookshelves/${shelveId}/addVolume`) + `&volumeId=${volumeId}`;
            return fetch(url, {
                method: 'POST',
                headers
            });
        },

        removeFromShelve: async (shelveId, volumeId) => {
            const url = getUrl(`/mylibrary/bookshelves/${shelveId}/removeVolume`) + `&volumeId=${volumeId}`;
            return fetch(url, {
                method: 'POST',
                headers
            });
        }
    }

    return (
        <BooksApiServiceContext.Provider value={bookApiService}>
            {children}
        </BooksApiServiceContext.Provider>
    );

}

export default BooksApiService;