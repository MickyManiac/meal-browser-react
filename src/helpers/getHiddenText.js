// Return a String of the indicated length which contains only "hidden character" symbols.
function getHiddenText(length) {
    let result = '';
    for (let i=0; i<length; i++) {
        result += '•';
    }
    return result;
}

export default getHiddenText;