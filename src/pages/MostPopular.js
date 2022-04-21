import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from "../components/PageTitle";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";
// temp, remove later
import noimagefound from "../assets/NoImageFound.GIF";

function MostPopularPage() {
    const [bulkData, setBulkData] = useState([]);
    const [errorBulkData, setErrorBulkData] = useState(false);
    const [loadingBulkData, setLoadingBulkData] = useState(true);
    const [recipeDetails, setRecipeDetails] = useState({});
    const [errorRecipeDetails, setErrorRecipeDetails] = useState(false);
    const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(true);
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(-1);
    function handlePreviewBoxSelection(previewBoxInd) {
        setSelectedPreviewIndex(previewBoxInd);
    }
    // Bulk REST call for 8 specific recipes
    // const bulkQuery = `https://api.spoonacular.com/recipes/informationBulk?ids=715562,715419,715521,715495,715560,776505,715538,716429&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
    // remove later
    const bulkQuery = `https://api.spoonacular.com/recipes/informationBulk?ids=715562,715419,715521,715495&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
    // const bulkQuery = `https://api.spoonacular.com/recipes/informationBulk?ids=715562&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
    // temp testBulkData, remove later
    const testBulkData = [
        {id: "411022", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303},
        {id: "411023", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303},
        {id: "411024", title: "Eenvoudig recept met een langere beschrijving dan je zou verwachten in de naam van een recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303},
        {id: "411025", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303},
        {id: "411026", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303}
    ];
    // Fetch bulk data for a predefined list of popular recipes.
    useEffect(() => {
        async function fetchBulkData() {
            setErrorBulkData(false);
            setLoadingBulkData(true);
            try {
                const result = await axios.get(bulkQuery);
                console.log(result.data);
                setBulkData(result.data);
            } catch (error) {
                console.error(error);
                setErrorBulkData(true);
            }
            setLoadingBulkData(false);
        }
        // Temporarily disable the effect in order to avoid that the API key's quota is exceeded very fast.
        // Quota is 150 points per day for a free subscription.
        // Calling this endpoint requires 1 point for the first recipe and 0.5 points for every additional
        // recipe returned, i.e. 4.5 points for 8 recipes each time, i.e. quota exceeded after 34 requests.
        if (bulkData.length === 0) {
            fetchBulkData();
        }
    }, []);
    // temp testRecipeDetails, remove later
    const testRecipeDetails = {
        id: "411022",
//        title: "Eenvoudig recept",
//        aggregateLikes: 12303,
//        image: noimagefound,
//        readyInMinutes: 30,
//        extendedIngredients: [ {original: "1 liter melk"}, {original: "3 eieren"}, {original: "500 gram speltbloem"}, {original: "snufje zout"} ],
//        servings: 4,
//        instructions: "Doe het meel in een kom. Kluts de eieren. Voeg melk, eieren en zout toe. Meng het geheel tot een klontvrij beslag.",
//        sourceUrl: "https://www.bestaat.niet.yx"
    };
    // Fetch recipe details for a specific recipe whenever a new recipe has been selected (by clicking a preview box)
    useEffect(() => {
        async function fetchRecipeDetails() {
            setErrorRecipeDetails(false);
            setLoadingRecipeDetails(true);
            // console.log(testBulkData[selectedPreviewIndex].id);
            if (bulkData.length > 0) {
                const recipeId = bulkData[selectedPreviewIndex].id;
                const recipeQuery = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=ada1ef8535a14d7695ff0ba52516335a`;
                try {
                    const result = await axios.get(recipeQuery);
                    console.log(result.data);
                    setRecipeDetails(result.data);
                } catch (error) {
                    console.error(error);
                    setErrorRecipeDetails(true);
                }
                setLoadingRecipeDetails(false);
            }
        }
        if (selectedPreviewIndex > -1) {
            fetchRecipeDetails();
        }
    }, [selectedPreviewIndex]);
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
                        <PreviewCarousel carouselItems={bulkData} fnUseSelectedItemIndex={handlePreviewBoxSelection}/>
                    </>
                }
                { selectedPreviewIndex > -1 &&
                    <>
                        <div>De preview-box met index {selectedPreviewIndex} werd geselecteerd!</div>
                        { errorRecipeDetails &&
                            <div className="status-message">Er is iets misgegaan met het ophalen van de data.</div>
                        }
                        { loadingRecipeDetails &&
                            <div className="status-message">Data ophalen...</div>
                        }
                        {
                            Object.keys(recipeDetails).length > 0 &&
                            <>
                                <RecipeDetails recipeData={recipeDetails}/>
                            </>
                        }
                    </>
                }
                { testBulkData.length > 0 &&
                    <>
                        <div>GEBRUIK VOOR NU TEST DATA</div>
                        <PreviewCarousel carouselItems={testBulkData} fnUseSelectedItemIndex={handlePreviewBoxSelection}/>
                    </>
                }
                { selectedPreviewIndex > -1 &&
                    <>
                        <div>De preview-box met index {selectedPreviewIndex} werd geselecteerd!</div>
                        {
                            Object.keys(testRecipeDetails).length > 0 &&
                            <>
                                <div>GEBRUIK VOOR NU TEST DATA</div>
                                <RecipeDetails recipeData={testRecipeDetails}/>
                            </>
                        }
                    </>
                }
            </>
        </>
    );
}

export default MostPopularPage;