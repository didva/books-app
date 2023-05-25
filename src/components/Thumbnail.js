import React from 'react';

const Thumbnail = ({volumeInfo}) => {
    return (
        <>
            {volumeInfo?.imageLinks?.thumbnail &&
                <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title}/>
            }
        </>
    );
}

export default Thumbnail;