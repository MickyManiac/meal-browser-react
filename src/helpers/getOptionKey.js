// Get the purpose key for a selector option.
// This goes together with helper function getText, which provides a language-specific text fragment per key.
function getOptionKey(optionValue) {
    // console.log(`calling getOptionKey(${optionValue})`);
    switch (optionValue) {
        case "No preference":
            return "selectOptionNoPref";
        case "African":
            return "cuisineOptionAfrican";
        case "American":
            return "cuisineOptionAmerican";
        case "British":
            return "cuisineOptionBritish";
        case "Cajun":
            return "cuisineOptionCajun";
        case "Caribbean":
            return "cuisineOptionCaribbean";
        case "Chinese":
            return "cuisineOptionChinese";
        case "Eastern European":
            return "cuisineOptionEasternEuropean";
        case "European":
            return "cuisineOptionEuropean";
        case "French":
            return "cuisineOptionFrench";
        case "German":
            return "cuisineOptionGerman";
        case "Greek":
            return "cuisineOptionGreek";
        case "Indian":
            return "cuisineOptionIndian";
        case "Irish":
            return "cuisineOptionIrish";
        case "Italian":
            return "cuisineOptionItalian";
        case "Japanese":
            return "cuisineOptionJapanese";
        case "Jewish":
            return "cuisineOptionJewish";
        case "Korean":
            return "cuisineOptionKorean";
        case "Latin American":
            return "cuisineOptionLatinAmerican";
        case "Mexican":
            return "cuisineOptionMexican";
        case "Mediterranean":
            return "cuisineOptionMediterranean";
        case "Middle Eastern":
            return "cuisineOptionMiddleEastern";
        case "Nordic":
            return "cuisineOptionNordic";
        case "Southern":
            return "cuisineOptionSouthern";
        case "Spanish":
            return "cuisineOptionSpanish";
        case "Thai":
            return "cuisineOptionThai";
        case "Vietnamese":
            return "cuisineOptionVietnamese";
        case "Gluten free":
            return "dietOptionGlutenFree";
        case "Ketogenic":
            return "dietOptionKetogenic";
        case "Vegan":
            return "dietOptionVegan";
        case "Vegetarian":
            return "dietOptionVegetarian";
        default:
            return "";
    }
}

export default getOptionKey;