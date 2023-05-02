import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {Component} from "react";
import Header from './components/layout/Header'
import Footer from "./components/layout/Footer";
import Catalogue from "./components/pages/Catalogue";
import Volume from "./components/pages/Volume";
import Search from "./components/pages/Search";

class App extends Component {
    static url = process.env.API_URL;
    static apiKey = process.env.API_KEY;
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="container">
                        <Header baseUrl={App.url} apiKey={App.apiKey}/>
                        <Routes>
                            <Route exact path="/" element={<Catalogue baseUrl={App.url} apiKey={App.apiKey}/>}/>
                            <Route exact path="/volume" element={<Volume baseUrl={App.url} apiKey={App.apiKey}/>}/>
                            <Route exact path="/search" element={<Search baseUrl={App.url} apiKey={App.apiKey}/>}/>
                        </Routes>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
