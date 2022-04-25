import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
    const { isAuth } = useContext(AuthenticationContext);
    return (
        <div>
            <LanguageBar />
            <TopNavBar />
            <Switch>
                <Route path="/profile">
                    {isAuth ? <ProfilePage /> : <Redirect to="/" />}
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
        </div>
    );
}

export default App;
