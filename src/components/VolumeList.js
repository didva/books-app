import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Loader from './Loader';
import Thumbnail from './Thumbnail';
import Rating from "./Rating";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import RemoveFromShelve from "./RemoveFromShelve";

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
            <div>
                {!loading && volumes?.length > 0 ? volumes.map(volume =>
                    <div key={volume.id} className="volumes-row">
                        <div className="volumes-img-box">
                            <Thumbnail volumeInfo={volume.volumeInfo}/>
                            <div>
                                <Link to={"/volume?id=" + volume.id}>{volume.volumeInfo.title}</Link>
                            </div>
                            <Rating volumeInfo={volume.volumeInfo}/>
                            {shelveId &&
                                <RemoveFromShelve volumeId={volume.id} shelveId={shelveId} callback={() => setRemovedTrigger((prev) => !prev)}/>
                            }
                        </div>
                        <div className="volumes-description">
                            {volume.volumeInfo.description}
                        </div>
                    </div>
                ) : (
                    <h2>No volumes found</h2>
                )}
            </div>
        </>
    );
}

export default VolumeList;