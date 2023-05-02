import React from 'react';

function Filter(props) {
    const onChange = (e) => {
        props.onChange(props.id, e.target.value);
    }

    return (
        <div className="filter-container">
            <div className="filter-name">{props.name}</div>
            <div className="filter">
                <input type="text" value={props.value} onChange={onChange} id={props.id}/>
            </div>
        </div>
    );
}

export default Filter;