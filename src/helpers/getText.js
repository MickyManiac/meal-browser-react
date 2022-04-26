// Get a piece of static text for a specific purpose indicated by the key parameter,
// in the language indicated by the lang parameter.
function getText(lang, key) {
    // console.log(`calling getText(${lang}, ${purpose})`);
    switch (key) {
        case "navHome":
            if (lang==="en") {
                return "Home";
            }
            if (lang==="nl") {
                return "Home";
            }
            break;
        case "navSimpleSearch":
            if (lang==="en") {
                return "Simple search";
            }
            if (lang==="nl") {
                return "Eenvoudig zoeken";
            }
            break;
        case "navAdvancedSearch":
            if (lang==="en") {
                return "Advanced search";
            }
            if (lang==="nl") {
                return "Uitgebreid zoeken";
            }
            break;
        case "navMostPopular":
            if (lang==="en") {
                return "Popular recipes";
            }
            if (lang==="nl") {
                return "Populaire recepten";
            }
            break;
        case "pageHome":
            if (lang==="en") {
                return "Find recipes for all occasions with Meal Browser";
            }
            if (lang==="nl") {
                return "Vind altijd een passend recept met Meal Browser";
            }
            break;
        case "pageSimpleSearch":
            if (lang==="en") {
                return "Meal Browser simple search";
            }
            if (lang==="nl") {
                return "Eenvoudig zoeken naar recepten";
            }
            break;
        case "pageAdvancedSearch":
            if (lang==="en") {
                return "Meal Browser advanced search";
            }
            if (lang==="nl") {
                return "Uitgebreid zoeken naar recepten";
            }
            break;
        case "pageMostPopular":
            if (lang==="en") {
                return "Popular recipes";
            }
            if (lang==="nl") {
                return "Populaire recepten";
            }
            break;
        case "msgFetchingRecipes":
            if (lang==="en") {
                return "Fetching recipes...";
            }
            if (lang==="nl") {
                return "Recepten ophalen...";
            }
            break;
        case "msgSearchingForRecipes":
            if (lang==="en") {
                return "Searching...";
            }
            if (lang==="nl") {
                return "Zoeken naar recepten...";
            }
            break;
        case "msgFailedToFetchRecipes":
            if (lang==="en") {
                return "Unable to fetch recipes. Please check your network connection or try again later.";
            }
            if (lang==="nl") {
                return "Er is iets misgegaan met het ophalen van de recepten. Controleer de netwerkverbinding of probeer het later nog een keer.";
            }
            break;
        case "msgFailedToSearchForRecipes":
            if (lang==="en") {
                return "Unable to search for recipes. Please check your network connection or try again later.";
            }
            if (lang==="nl") {
                return "Er is iets misgegaan met het zoeken naar recepten. Controleer de netwerkverbinding of probeer het later nog een keer.";
            }
            break;
        case "msgFetchingRecipeDetails":
            if (lang==="en") {
                return "Fetching recipe information...";
            }
            if (lang==="nl") {
                return "Receptinformatie ophalen...";
            }
            break;
        case "msgFailedToFetchRecipeDetails":
            if (lang==="en") {
                return "Unable to fetch recipe information. Please check your network connection or try again later.";
            }
            if (lang==="nl") {
                return "Er is iets misgegaan met het ophalen van de receptinformatie. Controleer de netwerkverbinding of probeer het later nog een keer.";
            }
            break;
        case "msgResultsStart":
            if (lang==="en") {
                return "Results for ";
            }
            if (lang==="nl") {
                return "Resultaten voor ";
            }
            break;
        case "msgNoResultsStart":
            if (lang==="en") {
                return "No results for ";
            }
            if (lang==="nl") {
                return "Geen resultaten voor ";
            }
            break;
        case "msgNoResultsEnd":
            if (lang==="en") {
                return ". Please change your search query and try again.";
            }
            if (lang==="nl") {
                return ". Probeer een andere zoekopdracht.";
            }
            break;
        case "labelSearchField":
            if (lang==="en") {
                return "Your search term:";
            }
            if (lang==="nl") {
                return "Vul een zoekterm in:";
            }
            break;
        case "placeholderSearchField":
            if (lang==="en") {
                return "eg fruit salad";
            }
            if (lang==="nl") {
                return "bijv fruit salad";
            }
            break;
        case "labelMaxPreparationTimeField":
            if (lang==="en") {
                return "Maximum preparation time in minutes:";
            }
            if (lang==="nl") {
                return "Maximale bereidingstijd in minuten:";
            }
            break;
        case "placeholderMaxPreparationTimeField":
            if (lang==="en") {
                return "eg 30";
            }
            if (lang==="nl") {
                return "bijv 30";
            }
            break;
        case "labelCuisineSelector":
            if (lang==="en") {
                return "Cuisine:";
            }
            if (lang==="nl") {
                return "Keuken:";
            }
            break;
        case "labelDietSelector":
            if (lang==="en") {
                return "Diet:";
            }
            if (lang==="nl") {
                return "Dieet:";
            }
            break;
        case "searchButtonText":
            if (lang==="en") {
                return "Search";
            }
            if (lang==="nl") {
                return "Zoeken";
            }
            break;
        case "resetButtonText":
            if (lang==="en") {
                return "Reset";
            }
            if (lang==="nl") {
                return "Reset";
            }
            break;
        case "selectOptionNoPref":
            if (lang==="en") {
                return "No preference";
            }
            if (lang==="nl") {
                return "Geen voorkeur";
            }
            break;
        case "cuisineOptionAfrican":
            if (lang==="en") {
                return "African";
            }
            if (lang==="nl") {
                return "Afrikaans";
            }
            break;
        case "cuisineOptionAmerican":
            if (lang==="en") {
                return "American";
            }
            if (lang==="nl") {
                return "Amerikaans";
            }
            break;
        case "cuisineOptionBritish":
            if (lang==="en") {
                return "British";
            }
            if (lang==="nl") {
                return "Brits";
            }
            break;
        case "cuisineOptionCajun":
            if (lang==="en") {
                return "Cajun";
            }
            if (lang==="nl") {
                return "Cajun";
            }
            break;
        case "cuisineOptionCaribbean":
            if (lang==="en") {
                return "Caribbean";
            }
            if (lang==="nl") {
                return "Caribisch";
            }
            break;
        case "cuisineOptionChinese":
            if (lang==="en") {
                return "Chinese";
            }
            if (lang==="nl") {
                return "Chinees";
            }
            break;
        case "cuisineOptionEasternEuropean":
            if (lang==="en") {
                return "Eastern European";
            }
            if (lang==="nl") {
                return "Oost-Europees";
            }
            break;
        case "cuisineOptionEuropean":
            if (lang==="en") {
                return "European";
            }
            if (lang==="nl") {
                return "Europees";
            }
            break;
        case "cuisineOptionFrench":
            if (lang==="en") {
                return "French";
            }
            if (lang==="nl") {
                return "Frans";
            }
            break;
        case "cuisineOptionGerman":
            if (lang==="en") {
                return "German";
            }
            if (lang==="nl") {
                return "Duits";
            }
            break;
        case "cuisineOptionGreek":
            if (lang==="en") {
                return "Greek";
            }
            if (lang==="nl") {
                return "Grieks";
            }
            break;
        case "cuisineOptionIndian":
            if (lang==="en") {
                return "Indian";
            }
            if (lang==="nl") {
                return "Indisch";
            }
            break;
        case "cuisineOptionIrish":
            if (lang==="en") {
                return "Irish";
            }
            if (lang==="nl") {
                return "Iers";
            }
            break;
        case "cuisineOptionItalian":
            if (lang==="en") {
                return "Italian";
            }
            if (lang==="nl") {
                return "Italiaans";
            }
            break;
        case "cuisineOptionJapanese":
            if (lang==="en") {
                return "Japanese";
            }
            if (lang==="nl") {
                return "Japans";
            }
            break;
        case "cuisineOptionJewish":
            if (lang==="en") {
                return "Jewish";
            }
            if (lang==="nl") {
                return "Joods";
            }
            break;
        case "cuisineOptionKorean":
            if (lang==="en") {
                return "Korean";
            }
            if (lang==="nl") {
                return "Koreaans";
            }
            break;
        case "cuisineOptionLatinAmerican":
            if (lang==="en") {
                return "Latin American";
            }
            if (lang==="nl") {
                return "Latijns-Amerikaans";
            }
            break;
        case "cuisineOptionMexican":
            if (lang==="en") {
                return "Mexican";
            }
            if (lang==="nl") {
                return "Mexicaans";
            }
            break;
        case "cuisineOptionMediterranean":
            if (lang==="en") {
                return "Mediterranean";
            }
            if (lang==="nl") {
                return "Mediterraans";
            }
            break;
        case "cuisineOptionMiddleEastern":
            if (lang==="en") {
                return "Middle Eastern";
            }
            if (lang==="nl") {
                return "Midden-Oosters";
            }
            break;
        case "cuisineOptionNordic":
            if (lang==="en") {
                return "Nordic";
            }
            if (lang==="nl") {
                return "Scandinavisch";
            }
            break;
        case "cuisineOptionSouthern":
            if (lang==="en") {
                return "Southern";
            }
            if (lang==="nl") {
                return "Southern (Zuidelijke VS)";
            }
            break;
        case "cuisineOptionSpanish":
            if (lang==="en") {
                return "Spanish";
            }
            if (lang==="nl") {
                return "Spaans";
            }
            break;
        case "cuisineOptionThai":
            if (lang==="en") {
                return "Thai";
            }
            if (lang==="nl") {
                return "Thais";
            }
            break;
        case "cuisineOptionVietnamese":
            if (lang==="en") {
                return "Vietnamese";
            }
            if (lang==="nl") {
                return "Vietnamees";
            }
            break;
        case "dietOptionGlutenFree":
            if (lang==="en") {
                return "Gluten free";
            }
            if (lang==="nl") {
                return "Glutenvrij";
            }
            break;
        case "dietOptionKetogenic":
            if (lang==="en") {
                return "Ketogenic";
            }
            if (lang==="nl") {
                return "Ketogeen";
            }
            break;
        case "dietOptionVegan":
            if (lang==="en") {
                return "Vegan";
            }
            if (lang==="nl") {
                return "Veganistisch";
            }
            break;
        case "dietOptionVegetarian":
            if (lang==="en") {
                return "Vegetarian";
            }
            if (lang==="nl") {
                return "Vegetarisch";
            }
            break;
        case "shortMsgNoRecipeName":
            if (lang==="en") {
                return "Recipe name not found";
            }
            if (lang==="nl") {
                return "Receptnaam niet gevonden";
            }
            break;
        case "shortMsgNoPreparationTime":
            if (lang==="en") {
                return "Preparation time not found";
            }
            if (lang==="nl") {
                return "Bereidingstijd niet gevonden";
            }
            break;
        case "shortMsgNoLikes":
            if (lang==="en") {
                return "Number of likes not found";
            }
            if (lang==="nl") {
                return "Aantal likes niet gevonden";
            }
            break;
        case "msgNoPreparationTime":
            if (lang==="en") {
                return "Could not find preparation time for this recipe.";
            }
            if (lang==="nl") {
                return "De bereidingstijd kon voor dit recept helaas niet worden opgehaald.";
            }
            break;
        case "msgNoIngredients":
            if (lang==="en") {
                return "Could not find ingredients for this recipe.";
            }
            if (lang==="nl") {
                return "De ingrediënten konden voor dit recept helaas niet worden opgehaald.";
            }
            break;
        case "msgNoInstructions":
            if (lang==="en") {
                return "Could not find instructions for this recipe.";
            }
            if (lang==="nl") {
                return "De bereidingswijze kon voor dit recept helaas niet worden opgehaald.";
            }
            break;
        case "msgNoSourceUrl":
            if (lang==="en") {
                return "Could not find source URL for this recipe.";
            }
            if (lang==="nl") {
                return "Een externe link kon voor dit recept helaas niet worden opgehaald.";
            }
            break;
        case "wordPreparationTime":
            if (lang==="en") {
                return "Preparation time";
            }
            if (lang==="nl") {
                return "Bereidingstijd";
            }
            break;
        case "wordMinutes":
            if (lang==="en") {
                return "minutes";
            }
            if (lang==="nl") {
                return "minuten";
            }
            break;
        case "wordIngredients":
            if (lang==="en") {
                return "Ingredients";
            }
            if (lang==="nl") {
                return "Ingrediënten";
            }
            break;
        case "wordFor":
            if (lang==="en") {
                return "for";
            }
            if (lang==="nl") {
                return "voor";
            }
            break;
        case "wordServings":
            if (lang==="en") {
                return "servings";
            }
            if (lang==="nl") {
                return "porties";
            }
            break;
        case "wordInstructions":
            if (lang==="en") {
                return "Instructions";
            }
            if (lang==="nl") {
                return "Bereidingswijze";
            }
            break;
        case "wordSourceUrl":
            if (lang==="en") {
                return "source URL";
            }
            if (lang==="nl") {
                return "bron";
            }
            break;
        case "wordWelcome":
            if (lang==="en") {
                return "Welcome";
            }
            if (lang==="nl") {
                return "Welkom";
            }
            break;
        case "wordSubscribe":
            if (lang==="en") {
                return "Subscribe";
            }
            if (lang==="nl") {
                return "Registreren";
            }
            break;
        case "wordLogin":
            if (lang==="en") {
                return "Login";
            }
            if (lang==="nl") {
                return "Inloggen";
            }
            break;
        case "wordLogout":
            if (lang==="en") {
                return "Logout";
            }
            if (lang==="nl") {
                return "Uitloggen";
            }
            break;
        case "wordProfile":
            if (lang==="en") {
                return "User profile";
            }
            if (lang==="nl") {
                return "Gebruikersprofiel";
            }
            break;
        case "wordEmailAddress":
            if (lang==="en") {
                return "Email address";
            }
            if (lang==="nl") {
                return "E-mailadres";
            }
            break;
        case "wordUserName":
            if (lang==="en") {
                return "User name";
            }
            if (lang==="nl") {
                return "Gebruikersnaam";
            }
            break;
        case "wordPassword":
            if (lang==="en") {
                return "Password";
            }
            if (lang==="nl") {
                return "Wachtwoord";
            }
            break;
        case "wordUpdate":
            if (lang==="en") {
                return "Update";
            }
            if (lang==="nl") {
                return "Wijzig";
            }
            break;
        case "wordUndo":
            if (lang==="en") {
                return "Undo";
            }
            if (lang==="nl") {
                return "Herstel";
            }
            break;
        case "wordSend":
            if (lang==="en") {
                return "Send";
            }
            if (lang==="nl") {
                return "Versturen";
            }
            break;
        case "wordHi":
            if (lang==="en") {
                return "Hi";
            }
            if (lang==="nl") {
                return "Hallo";
            }
            break;
        case "msgAccountAlreadyCreated":
            if (lang==="en") {
                return "If you have subscribed already, you can skip this step and";
            }
            if (lang==="nl") {
                return "Heb je al een account? Dan kun je meteen";
            }
            break;
        case "msgAlreadyLoggedIn":
            if (lang==="en") {
                return "You are already logged in.";
            }
            if (lang==="nl") {
                return "Je bent al ingelogd.";
            }
            break;
        case "msgNoAccountYet":
            if (lang==="en") {
                return "If you have no account yet, then please first";
            }
            if (lang==="nl") {
                return "Heb je nog geen account? Dan moet je je eerst nog even";
            }
            break;
        case "msgFailedToSubscribe":
            if (lang==="en") {
                return "Unable to contact database. Please check your network connection or try again later.";
            }
            if (lang==="nl") {
                return "Er is iets misgegaan met het contacteren van de database. Controleer de netwerkverbinding of probeer het later nog een keer.";
            }
            break;
        case "msgRegistrationRefused":
            if (lang==="en") {
                return "A user account already exists with this user name and/or email address.";
            }
            if (lang==="nl") {
                return "Er bestaat al een account met deze gebruikersnaam en/of dit e-mailadres.";
            }
            break;
        case "msgRegistrationOngoing":
            if (lang==="en") {
                return "Contacting database to create account...";
            }
            if (lang==="nl") {
                return "Database contacteren om het account aan te melden...";
            }
            break;
        case "msgFailedToCheckCredentials":
            if (lang==="en") {
                return "Unable to contact database. Please check your network connection or try again later.";
            }
            if (lang==="nl") {
                return "Er is iets misgegaan met het contacteren van de database. Controleer de netwerkverbinding of probeer het later nog een keer.";
            }
            break;
        case "msgCredentialsNotFound":
            if (lang==="en") {
                return "No user account found for these login credentials.";
            }
            if (lang==="nl") {
                return "Geen gebruikersaccount gevonden voor deze inloggegevens.";
            }
            break;
        case "msgLoginOngoing":
            if (lang==="en") {
                return "Login ongoing...";
            }
            if (lang==="nl") {
                return "Inloggen...";
            }
            break;
        case "msgFailedToUpdateUserData":
            if (lang==="en") {
                return "Unable to contact database. Please check your network connection or try again later.";
            }
            if (lang==="nl") {
                return "Er is iets misgegaan met het contacteren van de database. Controleer de netwerkverbinding of probeer het later nog een keer.";
            }
            break;
        case "msgUpdateRefused":
            if (lang==="en") {
                return "Your session has expired. Please log in again.";
            }
            if (lang==="nl") {
                return "De sessie is verlopen. Log alsjeblieft opnieuw in.";
            }
            break;
        case "msgUpdatingUserData":
            if (lang==="en") {
                return "Updating data...";
            }
            if (lang==="nl") {
                return "Gegevens wijzigen...";
            }
            break;
        default:
            return "";
    }
}

export default getText;