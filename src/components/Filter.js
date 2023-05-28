import React from 'react';
import Form from 'react-bootstrap/Form';
import {FloatingLabel} from "react-bootstrap";

const Filter = ({filterId, name, value, onChange}) => {
    return (
        <FloatingLabel controlId={filterId} label={name}>
            <Form.Control type="text" placeholder={name} value={value} onChange={(e) => onChange(filterId, e.target.value)}/>
        </FloatingLabel>
    );
}

export default Filter;