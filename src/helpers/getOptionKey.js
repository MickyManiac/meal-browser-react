// Get the purpose key for a selector option.
function getOptionKey(optionValue) {
    // console.log(`calling getOptionKey(${optionValue})`);
    switch (optionValue) {
        case "No preference":
            return "selectOptionNoPref";
            break;
        case "African":
            return "cuisineOptionAfrican";
            break;
        case "American":
            return "cuisineOptionAmerican";
            break;
        case "British":
            return "cuisineOptionBritish";
            break;
        case "Cajun":
            return "cuisineOptionCajun";
            break;
        case "Caribbean":
            return "cuisineOptionCaribbean";
            break;
        case "Chinese":
            return "cuisineOptionChinese";
            break;
        case "Eastern European":
            return "cuisineOptionEasternEuropean";
            break;
        case "European":
            return "cuisineOptionEuropean";
            break;
        case "French":
            return "cuisineOptionFrench";
            break;
        case "German":
            return "cuisineOptionGerman";
            break;
        case "Greek":
            return "cuisineOptionGreek";
            break;
        case "Indian":
            return "cuisineOptionIndian";
            break;
        case "Irish":
            return "cuisineOptionIrish";
            break;
        case "Italian":
            return "cuisineOptionItalian";
            break;
        case "Japanese":
            return "cuisineOptionJapanese";
            break;
        case "Jewish":
            return "cuisineOptionJewish";
            break;
        case "Korean":
            return "cuisineOptionKorean";
            break;
        case "Latin American":
            return "cuisineOptionLatinAmerican";
            break;
        case "Mexican":
            return "cuisineOptionMexican";
            break;
        case "Mediterranean":
            return "cuisineOptionMediterranean";
            break;
        case "Middle Eastern":
            return "cuisineOptionMiddleEastern";
            break;
        case "Nordic":
            return "cuisineOptionNordic";
            break;
        case "Southern":
            return "cuisineOptionSouthern";
            break;
        case "Spanish":
            return "cuisineOptionSpanish";
            break;
        case "Thai":
            return "cuisineOptionThai";
            break;
        case "Vietnamese":
            return "cuisineOptionVietnamese";
            break;
        case "Gluten free":
            return "dietOptionGlutenFree";
            break;
        case "Ketogenic":
            return "dietOptionKetogenic";
            break;
        case "Vegan":
            return "dietOptionVegan";
            break;
        case "Vegetarian":
            return "dietOptionVegetarian";
            break;
        default:
            return "";
    }
}

export default getOptionKey;