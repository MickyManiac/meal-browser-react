import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LanguageBar from "./components/LanguageBar";
import TopNavBar from "./components/TopNavBar";
import HomePage from "./pages/Home";
import SimpleSearchPage from "./pages/SimpleSearch";
import AdvancedSearchPage from "./pages/AdvancedSearch";
import MostPopularPage from "./pages/MostPopular";

function App() {
    return (
        <div>
            <LanguageBar />
            <TopNavBar />
            <Switch>
                <Route path="/" exact>
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
