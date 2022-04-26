import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext({});

function LanguageContextProvider({ children }) {
    // Language related state
    const [language, setLanguage] = useState("en");

    // Set the active language:
    // in context state, so it will be used immediately at any state update, and
    // in local storage, so it persists on refresh.
    function setActiveLanguage(lang) {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    }

    // "Persist on refresh".
    // On mounting, check if the language is already stored in Local Storage.
    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            // If a language is stored, use that language.
            setLanguage(storedLanguage);
        }
    }, []);

    const languageContextData = {
        activeLanguage: language,
        setActiveLanguage: setActiveLanguage,
    }

    return(
        <LanguageContext.Provider value={ languageContextData }>
            { children }
        </LanguageContext.Provider>
    );
}

export default LanguageContextProvider;