import React, {useState, useEffect} from 'react';
import loader from '../static/loader.gif';

function Loader(props) {
    const [loading, setLoading] = useState(props.loading);
    useEffect(() => {
        setLoading(() => props.loading);
    }, [props.loading]);
    return (
        <div className="loader-container">
            {loading &&
                <div className="loader">
                    <img alt="Loading..." src={loader}/>
                </div>
            }
        </div>
    );
}

export default Loader;