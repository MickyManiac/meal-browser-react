import React, { useContext, useState } from 'react';
import { LanguageContext } from "../context/LanguageContext";
import './LanguageBar.css';

function LanguageBar() {
    const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);
    console.log(activeLanguage);
    return (
        <div className="language-bar">
            { activeLanguage==='en' &&
                <>
                    <button className="active-language">en</button>
                    <button className="inactive-language" onClick={() => setActiveLanguage('nl')}>nl</button>
                </>
            }
            { activeLanguage==='nl' &&
                <>
                    <button className="inactive-language" onClick={() => setActiveLanguage('en')}>en</button>
                    <button className="active-language">nl</button>
                </>
            }
        </div>
    );
}

export default LanguageBar;