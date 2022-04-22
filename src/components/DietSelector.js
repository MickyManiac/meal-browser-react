import React from 'react';

function DietSelector({selectorValue, fnOnChange}) {
    return(
        <label htmlFor="diet">
            Dieet:
            <select
                name="diet"
                id="diet-selection"
                value={selectorValue}
                onChange={(e) => {fnOnChange(e.target.value)}}
            >
                <option value="None">None</option>
                <option value="Gluten free">Gluten free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
            </select>
        </label>
    );
}

export default DietSelector;