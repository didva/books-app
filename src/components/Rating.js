import React from "react";

const Rating = ({volumeInfo}) => {
    return (
        <>
            {volumeInfo.averageRating &&
                <>
                    Rating: {volumeInfo.averageRating} ({volumeInfo.ratingsCount})
                </>
            }
        </>
    );
};

export default Rating;