import React from 'react';

function InputField({fieldId, labelText, fieldClassName, fieldType, fieldName, fieldValue, fieldPlacholder, fnOnChange}) {
    return(
        <label htmlFor={fieldId}>
            {labelText}
            <input
                className={fieldClassName}
                type={fieldType}
                name={fieldName}
                id={fieldId}
                value={fieldValue}
                placeholder={fieldPlacholder}
                onChange={(e) => fnOnChange(e.target.value)}
            />
        </label>
    );
}

export default InputField;