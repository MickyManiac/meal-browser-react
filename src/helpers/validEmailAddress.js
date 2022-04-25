// Check if String text represents a valid e-mail address.
// Return true (if it does) or false (if it doesn't).
// A valid e-mail address consists of 3 parts separated by '@' and '.' as follows:
//     <part1>@<part2>.<part3>
// Part1 and part2 must start and end with a word character and may contain '.' or '-' characters.
// Part3 must end with 2 or 3 word characters and may contain '.' characters as well, provided that each of those
// is surrounded by word characters.
function validEmailAddress(text) {
    // regular expression representing a valid e-mail address pattern
    // (not completely ietf compliant)
    const validPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if ( validPattern.test(text) )
    {
        return true;
    }
    return false;
}

export default validEmailAddress;