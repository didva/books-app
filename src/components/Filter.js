import React from 'react';

const Filter = ({id, name, value, onChange}) => {
    return (
        <div className="filter-container">
            <div className="filter-name">{name}</div>
            <div className="filter">
                <input type="text" value={value} onChange={(e) => onChange(id, e.target.value)} id={id}/>
            </div>
        </div>
    );
}

export default Filter;