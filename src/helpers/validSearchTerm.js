// Check if String text represents a valid search term.
// Return true (if it does) or false (if it doesn't).
// See https://en.wikipedia.org/wiki/List_of_Unicode_characters
// The following indicates characters that are allowed.
//   (32 <= code <= 48) => ASCII punctuation and symbols: <space>!"#$%&'()*+,-./
//   ALLOWED: (48 <= code <= 57) => ASCII digits: 0-9
//   (58 <= code <= 64) => Latin punctuation and symbols: :;<=>?@
//   ALLOWED: (65 <= code <= 90) => Latin alphabet uppercase: (A-Z)
//   (91 <= code <= 96) => Latin punctuation and symbols: [\]^_`
//   ALLOWED: (97 <= code <= 122) => Latin alphabet lowercase: (a-z)
//   (123 <= code <= 126) => Latin punctuation and symbols: {|}~
//   ALLOWED: (192 <= code <= 214) => More uppercase letters, like latin capital letter N with tilde
//   ALLOWED: (216 <= code <= 222) => More uppercase letters, like latin capital Letter U with diaeresis
//   ALLOWED: (223 <= code <= 246) => More lowercase letters, like Latin small letter n with tilde
//   ALLOWED: (248 <= code <= 255) => More lowercase letters, like Latin small letter u with diaeresis
// In addition, characters <space>"&()+- are allowed.
// Also, empty String is allowed. However, null is not allowed.
function validSearchTerm(text) {
    // Check if text is null.
    if (text===null) {
        return false;
    }
    // Check the characters.
    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (!( (code >= 48 && code <= 57) || (code >= 65 && code <= 90) ||
               (code >= 97 && code <= 122) || (code >= 192 && code <= 255) ||
               text.charAt(i) === ' ' || text.charAt(i) === '"' || text.charAt(i) === '&' || text.charAt(i) === '(' ||
               text.charAt(i) === ')' || text.charAt(i) === '+' || text.charAt(i) === '-' ) ) {
            return false;
        }
    }
    return true;
}

export default validSearchTerm;