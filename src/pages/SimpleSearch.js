import React, {useEffect, useState} from 'react';
import axios from "axios";
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";

function SimpleSearchPage() {
    const [textQueryValue, setTextQueryValue] = React.useState('');
    const [recipeData, setRecipeData] = useState({});
    const [errorRecipeData, setErrorRecipeData] = useState(false);
    const [loadingRecipeData, setLoadingRecipeData] = useState(true);
    const [recipeDetails, setRecipeDetails] = useState({});
    const [errorRecipeDetails, setErrorRecipeDetails] = useState(false);
    const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(true);
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(-1);
    function handlePreviewBoxSelection(previewBoxInd) {
        setSelectedPreviewIndex(previewBoxInd);
    }
    function submitData(e) {
        e.preventDefault();
        // alert(`We gaan recepten zoeken met zoekterm ${textQueryValue}`);
        fetchRecipeData(textQueryValue);
    }
    // Fetch data for recipes based on user's search text and Spoonacular's complex search endpoint.
    async function fetchRecipeData(searchText) {
        setErrorRecipeData(false);
        setLoadingRecipeData(true);
        if (searchText) {
            const restCall = `https://api.spoonacular.com/recipes/complexSearch?&query=${searchText}&number=4&addRecipeInformation=true&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
            try {
                console.log({searchText});
                const response = await axios.get(restCall);
                console.log(response.data.results);
                setRecipeData(response.data.results);
                // Process data ...
            } catch (error) {
                console.error(error);
                setErrorRecipeData(true);
            }
            setLoadingRecipeData(false);
        }
    }
    // Fetch recipe details for a specific recipe whenever a new recipe has been selected (by clicking a preview box)
    useEffect(() => {
        async function fetchRecipeDetails() {
            setErrorRecipeDetails(false);
            setLoadingRecipeDetails(true);
            // console.log(testBulkData[selectedPreviewIndex].id);
            if (recipeData.length > 0) {
                const recipeId = recipeData[selectedPreviewIndex].id;
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
            <PageTitle text="Eenvoudig zoeken naar recepten" />
            <form>
                <fieldset>
                    <InputField
                        fieldId="text-query-field"
                        labelText="Vul een zoekterm in:"
                        fieldType="text"
                        fieldName="text-query"
                        fieldValue={textQueryValue}
                        fieldPlacholder="bijv fruit salad"
                        fnOnChange={setTextQueryValue}
                    />
                    <ButtonForResetOrSubmit
                        buttonType="submit"
                        buttonDisabled={!textQueryValue}
                        buttonText="Zoeken"
                        fnOnClick={submitData}
                    />
                </fieldset>
            </form>
            { errorRecipeData &&
                <div className="status-message">Er is iets misgegaan met het ophalen van de data.</div>
            }
            { loadingRecipeData &&
                <div className="status-message">Data ophalen...</div>
            }
            { recipeData.length > 0 && !errorRecipeData && !loadingRecipeData &&
                <PreviewCarousel carouselItems={recipeData} fnUseSelectedItemIndex={handlePreviewBoxSelection}/>
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
                    { Object.keys(recipeDetails).length > 0 &&
                        <RecipeDetails recipeData={recipeDetails}/>
                    }
                </>
            }
        </>
    );
}

export default SimpleSearchPage;