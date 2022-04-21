import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "../components/PageTitle";
import imagenoclue from '../assets/NoClue.GIF';
import imagenowiknow from '../assets/NowIKnow.GIF';

function HomePage() {
    return(
        <>
            <PageTitle text="Vind altijd een passend recept met Meal Browser" />
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
        </>
    );
}

export default HomePage;