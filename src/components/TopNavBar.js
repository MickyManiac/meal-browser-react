import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './TopNavBar.css';
import { LanguageContext } from "../context/LanguageContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import getText from "../helpers/getText";

function TopNavBar() {
    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Authentication context: keep track of user's authentication status.
    const { isAuth, user, logout } = useContext(AuthenticationContext);

    // useHistory hook
    const history = useHistory();

    // Render component content
    return (
        <nav className="top-nav-bar">
            <>
                <NavLink to="/" exact activeClassName="active-link">
                    { getText(activeLanguage, "navHome") }
                </NavLink>
                <NavLink to="/simplesearch" activeClassName="active-link">
                    { getText(activeLanguage, "navSimpleSearch") }
                </NavLink>
                <NavLink to="/advancedsearch" activeClassName="active-link">
                    { getText(activeLanguage, "navAdvancedSearch") }
                </NavLink>
                <NavLink to="/mostpopular" activeClassName="active-link">
                    { getText(activeLanguage, "navMostPopular") }
                </NavLink>
            </>
            { isAuth
                ?
                <div className="auth-user">
                    { getText(activeLanguage, "wordWelcome") }, <div className="user-name" onClick={() => history.push('/profile')}>{user.username}</div>
                    <button className="authentication"
                        type="button"
                        onClick={logout}
                    >
                        { getText(activeLanguage, "wordLogout") }
                    </button>
                </div>
                :
                <div className="auth-user">
                    <button className="authentication"
                        type="button"
                        onClick={() => history.push('/signin')}
                    >
                        { getText(activeLanguage, "wordLogin") }
                    </button>
                    <button className="authentication"
                        type="button"
                        onClick={() => history.push('/signup')}
                    >
                        { getText(activeLanguage, "wordSubscribe") }
                    </button>
                </div>
            }
        </nav>
    )
}

export default TopNavBar;