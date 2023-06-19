import React, {useCallback, useEffect, useState} from "react";
import {useBooksApiService} from "../contexts/BooksApiServiceContext";
import Form from "react-bootstrap/Form";
import {Row} from "react-bootstrap";
import Thumbnail from "./Thumbnail";

const SearchBox = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const booksApiService = useBooksApiService();

    useEffect(() => {
        if (search.length >= 3) {
            const timeout = setTimeout(() => {
                booksApiService.getVolumes("/volumes", search, 3).then(results => setResults(results.items));
            }, 1000);
            return () => { clearTimeout(timeout); };
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

    return (
        <div className="search-container">
            <Form onSubmit={onSubmit}>
                <Form.Control type="text" placeholder="Search..." value={search} onChange={onChange} onBlur={onFocusOut}/>
            </Form>
            {results?.length > 0 &&
                <div className="search-results">
                    {results.map(volume =>
                        <Row className="m-md-2" key={volume.id}>
                            <Thumbnail volume={volume}/>
                        </Row>
                    )}
                </div>
            }
        </div>
    );
};

export default SearchBox;