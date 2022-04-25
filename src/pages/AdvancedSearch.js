import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { LanguageContext } from "../context/LanguageContext";
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";
import CuisineSelector from "../components/CuisineSelector";
import DietSelector from "../components/DietSelector";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";
import validMaxPreparationTime from "../helpers/validMaxPreparationTime";
import validSearchTerm from "../helpers/validSearchTerm";
import getText from "../helpers/getText";
import getOptionKey from "../helpers/getOptionKey";

function AdvancedSearchPage() {
    // Form related state
    const [searchTermValue, setSearchTermValue] = React.useState('');
    const [preparationTimeValue, setPreparationTimeValue] = React.useState('');
    const [cuisineValue, setCuisineValue] = React.useState('No preference');
    const [dietValue, setDietValue] = React.useState('No preference');
    const [formFeedbackNl, setFormFeedbackNl] = useState('');
    const [formFeedbackEn, setFormFeedbackEn] = useState('');
    const [submittedFormDataNl, setSubmittedFormDataNl] = useState('');
    const [submittedFormDataEn, setSubmittedFormDataEn] = useState('');

    // Recipe related state
    const [recipeData, setRecipeData] = useState(null);
    const [errorRecipeData, setErrorRecipeData] = useState(false);
    const [loadingRecipeData, setLoadingRecipeData] = useState(false);
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(-1);
    const [recipeDetails, setRecipeDetails] = useState({});
    const [errorRecipeDetails, setErrorRecipeDetails] = useState(false);
    const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(true);

    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Use abort controllers to avoid memory leaks due to unfinished requests.
    let abortControllerFetchData = new AbortController();
    let controlSignalFetchData = abortControllerFetchData.signal;
    let abortControllerFetchDetails = new AbortController();
    let controlSignalFetchDetails = abortControllerFetchDetails.signal;

    // Handle selection (clicking) of a preview box.
    // This should trigger fetching detailed recipe data if:
    // - a different preview box is selected than previously and also if
    // - for the previous selection, recipe details could not be fetched due to an error.
    function handlePreviewBoxSelection(previewBoxInd) {
        console.log(`Preview box with index ${previewBoxInd} selected.`);
        if (selectedPreviewIndex !== previewBoxInd || errorRecipeDetails) {
            fetchRecipeDetails(previewBoxInd);
        }
        setSelectedPreviewIndex(previewBoxInd);
    }

    // Handle submit of form data:
    // - validate form data
    // - provide user feedback for invalid form data
    // - provide a summary of the applied search query, as user feedback
    // - search for results for valid form data
    function submitFormData(e) {
        let feedbackNl = ``;
        let feedbackEn = ``;
        let validFormData = true;
        let searchSummaryNl = ``;
        let searchSummaryEn = ``;
        e.preventDefault();
        if (!searchTermValue) {
            feedbackNl = `Vul een zoekterm in.`;
            feedbackEn = `Search term missing.`;
            validFormData = false;
        } else if (!validSearchTerm(searchTermValue)) {
            feedbackNl = `"${searchTermValue}"  is geen geldige zoekterm. Toegestaan zijn: alle letters, alle cijfers, de tekens " & ( ) + - en spaties.`;
            feedbackEn = `"${searchTermValue}"  is not a vaild search term. Allowed are letters, digits,  " & ( ) + - and whitespace.`;
            validFormData = false;
        }
        searchSummaryNl = `zoekterm "${searchTermValue}"`;
        searchSummaryEn = `search term "${searchTermValue}"`;
        if (!validMaxPreparationTime(preparationTimeValue)) {
            if (feedbackNl) { feedbackNl += ` `; feedbackEn += ` `; }
            feedbackNl += `"${preparationTimeValue}" is geen geldige bereidingstijd. Vul een getal in dat groter is dan 0.`;
            feedbackEn += `"${preparationTimeValue}"  is not a vaild preparation time. Please fill out a number that is greater than 0.`;
            validFormData = false;
        } else {
            if (preparationTimeValue) {
                searchSummaryNl += `, maximale bereidingstijd ${preparationTimeValue} minuten`;
                searchSummaryEn += `, maximum preparation time ${preparationTimeValue} minutes`;
            }
        }
        setFormFeedbackNl(feedbackNl);
        setFormFeedbackEn(feedbackEn);
        console.log("value: "+cuisineValue);
        console.log("key: "+getOptionKey(cuisineValue));
        console.log("nl text: "+getText("nl", getOptionKey(cuisineValue)));
        console.log("en text: "+getText("en", getOptionKey(cuisineValue)));
        if (cuisineValue !== 'No preference') {
            searchSummaryNl += `, keuken ${ getText("nl", getOptionKey(cuisineValue)) }`;
            searchSummaryEn += `, cuisine ${ getText("en", getOptionKey(cuisineValue)) }`;
        }
        if (dietValue !== 'No preference') {
            searchSummaryNl += `, dieet ${ getText("nl", getOptionKey(dietValue)) }`;
            searchSummaryEn += `, diet ${ getText("en", getOptionKey(dietValue)) }`;
        }
        setSubmittedFormDataNl(searchSummaryNl);
        setSubmittedFormDataEn(searchSummaryEn);
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

    // Search for recipes based on submitted form data and Spoonacular's Search Recipes endpoint.
    async function fetchRecipeData(searchTerm, maxPreparationTime, cuisine, diet) {
        setErrorRecipeData(false);
        setLoadingRecipeData(true);
        setSelectedPreviewIndex(-1);
        if (searchTerm) {
            // build the URL for the REST call
            let restCall = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}`;
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
            // Cancel any unfinished previous requests.
            abortControllerFetchData.abort();
            // Control the next request with a new AbortController object.
            abortControllerFetchData = new AbortController();
            controlSignalFetchData = abortControllerFetchData.signal;
            try {
                const response = await axios.get(restCall, { signal: controlSignalFetchData });
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

    // Fetch recipe details for a specific recipe based on Spoonacular's Get Recipe Information endpoint.
    async function fetchRecipeDetails(previewIndex) {
        setErrorRecipeDetails(false);
        setLoadingRecipeDetails(true);
        if (recipeData && recipeData.length > 0) {
            const recipeId = recipeData[previewIndex].id;
            const recipeQuery = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=ada1ef8535a14d7695ff0ba52516335a`;
            // Cancel any unfinished previous requests.
            abortControllerFetchDetails.abort();
            // Control the next request with a new AbortController object.
            abortControllerFetchDetails = new AbortController();
            controlSignalFetchDetails = abortControllerFetchDetails.signal;
            try {
                const result = await axios.get(recipeQuery, { signal: controlSignalFetchDetails });
                console.log(result.data);
                setRecipeDetails(result.data);
            } catch (error) {
                console.error(error);
                setErrorRecipeDetails(true);
            }
            setLoadingRecipeDetails(false);
        }
    }

    // Unmount effect: cancel any unfinished requests.
    useEffect(() => {
        // Before unmounting, cancel any unfinished requests.
        return function cleanup() {
            abortControllerFetchData.abort();
            abortControllerFetchDetails.abort();
        }
    }, []);

    // Render page content
    return(
        <>
            <PageTitle page="advancedsearch" />
            <form>
                <fieldset>
                    <div className="form-elements-row">
                        <div className="form-element">
                            <InputField
                                fieldClassName="free-text"
                                fieldId="text-query-field"
                                labelText={ getText(activeLanguage,"labelSearchField") }
                                fieldType="text"
                                fieldName="text-query"
                                fieldValue={searchTermValue}
                                fieldPlacholder={ getText(activeLanguage,"placeholderSearchField") }
                                fnOnChange={setSearchTermValue}
                            />
                        </div>
                    </div>
                    <div className="form-elements-row">
                        <div className="form-element">
                            <InputField
                                fieldClassName="number"
                                fieldId="preparation-time-field"
                                labelText={ getText(activeLanguage,"labelMaxPreparationTimeField") }
                                fieldType="text"
                                fieldName="preparation-time"
                                fieldValue={preparationTimeValue}
                                fieldPlacholder={ getText(activeLanguage,"placeholderMaxPreparationTimeField") }
                                fnOnChange={setPreparationTimeValue}
                            />
                        </div>
                        <div className="form-element">
                            <CuisineSelector
                                labelText={ getText(activeLanguage,"labelCuisineSelector") }
                                selectorValue={cuisineValue}
                                fnOnChange={setCuisineValue}
                            />
                        </div>
                        <div className="form-element">
                            <DietSelector
                                labelText={ getText(activeLanguage,"labelDietSelector") }
                                selectorValue={dietValue}
                                fnOnChange={setDietValue}
                            />
                        </div>
                    </div>
                    <div className="form-elements-row">
                        <div className="form-element">
                            <ButtonForResetOrSubmit
                                buttonType="submit"
                                buttonDisabled={!searchTermValue}
                                buttonText={ getText(activeLanguage,"searchButtonText") }
                                fnOnClick={submitFormData}
                            />
                        </div>
                        <div className="form-element">
                            <ButtonForResetOrSubmit
                                buttonType="reset"
                                buttonDisabled={!searchTermValue && !preparationTimeValue &&
                                    cuisineValue === "No preference" && dietValue === "No preference"}
                                buttonText={ getText(activeLanguage,"resetButtonText") }
                                fnOnClick={resetForm}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
            { formFeedbackNl && activeLanguage === "nl" &&
                <div className="error-message">{formFeedbackNl}</div>
            }
            { formFeedbackEn && activeLanguage === "en" &&
                <div className="error-message">{formFeedbackEn}</div>
            }
            { errorRecipeData &&
                <div className="error-message">{ getText(activeLanguage,"msgFailedToSearchForRecipes") }</div>
            }
            { loadingRecipeData &&
                <div className="status-message">{ getText(activeLanguage, "msgSearchingForRecipes") }</div>
            }
            { !errorRecipeData && !loadingRecipeData &&
                <>
                    { recipeData && recipeData.length > 0
                        ?
                        <>
                            <div className="confirmation-message">
                                { getText(activeLanguage, "msgResultsStart") }
                                { activeLanguage==="nl" && <>{submittedFormDataNl}:</> }
                                { activeLanguage==="en" && <>{submittedFormDataEn}:</> }
                            </div>
                            <PreviewCarousel carouselItems={recipeData} fnUseSelectedItemIndex={handlePreviewBoxSelection}/>
                        </>
                        :
                        <>
                            { recipeData && recipeData.length === 0 &&
                                <div className="error-message">
                                    { getText(activeLanguage, "msgNoResultsStart") }
                                    { activeLanguage==="nl" && <>{submittedFormDataNl}</> }
                                    { activeLanguage==="en" && <>{submittedFormDataEn}</> }
                                    { getText(activeLanguage, "msgNoResultsEnd") }
                                </div>
                            }
                        </>
                    }
                </>
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

export default AdvancedSearchPage;