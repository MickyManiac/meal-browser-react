import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { LanguageContext } from "../context/LanguageContext";
import PageTitle from "../components/PageTitle";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";
import getText from "../helpers/getText";
// temp, remove later
import noimagefound from "../assets/NoImageFound.GIF";

function MostPopularPage() {
    // Recipe related state
    const [bulkData, setBulkData] = useState([]);
    const [errorBulkData, setErrorBulkData] = useState(false);
    const [loadingBulkData, setLoadingBulkData] = useState(false);
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(-1);
    const [recipeDetails, setRecipeDetails] = useState({});
    const [errorRecipeDetails, setErrorRecipeDetails] = useState(false);
    const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(true);

    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Use an abort controller to avoid a memory leak due to unfinished requests.
    let abortControllerFetchDetails = new AbortController();
    let controlSignalFetchDetails = abortControllerFetchDetails.signal;

    // Handle selection (clicking) of a preview box
    // This should trigger fetching detailed recipe data if:
    // - a different preview box is selected than previously and also if
    // - for the previous selection, recipe details could not be fetched due to an error
    function handlePreviewBoxSelection(previewBoxInd) {
        console.log(`Preview box with index ${previewBoxInd} selected.`);
        if (selectedPreviewIndex !== previewBoxInd || errorRecipeDetails) {
            fetchRecipeDetails(previewBoxInd);
        }
        setSelectedPreviewIndex(previewBoxInd);
    }

    // temp testBulkData, remove later
    const testBulkData = [
        {id: "411022", title: "Eenvoudigste recept", readyInMinutes: 10, aggregateLikes: 23013},
        {image: noimagefound},
        {id: "411024", title: "Eenvoudig recept met een langere beschrijving dan je zou verwachten in de naam van een recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303},
        {id: "411025", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303},
        {id: "411026", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303}
    ];

    // Fetch recipe data for a list of specific recipes based on Spoonacular's Get Recipe Information Bulk endpoint.
    useEffect(() => {
        const abortControllerFetchBulk = new AbortController();
        const controlSignalFetchBulk = abortControllerFetchBulk.signal;
        async function fetchBulkData() {
            setErrorBulkData(false);
            setLoadingBulkData(true);
            setSelectedPreviewIndex(-1);

            // Bulk REST call for 8 specific recipes
            // const restCall = `https://api.spoonacular.com/recipes/informationBulk?ids=715562,715419,715521,715495,715560,776505,715538,716429&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
            // Temporarily reduce the amount of recipes in order to avoid that the API key's quota is exceeded very fast.
            // Quota is 150 points per day for a free subscription.
            // Calling this endpoint requires 1 point for the first recipe and 0.5 points for every additional
            // recipe returned, i.e. 4.5 points for 8 recipes each time, i.e. quota exceeded after 34 requests.
            // remove later
            const restCall = `https://api.spoonacular.com/recipes/informationBulk?ids=715562,715419,715521,715495&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
            // const restCall = `https://api.spoonacular.com/recipes/informationBulk?ids=715562&apiKey=ada1ef8535a14d7695ff0ba52516335a`;

            try {
                // const response = await axios.get(restCall, { signal: controller.signal });
                const response = await axios.get(restCall, { signal: controlSignalFetchBulk });
                console.log(response.data);
                setBulkData(response.data);
            } catch (error) {
                console.error(error);
                console.log(error.response);
                setErrorBulkData(true);
            }
            setLoadingBulkData(false);
        }
        if (bulkData.length === 0) {
            fetchBulkData();
        }
        // Before unmounting, cancel up any unfinished requests.
        return function cleanup() {
            abortControllerFetchBulk.abort();
            abortControllerFetchDetails.abort();
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
        instructions: " <ol>   <li>  Doe het meel in een kom.</li> <li>Kluts de eieren.</li>   <li>   Voeg melk, <b>eieren </b>en zout toe. </li><li>Meng het geheel tot een klontvrij beslag. </li> </ol>",
//        instructions: "<ol><li>Doe het meel in een kom.</li><li>Kluts de eieren.</li><li>Voeg melk, eieren en zout toe.</li><li>Meng het geheel tot een klontvrij beslag.</li></ol>",
//        instructions: `• Doe het meel in een kom.• Kluts de eieren.• Voeg melk, eieren en zout toe.• Meng het geheel tot een klontvrij beslag.`,
//        sourceUrl: "https://www.bestaat.niet.yx",
    };

    // Fetch recipe details for a specific recipe based on Spoonacular's Get Recipe Information endpoint.
    async function fetchRecipeDetails(previewIndex) {
        setErrorRecipeDetails(false);
        setLoadingRecipeDetails(true);
        // alert(`Fetching recipe details for index ${previewIndex} while state is ${selectedPreviewIndex}`);
        if (bulkData && bulkData.length > 0) {
            const recipeId = bulkData[previewIndex].id;
            const recipeQuery = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=ada1ef8535a14d7695ff0ba52516335a`;
            // Cancel any unfinished previous requests.
            abortControllerFetchDetails.abort();
            // Control the next request with a new AbortController object.
            abortControllerFetchDetails = new AbortController();
            controlSignalFetchDetails = abortControllerFetchDetails.signal;
            try {
                const response = await axios.get(recipeQuery,{ signal: controlSignalFetchDetails });
                console.log(response.data);
                setRecipeDetails(response.data);
            } catch (error) {
                console.error(error);
                setErrorRecipeDetails(true);
            }
            setLoadingRecipeDetails(false);
        }
    }

    // Render page content
    return(
        <>
            <PageTitle page="mostpopular" />
            <>
                { errorBulkData &&
                    <div className="error-message">{ getText(activeLanguage,"msgFailedToFetchRecipes") }</div>
                }
                { loadingBulkData &&
                    <div className="status-message">{ getText(activeLanguage, "msgFetchingRecipes") }</div>
                }
                { bulkData.length > 0 && !errorBulkData && !loadingBulkData &&
                    <PreviewCarousel carouselItems={bulkData} fnUseSelectedItemIndex={handlePreviewBoxSelection}/>
                }
                { selectedPreviewIndex > -1 &&
                    <>
                        { errorRecipeDetails &&
                            <div className="error-message">{ getText(activeLanguage,"msgFailedToFetchRecipeDetails") }</div>
                        }
                        { loadingRecipeDetails &&
                            <div className="status-message">{ getText(activeLanguage,"msgFetchingRecipeDetails") }</div>
                        }
                        { Object.keys(recipeDetails).length > 0 && !errorRecipeDetails && !loadingRecipeDetails &&
                            <RecipeDetails recipeData={recipeDetails}/>
                        }
                    </>
                }
                { testBulkData.length > 0 &&
                    <PreviewCarousel carouselItems={testBulkData} fnUseSelectedItemIndex={handlePreviewBoxSelection}/>
                }
                { selectedPreviewIndex > -1 &&
                    <>
                        <div>De preview-box met index {selectedPreviewIndex} werd geselecteerd!</div>
                        { Object.keys(testRecipeDetails).length > 0 &&
                            <RecipeDetails recipeData={testRecipeDetails}/>
                        }
                    </>
                }
            </>
        </>
    );
}

export default MostPopularPage;