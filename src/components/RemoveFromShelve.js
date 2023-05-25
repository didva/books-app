import React, {useCallback, useContext} from 'react';
import UserContext from "../contexts/UserContext";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";


const RemoveFromShelve = ({shelveId, volumeId, callback}) => {

    const {user} = useContext(UserContext);
    const booksApiService = useBooksApiService();

    const removeFromShelve = useCallback(() => {
        booksApiService.removeFromShelve(shelveId, volumeId).then(() => {
            callback();
        });
    }, [booksApiService, shelveId, volumeId, callback]);

    return (
        <>
            {user &&
                <input type="button" value="Remove from shelve" onClick={removeFromShelve}/>
            }
        </>
    );
}

export default RemoveFromShelve;