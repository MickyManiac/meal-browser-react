import React, {useContext} from 'react';
import './PageTitle.css';
import { LanguageContext } from "../context/LanguageContext";
import getText from "../helpers/getText";

function PageTitle({ page }) {
    const { activeLanguage } = useContext(LanguageContext);
    return (
        <header className="page-title">
            { page === "home" &&
                <h1>{ getText(activeLanguage, "pageHome") }</h1>
            }
            { page === "simplesearch" &&
                <h1>{ getText(activeLanguage, "pageSimpleSearch") }</h1>
            }
            { page === "advancedsearch" &&
                <h1>{ getText(activeLanguage, "pageAdvancedSearch") }</h1>
            }
            { page === "mostpopular" &&
                <h1>{ getText(activeLanguage, "pageMostPopular") }</h1>
            }
            { page === "signup" &&
                <h1>{ getText(activeLanguage, "wordSubscribe") }</h1>
            }
            { page === "signin" &&
                <h1>{ getText(activeLanguage, "wordLogin") }</h1>
            }
            { page === "profile" &&
                <h1>{ getText(activeLanguage, "wordProfile") }</h1>
            }
        </header>
    )
}

export default PageTitle;