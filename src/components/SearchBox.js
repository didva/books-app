import React, {useState, useEffect, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Thumbnail from './Thumbnail';
import {useBooksApiService} from "../contexts/BooksApiServiceContext";

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

    const onMouseDown = useCallback((e) => {
        navigate(e.target.getAttribute("href"));
    }, [navigate]);

    return (
        <div className="search-container">
            <form onSubmit={onSubmit}>
                <input className="search" type="text" onChange={onChange} onBlur={onFocusOut} value={search} placeholder="Search..."/>
            </form>
            {results?.length > 0 &&
                <div className="search-results">
                    {results.map(result =>
                        <div key={result.id} className="search-result">
                            <Link onMouseDown={onMouseDown} className="search-result-img" to={"/volume?id=" + result.id}>
                                <Thumbnail volumeInfo={result.volumeInfo}/>
                            </Link>
                            <div className="search-result-title"><Link onMouseDown={onMouseDown} to={"/volume?id=" + result.id}>{result.volumeInfo.title}</Link></div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default SearchBox;