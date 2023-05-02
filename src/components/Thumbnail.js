import React from 'react';

function Thumbnail(props) {
    return (
        <React.Fragment>
            {props.volumeInfo.imageLinks && props.volumeInfo.imageLinks.thumbnail &&
                <img src={props.volumeInfo.imageLinks.thumbnail} alt={props.volumeInfo.title}/>
            }
        </React.Fragment>
    );
}

export default Thumbnail;