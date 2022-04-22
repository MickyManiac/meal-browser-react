// Check if String text represents a valid maximum preparation time.
// Return true (if it does) or false (if it doesn't).
// Any positive number is allowed.
// I.e. allowed  characters have a UTF-16 code in the range: (48 <= code <= 57).
// Also, empty String is allowed. However, null is not allowed.
function validMaxPreparationTime(text) {
    // check if text is null
    if (text===null) {
        return false;
    }
    // check the characters
    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (code < 48 || code > 57) {
            return false;
        }
    }
    return true;
}

export default validMaxPreparationTime;