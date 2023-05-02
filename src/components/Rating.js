import React from 'react';

export default function Rating({volumeInfo}) {
    return (
        <React.Fragment>
            {volumeInfo.averageRating &&
                <React.Fragment>
                    Rating: {volumeInfo.averageRating} ({volumeInfo.ratingsCount})
                </React.Fragment>
            }
        </React.Fragment>
    );
}