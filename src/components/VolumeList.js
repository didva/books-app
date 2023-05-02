import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Loader from './Loader';
import Thumbnail from './Thumbnail';
import Rating from "./Rating";

function VolumeList(props) {
    const [volumes, setVolumes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("VolumeList!")
        console.log("AAAA:" + props.url + props.query + props.apiKey);
        setVolumes(() => []);
        setLoading(() => true);
        const url = props.url + '?key=' + props.apiKey + '&q=' + (props.query ? props.query : '""');
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(volumes => {
                setLoading(() => false);
                setVolumes(() => volumes.items);
            });
    }, [props.url, props.query, props.apiKey]);

    return (
        <React.Fragment>
            <Loader loading={loading}/>
            <div>
                {!loading && volumes && volumes.map(volume =>
                    <div key={volume.id} className="volumes-row">
                        <div className="volumes-img-box">
                            <Thumbnail volumeInfo={volume.volumeInfo}/>
                            <div>
                                <Link to={"/volume?id=" + volume.id}>{volume.volumeInfo.title}</Link>
                            </div>
                            <Rating volumeInfo={volume.volumeInfo}/>
                        </div>
                        <div className="volumes-description">
                            {volume.volumeInfo.description}
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default VolumeList;