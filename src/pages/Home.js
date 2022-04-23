import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from "../context/LanguageContext";
import PageTitle from "../components/PageTitle";
import imagenoclue from '../assets/NoClue.GIF';
import imagenowiknow from '../assets/NowIKnow.GIF';

function HomePage() {
    const { activeLanguage } = useContext(LanguageContext);
    return(
        <>
            <PageTitle page="home" />
            { activeLanguage === "nl" &&
                <main>
                    <p className="meal-browser-text">
                        Het kan soms best moeilijk zijn om te koken en eten zoals je dat zou willen doen.
                    </p>
                    <p className="meal-browser-text">
                        Je wil afwisselend eten, meestal gezond, het moet lekker zijn en je wil best een beetje indruk maken
                        op jouw tafelgasten.<br />
                        Misschien wil je vegetarisch eten of een ander gezond dieet volgen.<br />
                        Meestal heb je niet veel tijd om te koken, maar af en toe wil je er best een paar uurtjes aan
                        besteden.<br />
                        Iets nieuws uitproberen doe je trouwens ook graag. Of juist iets van vroeger...
                    </p>
                    <img className="centered-smiley" alt="No clue what to cook?" src={imagenoclue} />
                    <p className="meal-browser-text">
                        Met Meal Browser vind jij voortaan altijd een passend recept.
                    </p>
                    <p className="meal-browser-text">
                        Met <Link to="/simplesearch">eenvoudig zoeken</Link> helpt Meal Browser je om recepten te vinden
                        op basis van een zoekterm.<br />
                        Zo kun je zoeken naar een specifiek recept als "chicken salad sandwich" of naar een hele reeks
                        recepten die luisteren naar de zoekterm "fruit salad".
                    </p>
                    <p className="meal-browser-text">
                    Met <Link to="advancedsearch">uitgebreid zoeken</Link> kun je een aantal criteria toepassen om
                    te zoeken naar recepten met de gewenste eigenschappen.<br />
                    Zo kun je bijvoorbeeld zoeken naar een vegetarische pizza die binnen 60 minuten bereid kan
                    worden.
                    </p>
                    <p className="meal-browser-text">
                    Of laat je inspireren door onze <Link to="mostpopular">populaire recepten</Link>.<br />
                    Hier vind je vast een recept dat bij jouw tafelgasten in de smaak zal vallen.
                    </p>
                    <p className="meal-browser-text">
                    Meal Browser wenst jou veel succes bij het realiseren van jouw kookplannen. Eet smakelijk!
                    </p>
                    <img className="centered-smiley" alt="Now you know what to cook!" src={imagenowiknow} />
                </main>
            }
            { activeLanguage === "en" &&
                <main>
                    <p className="meal-browser-text">
                        It can be quite hard to cook and eat the way you would like to cook and eat.
                    </p>
                    <p className="meal-browser-text">
                        You want your meals to be diverse, healthy, and tasty.<br />
                        Maybe, you want to eat more vegetarian food or follow some other diet plan.<br />
                        Usually, preparing food should take little time, but occasionally, you enjoy spending a few
                        hours in the kitchen.<br />
                        You love trying new recipes just as much as digging up classic recipes that you nearly forgot
                        about.<br />
                        And ideally, your cooking skills should impress your guests a bit...
                    </p>
                    <img className="centered-smiley" alt="No clue what to cook?" src={imagenoclue} />
                    <p className="meal-browser-text">
                        Meal Browser will help you find recipes for any occasion.
                    </p>
                    <p className="meal-browser-text">
                        With its <Link to="/simplesearch">simple search</Link> function, Meal Browser helps you find
                        recipes by using a search term.<br />
                        This way, you can search for specific recipes, like "chicken salad sandwich".<br />
                        Or, you can search for any recipes that match a more generic search term like "fruit salad".
                    </p>
                    <p className="meal-browser-text">
                        With the <Link to="advancedsearch">advanced search</Link> function, you can apply a number of
                        search criteria for finding recipes with the desired characteristics.<br />
                        For instance, you can search for a vegetarian pizza with a maximum preparation time of 60
                        minutes.
                    </p>
                    <p className="meal-browser-text">
                        Finally, you may decide to get inspired by Meal Browser's selection of
                        <Link to="mostpopular">popular recipes</Link>.<br />
                        Very likely, your guests will love them.
                    </p>
                    <p className="meal-browser-text">
                        Meal Browser wishes you a lot of fun while finding inspiring recipes and realizing your cooking
                        lifestyle. Bon appétit!
                    </p>
                    <img className="centered-smiley" alt="Now you know what to cook!" src={imagenowiknow} />
                </main>
            }
        </>
    );
}

export default HomePage;