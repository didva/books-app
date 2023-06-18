import React from "react";
import VolumeList from "../VolumeList";

const Catalogue = () => {
    return (
        <div>
            <h1 className="page-header">Volumes</h1>
            <VolumeList queryPath={"/volumes"} />
        </div>
    );
};

export default Catalogue;