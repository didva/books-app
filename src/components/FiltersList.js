import React, {useCallback} from "react";
import Filter from "./Filter";
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const FiltersList = ({filters, setFilters, onSubmit}) => {

    const onChange = useCallback((filterId, value) => {
        setFilters((prev) => {
           return {
               ...prev,
               [filterId]: {
                   value: value,
                   name: prev[filterId].name
               }
           };
        });
    }, [setFilters]);

    return (
        <Form onSubmit={onSubmit}>
            <Row sm={filters ? Object.keys(filters).length + 1 : 1}>
                {filters && Object.keys(filters).map(filter =>
                    <Col md key={filter}>
                        <Filter key={filter} filterId={filter} name={filters[filter].name} value={filters[filter].value} onChange={onChange}/>
                    </Col>
                )}
                <Col md>
                    <Button size="lg" variant="primary" type="submit">Search</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FiltersList;