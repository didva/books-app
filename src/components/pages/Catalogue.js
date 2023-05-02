import React from 'react';
import VolumeList from '../VolumeList';

function Catalogue(props) {
    return (
        <div>
            <h1 className="page-header">Volumes</h1>
            <VolumeList url={props.baseUrl + '/volumes'} apiKey={props.apiKey}/>
        </div>
    );
}

export default Catalogue;