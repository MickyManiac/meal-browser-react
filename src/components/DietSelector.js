import React, {useContext} from 'react';
import {LanguageContext} from "../context/LanguageContext";
import getText from "../helpers/getText";

function DietSelector({labelText, selectorValue, fnOnChange}) {
    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Render component content
    return(
        <label htmlFor="diet">
            {labelText}
            <select
                name="diet"
                id="diet-selection"
                value={selectorValue}
                onChange={(e) => {fnOnChange(e.target.value)}}
            >
                <option value="No preference">{ getText(activeLanguage,"selectOptionNoPref") }</option>
                <option value="Gluten free">{ getText(activeLanguage,"dietOptionGlutenFree") }</option>
                <option value="Ketogenic">{ getText(activeLanguage,"dietOptionKetogenic") }</option>
                <option value="Vegan">{ getText(activeLanguage,"dietOptionVegan") }</option>
                <option value="Vegetarian">{ getText(activeLanguage,"dietOptionVegetarian") }</option>
            </select>
        </label>
    );
}

export default DietSelector;