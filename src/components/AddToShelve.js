import React, {useState, useContext, useCallback} from 'react';
import UserContext from "../contexts/UserContext";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import AddToShelveButton from "./AddToShelveButton";


const AddToShelve = ({volumeId}) => {

    const {user} = useContext(UserContext);
    const booksApiService = useBooksApiService();
    const [shelves, setShelves] = useState([]);

    const loadShelves = useCallback(() => {
        booksApiService.getShelves().then(shelves => {
            setShelves(shelves.items.filter(shelve => shelve.access !== 'PRIVATE'));
        });
    }, [booksApiService, setShelves]);

    const removePopup = useCallback(() => {
        setShelves([]);
    }, [setShelves]);

    const preventPropagation = useCallback((e) => {
        e.stopPropagation();
    }, []);

    return (
        <div>
            {user &&
                <>
                    <div>
                        <input type="button" value="Add to shelve" onClick={() => loadShelves()}/>
                    </div>
                    {shelves?.length > 0 &&
                        <div className="add-to-shelve-popup-background" onClick={removePopup}>
                            <div className="add-to-shelve-popup" onClick={preventPropagation}>
                                <h2>Please select shelve:</h2>
                                {shelves.map(shelve =>
                                    <AddToShelveButton key={shelve.id} volumeId={volumeId} shelve={shelve}/>
                                )}
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default AddToShelve;