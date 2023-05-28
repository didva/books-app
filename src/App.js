import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, { useState } from "react";
import Header from './components/layout/Header'
import Footer from "./components/layout/Footer";
import Catalogue from "./components/pages/Catalogue";
import Volume from "./components/pages/Volume";
import Search from "./components/pages/Search";
import UserContext from "./contexts/UserContext";
import Profile from "./components/pages/Profile";
import UserShelve from "./components/pages/UserShelve";
import BooksApiService from "./services/BooksApiService";
import {Container} from "react-bootstrap";

const App = () => {
    const url = "https://www.googleapis.com/books/v1";
    const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
            <BooksApiService baseUrl={url} apiKey={apiKey}>
                <BrowserRouter>
                    <Container fluid>
                        <Header/>
                        <Routes>
                            <Route exact path="/" element={<Catalogue/>}/>
                            <Route exact path="/volume" element={<Volume/>}/>
                            <Route exact path="/search" element={<Search/>}/>
                            <Route exact path="/profile" element={<Profile/>}/>
                            <Route exact path="/user-shelve/:shelveId" element={<UserShelve/>}/>
                        </Routes>
                        <Footer />
                    </Container>
                </BrowserRouter>
            </BooksApiService>
        </UserContext.Provider>
    );
}

export default App;
