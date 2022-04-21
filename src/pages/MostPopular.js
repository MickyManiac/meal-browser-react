import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from "../components/PageTitle";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";
// temp, remove later
import noimagefound from "../assets/NoImageFound.GIF";

function MostPopularPage() {
    const [bulkData, setBulkData] = useState({});
    const [errorBulkData, setErrorBulkData] = useState(false);
    const [loadingBulkData, setLoadingBulkData] = useState(true);
    // temp let, make const later
    // const query = `https://api.spoonacular.com/recipes/informationBulk?ids=715562,715419,715521,715495,715560,776505,715538,716429&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
    // remove later
    const query = `https://api.spoonacular.com/recipes/informationBulk?ids=715562&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
    // temp testBulkData, remove later
    const testBulkData = [
        {id: "411022", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
        {id: "411023", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
        {id: "411024", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
        {id: "411025", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
        {id: "411026", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"}
    ];    // temp testBulkData, remove later
    const testRecipeDetails = {
        id: "411022",
        title: "Eenvoudig recept",
        image: noimagefound,
        readyInMinutes: 30,
        servings: 4,
        extendedIngredients: [ {original: "1 liter melk"}, {original: "3 eieren"}, {original: "500 gram speltbloem"}, {original: "snufje zout"} ],
        instructions: "Doe het meel in een kom. Kluts de eieren. Voeg melk, eieren en zout to aan het meel. Meng het geheel tot een klontvrij beslag.",
        aggregateLikes: 12303,
        sourceUrl: "https://www.bestaat.niet.yx"
    };
    useEffect(() => {
        async function fetchBulkData() {
            setErrorBulkData(false);
            setLoadingBulkData(true);
            try {
                const result = await axios.get(query);
                console.log(result.data);
                setBulkData(result.data);
            } catch (error) {
                console.error(error);
                setErrorBulkData(true);
            }
            setLoadingBulkData(false);
        }
        // Temporary disable the effect in order to avoid that the API key's quota is exceeded very fast.
        // Quota is 150 points per day for a free subscription.
        // Calling this endpoint requires 1 point for the first recipe and 0.5 points for every additional
        // recipe returned, i.e. 4.5 points for 8 recipes each time, i.e. quota exceeded after 34 requests.
        // fetchBulkData();
    }, []);
    return(
        <>
            <PageTitle text="Populaire recepten" />
            <>
                { errorBulkData &&
                    <div className="status-message">Er is iets misgegaan met het ophalen van de data.</div>
                }
                { loadingBulkData &&
                    <div className="status-message">Data ophalen...</div>
                }
                { bulkData.length > 0 && !errorBulkData && !loadingBulkData &&
                    <>
                        <PreviewCarousel carouselItems={bulkData}/>
                    </>
                }
                { testBulkData.length > 0 &&
                    <>
                        <div>GEBRUIK VOOR NU TEST DATA</div>
                        <PreviewCarousel carouselItems={testBulkData}/>
                    </>
                }
                { Object.keys(testRecipeDetails).length > 0 &&
                    <>
                        <div>GEBRUIK VOOR NU TEST DATA</div>
                        <RecipeDetails recipeData={testRecipeDetails}/>
                    </>
                }
            </>
        </>
    );
}

export default MostPopularPage;