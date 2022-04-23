import React, {useContext, useState} from 'react';
import axios from "axios";
import { LanguageContext } from "../context/LanguageContext";
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import PreviewCarousel from "../components/PreviewCarousel";
import RecipeDetails from "../components/RecipeDetails";
import validSearchTerm from "../helpers/validSearchTerm";
import getText from "../helpers/getText";

function SimpleSearchPage() {
    // Form related state
    const [searchTermValue, setSearchTermValue] = React.useState('');
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
        setFormFeedbackNl(feedbackNl);
        setFormFeedbackEn(feedbackEn);
        setSubmittedFormDataNl(`zoekterm "${searchTermValue}"`);
        setSubmittedFormDataEn(`search term "${searchTermValue}"`);
        if (validFormData) {
            fetchRecipeData(searchTermValue);
        }
    }

    // Search for recipes based on submitted form data and Spoonacular's Search Recipes endpoint.
    async function fetchRecipeData(searchTerm) {
        setErrorRecipeData(false);
        setLoadingRecipeData(true);
        setSelectedPreviewIndex(-1);
        if (searchTerm) {
            const restCall = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=1&addRecipeInformation=true&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
            try {
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

    // Fetch recipe details for a specific recipe based on Spoonacular's Get Recipe Information endpoint.
    async function fetchRecipeDetails(previewIndex) {
        setErrorRecipeDetails(false);
        setLoadingRecipeDetails(true);
        alert(`Fetching recipe details for index ${previewIndex}`);
        if (recipeData && recipeData.length > 0) {
            const recipeId = recipeData[previewIndex].id;
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

    // Render page content
    return(
        <>
            <PageTitle page="simplesearch" />
            <form>
                <fieldset>
                    <div className="form-elements-row">
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
                    <div className="form-elements-row">
                        <ButtonForResetOrSubmit
                            buttonType="submit"
                            buttonDisabled={!searchTermValue}
                            buttonText={ getText(activeLanguage,"searchButtonText") }
                            fnOnClick={submitFormData}
                        />
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

export default SimpleSearchPage;