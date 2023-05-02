import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Thumbnail from './Thumbnail';

function SearchBox(props) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const url = props.baseUrl + '/volumes?key=' + props.apiKey;
    const navigate = useNavigate();

    useEffect(() => {
        if (search.length >= 3) {
            const timeout = setTimeout(() => {
                fetch(url + '&q=' + search + "&maxResults=3", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(response => response.json())
                    .then(results => setResults(() => results.items));
            }, 1000);
            return () => { clearTimeout(timeout) };
        } else {
            setResults(() => []);
        }
    }, [url, search]);

    const onSubmit = function (e) {
        e.preventDefault();
    };

    const onChange = function (e) {
        setSearch(() => e.target.value);
    };

    const onFocusOut = function () {
        setResults(() => []);
        setSearch(() => "");
    };

    const onMouseDown = function (e) {
        navigate(e.target.getAttribute("href"));
    }

    return (
        <div className="search-container">
            <form onSubmit={onSubmit}>
                <input className="search" type="text" onChange={onChange} onBlur={onFocusOut} value={search} placeholder="Search..."/>
            </form>
            {results && results.length > 0 &&
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