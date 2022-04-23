import React, {useContext} from 'react';
import './PageTitle.css';
import { LanguageContext } from "../context/LanguageContext";

function PageTitle({ text, page }) {
    const { activeLanguage } = useContext(LanguageContext);
    return (
        <header className="page-title">
            <h1>{text}</h1>
            { page === "home" &&
                <>
                    { activeLanguage === "nl" &&
                        <h1>Vind altijd een passend recept met Meal Browser</h1>
                    }
                    { activeLanguage === "en" &&
                        <h1>Finding recipes for all occasions with Meal Browser</h1>
                    }
                </>
            }
            { page === "simplesearch" &&
                <>
                    { activeLanguage === "nl" &&
                        <h1>Eenvoudig zoeken naar recepten</h1>
                    }
                    { activeLanguage === "en" &&
                        <h1>Meal Browser simple search</h1>
                    }
                </>
            }
            { page === "advancedsearch" &&
                <>
                    { activeLanguage === "nl" &&
                        <h1>Uitgebreid zoeken naar recepten</h1>
                    }
                    { activeLanguage === "en" &&
                        <h1>Meal Browser advanced search</h1>
                    }
                </>
            }
            { page === "mostpopular" &&
                <>
                    { activeLanguage === "nl" &&
                        <h1>Populaire recepten</h1>
                    }
                    { activeLanguage === "en" &&
                        <h1>Popular recipes</h1>
                    }
                </>
            }
        </header>
    )
}

export default PageTitle;