import React, {useState, useContext, useCallback} from "react";
import UserContext from "../contexts/UserContext";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import AddToShelveButton from "./AddToShelveButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const AddToShelve = ({volumeId}) => {

    const {user} = useContext(UserContext);
    const booksApiService = useBooksApiService();
    const [shelves, setShelves] = useState([]);

    const loadShelves = useCallback(() => {
        booksApiService.getShelves().then(shelves => {
            setShelves(shelves.items.filter(shelve => shelve.access !== "PRIVATE"));
        });
    }, [booksApiService, setShelves]);

    const removePopup = useCallback(() => {
        setShelves([]);
    }, [setShelves]);

    return (
        <div>
            {user &&
                <>
                    <div>
                        <Button variant="primary" onClick={() => loadShelves()}>Add to shelve</Button>
                    </div>
                    <Modal show={shelves?.length > 0} onHide={removePopup}>
                        <Modal.Header closeButton>
                            <Modal.Title>Please select shelve:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {shelves.map(shelve =>
                                <AddToShelveButton key={shelve.id} volumeId={volumeId} shelve={shelve}/>
                            )}
                        </Modal.Body>
                    </Modal>
                </>
            }
        </div>
    );
};

export default AddToShelve;