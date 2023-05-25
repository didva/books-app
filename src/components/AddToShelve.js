import React, {useState, useEffect, useContext, createRef, useCallback} from 'react';
import UserContext from "../contexts/UserContext";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";


const AddToShelve = ({volumeId}) => {

    const {user} = useContext(UserContext);
    const booksApiService = useBooksApiService();
    const [shelves, setShelves] = useState([]);
    const [popupRefs, setPopupRefs] = useState({});


    useEffect(() => {
        const refs = shelves.reduce((refs, shelve) => {
            refs[shelve.id] = createRef();
            return refs;
        }, {});
        setPopupRefs(refs);
    }, [shelves]);

    const loadShelves = useCallback(() => {
        booksApiService.getShelves().then(shelves => {
            setShelves(shelves.items.filter(shelve => shelve.access !== 'PRIVATE'));
        });
    }, [booksApiService, setShelves]);

    const addToShelve = useCallback((shelveId, volumeId) => {
        booksApiService.addToShelve(shelveId, volumeId).then(() => {
            if (!popupRefs[shelveId]) {
                return;
            }
            popupRefs[shelveId].current.style.visibility = "visible";
            setTimeout(() => {
                popupRefs[shelveId].current.style.visibility = "hidden";
            }, 1000);
        });
    }, [booksApiService, popupRefs]);

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
                                {shelves && shelves.map(shelve =>
                                    <div key={shelve.id}>
                                        <div className="add-to-shelve-popup-title">{shelve.title}</div>
                                        <input value="add" type="button" onClick={() => addToShelve(shelve.id, volumeId)}/>
                                        <div ref={popupRefs[shelve.id]} style={{visibility: "hidden"}}>Volume is added to {shelve.title}</div>
                                    </div>
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