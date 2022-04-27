import React, {Component} from 'react';
import {
    Route,
    Routes,
    NavLink,
    HashRouter
} from "react-router-dom";
import './App.css';
import Home from './Home.js';
import Stuff from './Stuff.js';
import Contact from './Contact.js';
import BTCPrice from "./BTCPrice";
class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/stuff">Stuff</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/btcPrice">BTC Price</NavLink></li>
                    </ul>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/stuff" element={<Stuff/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/btcPrice" element={<BTCPrice/>}/>
                        </Routes>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;

