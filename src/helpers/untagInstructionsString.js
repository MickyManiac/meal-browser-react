// Spoonacular's recipe instructions field often contains html tags meant to render a list of instructions.
// However, using this directly in React, leads to unintended visibility of html tags in rendered text.
// This helper function transforms the recipe instructions, by
//   removing all html tags,
//   placing unicode bullets at the beginning of every intended list item, and
//   placing a '|' character at every position that is intended to be a line break.
// The resulting String can be broken down into multiple lines with js split and map methods.
function untagInstructionsString(str) {
    // replace html format for list items
    if (str.match(/ *<\/li> *<li> */g)) {
        // multiple list items
        str = str.replaceAll(/ *<ol> *<li> */g, "• ");
        str = str.replaceAll(/ *<ul> *<li> */g, "• ");
        str = str.replaceAll(/ *<\/li> *<li> */g, "|• ");
    } else {
        // don't add bullets in case of 1 list item
        str = str.replaceAll(/ *<ol> *<li> */g, "");
        str = str.replaceAll(/ *<ul> *<li> */g, "");
    }
    str = str.replaceAll(/ *<\/li> */g, "");
    str = str.replaceAll(/ *<\/ol> */g, "");
    str = str.replaceAll(/ *<\/ul> */g, "");
    // remove any remaining html tags
    str = str.replaceAll(/<[^>]*>/g, "");
    // Fix missing whitespace between lines as well.
    for (let i=0; i<str.length-1; i++) {
        if (str.charAt(i) === '.') {
            if  (str.charAt(i+1) !== ' ') {
                str = str.substring(0, i) + ". " + str.substring(i+1, str.length);
            }
        }
    }
    // return the result
    return str;
}

export default untagInstructionsString;