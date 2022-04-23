import React, {useContext} from 'react';
import {LanguageContext} from "../context/LanguageContext";
import getText from "../helpers/getText";

function CuisineSelector({labelText, selectorValue, fnOnChange}) {
    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Render component content
    return(
        <label htmlFor="cuisine">
            {labelText}
            <select
                name="cuisine"
                id="cuisine-selection"
                value={selectorValue}
                onChange={(e) => {fnOnChange(e.target.value)}}
            >
                <option value="No preference">{ getText(activeLanguage,"selectOptionNoPref") }</option>
                <option value="African">{ getText(activeLanguage,"cuisineOptionAfrican") }</option>
                <option value="American">{ getText(activeLanguage,"cuisineOptionAmerican") }</option>
                <option value="British">{ getText(activeLanguage,"cuisineOptionBritish") }</option>
                <option value="Cajun">{ getText(activeLanguage,"cuisineOptionCajun") }</option>
                <option value="Caribbean">{ getText(activeLanguage,"cuisineOptionCaribbean") }</option>
                <option value="Chinese">{ getText(activeLanguage,"cuisineOptionChinese") }</option>
                <option value="Eastern European">{ getText(activeLanguage,"cuisineOptionEasternEuropean") }</option>
                <option value="European">{ getText(activeLanguage,"cuisineOptionEuropean") }</option>
                <option value="French">{ getText(activeLanguage,"cuisineOptionFrench") }</option>
                <option value="German">{ getText(activeLanguage,"cuisineOptionGerman") }</option>
                <option value="Greek">{ getText(activeLanguage,"cuisineOptionGreek") }</option>
                <option value="Indian">{ getText(activeLanguage,"cuisineOptionIndian") }</option>
                <option value="Irish">{ getText(activeLanguage,"cuisineOptionIrish") }</option>
                <option value="Italian">{ getText(activeLanguage,"cuisineOptionItalian") }</option>
                <option value="Japanese">{ getText(activeLanguage,"cuisineOptionJapanese") }</option>
                <option value="Jewish">{ getText(activeLanguage,"cuisineOptionJewish") }</option>
                <option value="Korean">{ getText(activeLanguage,"cuisineOptionKorean") }</option>
                <option value="Latin American">{ getText(activeLanguage,"cuisineOptionLatinAmerican") }</option>
                <option value="Mediterranean">{ getText(activeLanguage,"cuisineOptionMediterranean") }</option>
                <option value="Mexican">{ getText(activeLanguage,"cuisineOptionMexican") }</option>
                <option value="Middle Eastern">{ getText(activeLanguage,"cuisineOptionMiddleEastern") }</option>
                <option value="Nordic">{ getText(activeLanguage,"cuisineOptionNordic") }</option>
                <option value="Southern">{ getText(activeLanguage,"cuisineOptionSouthern") }</option>
                <option value="Spanish">{ getText(activeLanguage,"cuisineOptionSpanish") }</option>
                <option value="Thai">{ getText(activeLanguage,"cuisineOptionThai") }</option>
                <option value="Vietnamese">{ getText(activeLanguage,"cuisineOptionVietnamese") }</option>
            </select>
        </label>
    );
}

export default CuisineSelector;