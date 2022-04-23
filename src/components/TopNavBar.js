import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './TopNavBar.css';
import { LanguageContext } from "../context/LanguageContext";

function TopNavBar() {
    const { activeLanguage } = useContext(LanguageContext);
    return (
        <nav className="top-nav-bar">
        { activeLanguage === "nl" &&
            <>
                <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                <NavLink to="/simplesearch" activeClassName="active-link">Eenvoudig zoeken</NavLink>
                <NavLink to="/advancedsearch" activeClassName="active-link">Uitgebreid zoeken</NavLink>
                <NavLink to="/mostpopular" activeClassName="active-link">Populaire recepten</NavLink>
            </>
        }
            { activeLanguage === "en" &&
                <>
                    <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    <NavLink to="/simplesearch" activeClassName="active-link">Simple search</NavLink>
                    <NavLink to="/advancedsearch" activeClassName="active-link">Advanced search</NavLink>
                    <NavLink to="/mostpopular" activeClassName="active-link">Popular Recipes</NavLink>
                </>
            }
        </nav>
    )
}

export default TopNavBar;