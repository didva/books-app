import React, {useCallback, useContext} from 'react';
import UserContext from "../contexts/UserContext";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import Button from "react-bootstrap/Button";


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
                <Button variant="primary" onClick={removeFromShelve} size="sm">Remove from shelve</Button>
            }
        </>
    );
}

export default RemoveFromShelve;