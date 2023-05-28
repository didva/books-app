import React, {useCallback, useState} from 'react';
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import Button from "react-bootstrap/Button";
import {Alert, Col, Row} from "react-bootstrap";


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
        <Row className="m-md-2">
            <Col md="11">
                {shelve.title}
                {added &&
                    <Alert variant="success">Volume is added to {shelve.title}</Alert>
                }
            </Col>
            <Col md="1">
                <Button variant="primary" onClick={() => addToShelve(shelve.id, volumeId)} size="sm">Add</Button>
            </Col>
        </Row>
    );
}

export default AddToShelveButton;