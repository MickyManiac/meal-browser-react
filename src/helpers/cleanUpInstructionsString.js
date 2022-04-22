// Spoonacular's recipe instructions field often contains html tags meant to render a list of instructions.
// However, using this directly in React, leads to unintended visibility of html tags in rendered text.
// This helper function transforms the recipe instructions, by
//   removing all html tags,
//   placing unicode bullets at the beginning of every intended list item, and
//   placing a '|' character at every position that is intended to be a line break.
// The resulting String can be broken down into multiple lines with js split and map methods.
function cleanUpInstructionsString(str) {
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
    // place end-of-line markers at intended line breaks
    str = str.replaceAll(/ *(<\/br>|<\/br *\/>|\n) */g, "|");
    // remove any remaining html tags
    str = str.replaceAll(/<[^>]*>/g, "");
    // return the result
    return str;
}

export default cleanUpInstructionsString;