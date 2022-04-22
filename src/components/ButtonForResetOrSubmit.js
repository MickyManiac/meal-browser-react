import React from 'react';

function ButtonForResetOrSubmit({buttonType, buttonDisabled, buttonText, fnOnClick}) {
    return(
        <button
            type={buttonType}
            className="submit-reset"
            disabled={buttonDisabled}
            onClick={(e) => fnOnClick(e)}
        >
            {buttonText}
        </button>
    );
}

export default ButtonForResetOrSubmit;