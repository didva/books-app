import React, {useCallback, useState} from 'react';
import {useBooksApiService} from "../contexts/BooksApiServiceContext";


const AddToShelveButton = ({shelve, volumeId}) => {
    const [added, setAdded] = useState(false);
    const booksApiService = useBooksApiService();
    const addToShelve = useCallback((shelveId, volumeId) => {
        booksApiService.addToShelve(shelveId, volumeId).then(() => {
            setAdded(true);
            setTimeout(() => {
                setAdded(false);
            }, 1000);
        });
    }, [booksApiService]);

    return (
        <div>
            <div className="add-to-shelve-popup-title">{shelve.title}</div>
            <input value="add" type="button" onClick={() => addToShelve(shelve.id, volumeId)}/>
            {added &&
                <div>Volume is added to {shelve.title}</div>
            }
        </div>
    );
}

export default AddToShelveButton;