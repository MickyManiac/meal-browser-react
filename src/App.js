import React, { useContext } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { AuthenticationContext } from './context/AuthenticationContext';
import './App.css';
import LanguageBar from "./components/LanguageBar";
import TopNavBar from "./components/TopNavBar";
import ProfilePage from "./pages/UserProfile";
import SignInPage from "./pages/UserSignIn";
import SignUpPage from "./pages/UserSignUp";
import HomePage from "./pages/Home";
import SimpleSearchPage from "./pages/SimpleSearch";
import AdvancedSearchPage from "./pages/AdvancedSearch";
import MostPopularPage from "./pages/MostPopular";

function App() {
    // Authentication context: keep track of user's authentication status.
    const { isAuth } = useContext(AuthenticationContext);

    // useHistory hook
    const history = useHistory();

    // useLocation hook
    const location = useLocation();

    // Render application content
    return (
        <div>
            <LanguageBar />
            <TopNavBar />
            { /* Navigation based on React Router (v5) */ }
            <Switch>
                <Route path="/profile">
                    { isAuth ? <ProfilePage /> : <Redirect to="/" /> }
                </Route>
                <Route exact path="/signin">
                    <SignInPage />
                </Route>
                <Route exact path="/signup">
                    <SignUpPage />
                </Route>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/simplesearch">
                    <SimpleSearchPage />
                </Route>
                <Route path="/advancedsearch">
                    <AdvancedSearchPage />
                </Route>
                <Route path="/mostpopular">
                    <MostPopularPage />
                </Route>
            </Switch>
            { /* Redirect to homepage if a non-existing path occurs in the address bar. */ }
            { ( location.pathname !== ("/") &&  location.pathname !== ("/simplesearch") &&
                location.pathname !== ("/advancedsearch") &&  location.pathname !== ("/mostpopular") &&
                location.pathname !== ("/profile") &&  location.pathname !== ("/signup") &&
                location.pathname !== ("/signin")
              ) && history.push('/')
            }
        </div>
    );
}

export default App;
