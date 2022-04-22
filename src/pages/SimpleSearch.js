import React, {useEffect, useState} from 'react';
import axios from "axios";
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";
import validSearchTerm from "../helpers/validSearchTerm";

function SimpleSearchPage() {
    const [searchTermValue, setSearchTermValue] = React.useState('');
    const [formFeedback, setFormFeedback] = useState('');
    const [submittedFormData, setSubmittedFormData] = useState('');
    const [recipeData, setRecipeData] = useState(null);
    const [errorRecipeData, setErrorRecipeData] = useState(false);
    const [loadingRecipeData, setLoadingRecipeData] = useState(false);
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(-1);
    const [recipeDetails, setRecipeDetails] = useState({});
    const [errorRecipeDetails, setErrorRecipeDetails] = useState(false);
    const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(true);
    function handlePreviewBoxSelection(previewBoxInd) {
        setSelectedPreviewIndex(previewBoxInd);
    }
    // Handle submit of form data:
    // - validate form data
    // - provide user feedback for invalid form data
    // - search for results for valid form data
    function submitFormData(e) {
        let feedback = ``;
        let validFormData = true;
        e.preventDefault();
        if (!searchTermValue) {
            feedback = `Vul een zoekterm in.`;
            validFormData = false;
        } else if (!validSearchTerm(searchTermValue)) {
            feedback = `"${searchTermValue}"  is geen geldige zoekterm. Toegestaan zijn: alle letters, alle cijfers, de tekens " & ( ) + - en spaties.`;
            validFormData = false;
        }
        setFormFeedback(feedback);
        setSubmittedFormData(`zoekterm "${searchTermValue}"`);
        if (validFormData) {
            fetchRecipeData(searchTermValue);
        }
    }
    // Search for recipes based on submitted form data and Spoonacular's complex search endpoint.
    async function fetchRecipeData(searchText) {
        setErrorRecipeData(false);
        setLoadingRecipeData(true);
        setSelectedPreviewIndex(-1);
        if (searchText) {
            const restCall = `https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&number=1&addRecipeInformation=true&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
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
            if (recipeData && recipeData.length > 0) {
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
                    <div className="form-elements-row">
                        <InputField
                            fieldClassName="free-text"
                            fieldId="text-query-field"
                            labelText="Vul een zoekterm in:"
                            fieldType="text"
                            fieldName="text-query"
                            fieldValue={searchTermValue}
                            fieldPlacholder="bijv fruit salad"
                            fnOnChange={setSearchTermValue}
                        />
                    </div>
                    <div className="form-elements-row">
                        <ButtonForResetOrSubmit
                            buttonType="submit"
                            buttonDisabled={!searchTermValue}
                            buttonText="Zoeken"
                            fnOnClick={submitFormData}
                        />
                    </div>
                </fieldset>
            </form>
            { formFeedback &&
                <div className="error-message">{formFeedback}</div>
            }
            { errorRecipeData &&
                <div className="error-message">Er is iets misgegaan met het zoeken naar recepten. Controleer de netwerkverbinding of probeer het later nog een keer.</div>
            }
            { loadingRecipeData &&
                <div className="status-message">Zoeken naar recepten...</div>
            }
            { !errorRecipeData && !loadingRecipeData &&
                <>
                    { recipeData && recipeData.length > 0
                        ?
                        <>
                            <div className="confirmation-message">Resultaten voor {submittedFormData}:</div>
                            <PreviewCarousel carouselItems={recipeData} fnUseSelectedItemIndex={handlePreviewBoxSelection}/>
                        </>
                        :
                        <>
                            { recipeData && recipeData.length === 0 &&
                                <div className="error-message">Geen resultaten voor {submittedFormData}. Probeer een andere zoekterm.</div>
                            }
                        </>
                    }
                </>
            }
            { selectedPreviewIndex > -1 &&
                <>
                    { errorRecipeDetails &&
                        <div className="error-message">Er is iets misgegaan met het ophalen van de receptinformatie. Controleer de netwerkverbinding of probeer het later nog een keer.</div>
                    }
                    { loadingRecipeDetails &&
                        <div className="status-message">Receptinformatie ophalen...</div>
                    }
                    { Object.keys(recipeDetails).length > 0 && !errorRecipeDetails && !loadingRecipeDetails &&
                        <RecipeDetails recipeData={recipeDetails}/>
                    }
                </>
            }
        </>
    );
}

export default SimpleSearchPage;