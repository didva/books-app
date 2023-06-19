import React, {useState, useEffect} from "react";
import Loader from "./Loader";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import {Col, Row} from "react-bootstrap";
import Thumbnail from "./Thumbnail";

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
    }, [query, booksApiService, queryPath, removedTrigger]);

    return (
        <>
            <Loader loading={loading}/>
            {!loading && volumes?.length > 0 ? volumes.map(volume =>
                <Row className="m-md-2" key={volume.id}>
                    <Col md="2">
                        <Thumbnail volume={volume} shelveId={shelveId} removeFromShellTrigger={() => setRemovedTrigger((prev) => !prev)}/>
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
};

export default VolumeList;