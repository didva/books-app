import React from 'react';
import {Link} from 'react-router-dom'
import SearchBox from "../SearchBox";

function Header(props) {
    return (
        <header style={HeaderStyle}>
            <div>
                <h1>Books app</h1>
                <Link style={linkStyle} to="/">Catalogue</Link> | <Link style={linkStyle} to="/search">Search</Link> | <Link style={linkStyle} to="/login">Login</Link>
            </div>
            <SearchBox apiKey={props.apiKey} baseUrl={props.baseUrl}/>
        </header>
    );
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

const HeaderStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

export default Header;