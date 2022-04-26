import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { LanguageContext } from "../context/LanguageContext";
import PageTitle from "../components/PageTitle";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";
import getText from "../helpers/getText";

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

    // Fetch recipe data for a list of specific recipes based on Spoonacular's Get Recipe Information Bulk endpoint.
    useEffect(() => {
        // Use an abort controller to avoid a memory leak due to unfinished requests.
        const abortControllerFetchBulk = new AbortController();
        const controlSignalFetchBulk = abortControllerFetchBulk.signal;
        async function fetchBulkData() {
            setErrorBulkData(false);
            setLoadingBulkData(true);
            setSelectedPreviewIndex(-1);
            // Bulk REST call for 8 specific recipes
            const restCall = `https://api.spoonacular.com/recipes/informationBulk?ids=715562,715419,715521,715495,715560,776505,715538,716429&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
            try {
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
        // Before unmounting, cancel any unfinished requests.
        return function cleanup() {
            abortControllerFetchBulk.abort();
            abortControllerFetchDetails.abort();
        }
    }, []);

    // Fetch recipe details for a specific recipe based on Spoonacular's Get Recipe Information endpoint.
    async function fetchRecipeDetails(previewIndex) {
        setErrorRecipeDetails(false);
        setLoadingRecipeDetails(true);
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
            <header>
                <PageTitle page="mostpopular" />
            </header>
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
        </>
    );
}

export default MostPopularPage;