import React from 'react';
import {NavLink} from 'react-router-dom';
import './TopNavBar.css';

function TopNavBar() {
    return (
        <nav className="top-nav-bar">
            <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
            <NavLink to="/simplesearch" activeClassName="active-link">Eenvoudig zoeken</NavLink>
            <NavLink to="/advancedsearch" activeClassName="active-link">Uitgebreid zoeken</NavLink>
            <NavLink to="/mostpopular" activeClassName="active-link">Populaire recepten</NavLink>
        </nav>
    )
}

export default TopNavBar;