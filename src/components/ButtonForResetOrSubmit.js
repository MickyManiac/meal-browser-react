import React from 'react';

function ButtonForResetOrSubmit({buttonType, buttonClassName, buttonDisabled, buttonText, fnOnClick}) {
    return(
        <button
            type={buttonType}
            className={buttonClassName}
            disabled={buttonDisabled}
            onClick={(e) => fnOnClick(e)}
        >
            {buttonText}
        </button>
    );
}

export default ButtonForResetOrSubmit;