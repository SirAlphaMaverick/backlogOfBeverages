import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <div className="container">
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

                <Link to="/" className="navbar-brand">BeverageLog</Link>

                <div className="collpase navbar-collapse">

                    <ul className="navbar-nav mr-auto">

                        <li className="navbar-item">
                            <Link to="/" className="nav-link">BeverageLog</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">Create Beverage Log</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/drug" className="nav-link">Search Drugs by ID</Link>
                        </li>

                    </ul>
                    <br></br>

                </div>

            </nav>
            </div>
        );
    }
}