import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import Loader from '../Loader';
import Thumbnail from '../Thumbnail';
import Rating from "../Rating";

function Volume(props) {
    const [searchParams] = useSearchParams();
    const url = props.baseUrl + '/volumes/' + searchParams.get("id") + '?key=' + props.apiKey;
    const [volume, setVolume] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(() => true);
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(volume => {
                setLoading(() => false);
                setVolume(() => volume)
            });
    }, [url]);

    return (
        <div className="volume-container">
            <Loader loading={loading}/>
            {!loading && volume &&
                <div>
                    <h1 className="volume-header">{volume.volumeInfo.title}</h1>
                    <div className="volume-img-box">
                        <Thumbnail volumeInfo={volume.volumeInfo}/>
                        <Rating volumeInfo={volume.volumeInfo}/>
                    </div>
                    <div className="volume-description" dangerouslySetInnerHTML={{__html: volume.volumeInfo.description}}/>
                </div>
            }
        </div>
    );
}

export default Volume;