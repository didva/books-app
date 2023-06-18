import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import Loader from '../Loader';
import Thumbnail from '../Thumbnail';
import {useBooksApiService} from "../../contexts/BooksApiServiceContext";

const Volume = () => {
    const [searchParams] = useSearchParams();
    const booksApiService = useBooksApiService();
    const [volume, setVolume] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        booksApiService.getVolume(searchParams.get("id")).then(volume => {
            setLoading(false);
            setVolume(volume)
        });
    }, [searchParams, booksApiService]);

    return (
        <div className="volume-container">
            <Loader loading={loading}/>
            {!loading && volume?.volumeInfo &&
                <div>
                    <h1 className="page-header">{volume.volumeInfo.title}</h1>
                    <div className="volume-img-box">
                        <Thumbnail volume={volume}/>
                    </div>
                    <div className="volume-description"
                         dangerouslySetInnerHTML={{__html: volume.volumeInfo.description}}/>
                </div>
            }
        </div>
    );
}

export default Volume;