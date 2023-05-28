import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import SearchBox from "../SearchBox";
import GAuth from "../GAuth";
import ProfileThumbnail from "../ProfileThumbnail";
import UserContext from "../../contexts/UserContext";

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <header style={HeaderStyle}>
            <div>
                <h1>Books app</h1>
                <div className="header-profile-thumbnail">
                    <ProfileThumbnail showInfo={false} size="7rem"/>
                </div>
                <div className="navigation">
                    <div className="navigation-link"><Link style={linkStyle} to="/">Catalogue</Link> |</div>
                    <div className="navigation-link"><Link style={linkStyle} to="/search">Search</Link> |</div>
                    {user &&
                        <div className="navigation-link"><Link style={linkStyle} to="/profile">Profile</Link> |</div>
                    }
                    <div className="gauth-container"><GAuth/></div>
                </div>
            </div>
            <SearchBox/>
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