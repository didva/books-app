import React from "react";
import loader from "../static/loader.gif";

const Loader = ({loading}) => {
    return (
        <div className="loader-container">
            {loading &&
                <div className="loader">
                    <img alt="Loading..." src={loader}/>
                </div>
            }
        </div>
    );
};

export default Loader;