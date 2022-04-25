import React, { createContext, useState } from 'react';

export const LanguageContext = createContext({});

function LanguageContextProvider({ children }) {
    const [language, setLanguage] = useState("en");

    const languageContextData = {
        activeLanguage: language,
        setActiveLanguage: setLanguage,
    }

    return(
        <LanguageContext.Provider value={ languageContextData }>
            { children }
        </LanguageContext.Provider>
    );
}

export default LanguageContextProvider;