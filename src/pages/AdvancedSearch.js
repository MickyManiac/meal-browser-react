import React, {useEffect, useState} from 'react';
import axios from "axios";
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";
import CuisineSelector from "../components/CuisineSelector";
import DietSelector from "../components/DietSelector";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";
import validMaxPreparationTime from "../helpers/validMaxPreparationTime";
import validSearchTerm from "../helpers/validSearchTerm";

function AdvancedSearchPage() {
    const [searchTermValue, setSearchTermValue] = React.useState('');
    const [preparationTimeValue, setPreparationTimeValue] = React.useState('');
    const [cuisineValue, setCuisineValue] = React.useState('No preference');
    const [dietValue, setDietValue] = React.useState('No preference');
    const [formFeedback, setFormFeedback] = useState('');
    const [submittedFormData, setSubmittedFormData] = useState('');
    const [recipeData, setRecipeData] = useState(null);
    const [errorRecipeData, setErrorRecipeData] = useState(false);
    const [loadingRecipeData, setLoadingRecipeData] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState({});
    const [errorRecipeDetails, setErrorRecipeDetails] = useState(false);
    const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(true);
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(-1);
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
        let searchSummary = ``;
        e.preventDefault();
        if (!searchTermValue) {
            feedback = `Vul een zoekterm in.`;
            validFormData = false;
        } else if (!validSearchTerm(searchTermValue)) {
            feedback = `"${searchTermValue}"  is geen geldige zoekterm. Toegestaan zijn: alle letters, alle cijfers, de tekens " & ( ) + - en spaties.`;
            validFormData = false;
        }
        searchSummary = `zoekterm "${searchTermValue}"`;
        if (!validMaxPreparationTime(preparationTimeValue)) {
            if (feedback) { feedback += ` `; }
            feedback += `"${preparationTimeValue}" is geen geldige bereidingstijd. Vul een getal in dat groter is dan 0.`;
            validFormData = false;
        } else {
            searchSummary += `, maximale bereidingstijd ${preparationTimeValue} minuten`;
        }
        setFormFeedback(feedback);
        if (cuisineValue !== 'No preference') {
            searchSummary += `, keuken "${cuisineValue}"`;
        }
        if (dietValue !== 'No preference') {
            searchSummary += `, dieet "${dietValue}"`;
        }
        setSubmittedFormData(searchSummary);
        if (validFormData) {
            fetchRecipeData(searchTermValue, preparationTimeValue, cuisineValue, dietValue);
        }
    }
    // Handle form reset
    function resetForm() {
        setSearchTermValue('');
        setPreparationTimeValue('');
        setCuisineValue('No preference');
        setDietValue('No preference');
    }
    // Search for recipes based on submitted form data and Spoonacular's complex search endpoint.
    async function fetchRecipeData(searchText, maxPreparationTime, cuisine, diet) {
        setErrorRecipeData(false);
        setLoadingRecipeData(true);
        setSelectedPreviewIndex(-1);
        if (searchText) {
            // build the URL for the REST call
            let restCall = `https://api.spoonacular.com/recipes/complexSearch?query=${searchText}`;
            if (maxPreparationTime) {
                restCall += `&maxReadyTime=${maxPreparationTime}`;
            }
            if (cuisine !== 'No preference') {
                restCall += `&cuisine=${cuisine}`;
            }
            if (diet !== 'No preference') {
                restCall += `&diet=${diet}`;
            }
            restCall += `&number=1&addRecipeInformation=true&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
            alert(restCall);
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
            <PageTitle text="Uitgebreid zoeken naar recepten" />
            <form>
                <fieldset>
                    <div className="form-elements-row">
                        <div className="form-element">
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
                    </div>
                    <div className="form-elements-row">
                        <div className="form-element">
                            <InputField
                                fieldClassName="number"
                                fieldId="preparation-time-field"
                                labelText="Maximale bereidingstijd in minuten:"
                                fieldType="text"
                                fieldName="preparation-time"
                                fieldValue={preparationTimeValue}
                                fieldPlacholder="bijv 30"
                                fnOnChange={setPreparationTimeValue}
                            />
                        </div>
                        <div className="form-element">
                            <CuisineSelector selectorValue={cuisineValue} fnOnChange={setCuisineValue}/>
                        </div>
                        <div className="form-element">
                            <DietSelector selectorValue={dietValue} fnOnChange={setDietValue}/>
                        </div>
                    </div>
                    <div className="form-elements-row">
                        <div className="form-element">
                            <ButtonForResetOrSubmit
                                buttonType="submit"
                                buttonDisabled={!searchTermValue}
                                buttonText="Zoeken"
                                fnOnClick={submitFormData}
                            />
                        </div>
                        <div className="form-element">
                            <ButtonForResetOrSubmit
                                buttonType="reset"
                                buttonDisabled={!searchTermValue && !preparationTimeValue &&
                                    cuisineValue === "No preference" && dietValue === "No preference"}
                                buttonText="Reset"
                                fnOnClick={resetForm}
                            />
                        </div>
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
                                <div className="error-message">Geen resultaten voor {submittedFormData}. Probeer een andere zoekopdracht.</div>
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

export default AdvancedSearchPage;