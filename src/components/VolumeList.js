import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Loader from './Loader';
import Rating from "./Rating";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import RemoveFromShelve from "./RemoveFromShelve";
import {Card, Col, Row} from "react-bootstrap";

const VolumeList = ({queryPath, query, shelveId}) => {
    const [volumes, setVolumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [removedTrigger, setRemovedTrigger] = useState(false);
    const booksApiService = useBooksApiService();

    useEffect(() => {
        setVolumes([]);
        setLoading(true);
        booksApiService.getVolumes(queryPath, query).then(volumes => {
            setLoading(false);
            setVolumes(volumes.items);
        });
    }, [query, booksApiService, removedTrigger, queryPath]);

    return (
        <>
            <Loader loading={loading}/>
            {!loading && volumes?.length > 0 ? volumes.map(volume =>
                <Row className="m-md-2" key={volume.id}>
                    <Col md="2">
                        <Card style={{ width: '15rem' }}>
                            <Card.Img variant="top" src={volume.volumeInfo?.imageLinks?.thumbnail} />
                            <Card.Body>
                                <Link to={"/volume?id=" + volume.id}>
                                    <Card.Title>{volume.volumeInfo.title}</Card.Title>
                                </Link>
                                <Card.Text>
                                    <Rating volumeInfo={volume.volumeInfo}/>
                                </Card.Text>
                                {shelveId &&
                                    <RemoveFromShelve volumeId={volume.id} shelveId={shelveId} callback={() => setRemovedTrigger((prev) => !prev)}/>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="8">
                        {volume.volumeInfo.description}
                    </Col>
                </Row>
            ) : !loading && (
                <h2>No volumes found</h2>
            )}
        </>
    );
}

export default VolumeList;