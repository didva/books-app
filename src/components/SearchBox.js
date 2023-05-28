import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import Form from "react-bootstrap/Form";
import {Card, Row} from "react-bootstrap";

const SearchBox = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const booksApiService = useBooksApiService();

    useEffect(() => {
        if (search.length >= 3) {
            const timeout = setTimeout(() => {
                booksApiService.getVolumes('/volumes', search, 3).then(results => setResults(results.items));
            }, 1000);
            return () => { clearTimeout(timeout) };
        } else {
            setResults([]);
        }
    }, [search, booksApiService]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
    }, []);

    const onChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const onFocusOut = useCallback(() => {
        setResults([]);
        setSearch("");
    }, []);

    const onMouseDown = useCallback((id) => {
        navigate("/volume?id=" + id);
    }, [navigate]);

    return (
        <div className="search-container">
            <Form onSubmit={onSubmit}>
                <Form.Control type="text" placeholder="Search..." value={search} onChange={onChange} onBlur={onFocusOut}/>
            </Form>
            {results?.length > 0 &&
                <div className="search-results">
                    {results.map(result =>
                        <Row className="m-md-2" key={result.id}>
                            <Card style={{ width: '15rem' }}>
                                <Link onMouseDown={() => onMouseDown(result.id)} to={"/volume?id=" + result.id}>
                                    <Card.Img variant="top" src={result.volumeInfo?.imageLinks?.thumbnail} />
                                </Link>
                                <Card.Body>
                                    <Link onMouseDown={() => onMouseDown(result.id)} to={"/volume?id=" + result.id}>
                                        <Card.Title>{result.volumeInfo.title}</Card.Title>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Row>
                    )}
                </div>
            }
        </div>
    );
}

export default SearchBox;