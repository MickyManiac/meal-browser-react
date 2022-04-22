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
    const [textQueryValue, setTextQueryValue] = React.useState('');
    const [preparationTimeValue, setPreparationTimeValue] = React.useState('');
    const [cuisineValue, setCuisineValue] = React.useState('No preference');
    const [dietValue, setDietValue] = React.useState('None');
    const [formFeedback, setFormFeedback] = useState('');
    const [recipeData, setRecipeData] = useState({});
    const [errorRecipeData, setErrorRecipeData] = useState(false);
    const [loadingRecipeData, setLoadingRecipeData] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState({});
    const [errorRecipeDetails, setErrorRecipeDetails] = useState(false);
    const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(true);
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(-1);
    function handlePreviewBoxSelection(previewBoxInd) {
        setSelectedPreviewIndex(previewBoxInd);
    }
    // Handle form submit
    function submitData(e) {
        let feedback = ``;
        let validFormData = true;
        e.preventDefault();
        if (!textQueryValue) {
            feedback = `Vul een zoekterm in.`;
            validFormData = false;
        } else if (!validSearchTerm(textQueryValue)) {
            feedback = `"${textQueryValue}"  is geen geldige zoekterm. Toegestaan zijn: alle letters, alle cijfers, de tekens " & ( ) + - en spaties.`;
            validFormData = false;
        }
        if (!validMaxPreparationTime(preparationTimeValue)) {
            if (feedback) { feedback += ` `; }
            feedback += `"${preparationTimeValue}" is geen geldige bereidingstijd. Vul een getal in dat groter is dan 0.`;
            validFormData = false;
        }
        setFormFeedback(feedback);
        if (validFormData) {
            fetchRecipeData(textQueryValue, preparationTimeValue, cuisineValue, dietValue);
        }
    }
    // Handle form reset
    function resetForm() {
        setTextQueryValue('');
        setPreparationTimeValue('');
        setCuisineValue('No preference');
        setDietValue('None');
    }
    // Fetch data for recipes based on user's search text and Spoonacular's complex search endpoint.
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
            if (diet !== 'None') {
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
                                fieldValue={textQueryValue}
                                fieldPlacholder="bijv fruit salad"
                                fnOnChange={setTextQueryValue}
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
                                buttonDisabled={!textQueryValue}
                                buttonText="Zoeken"
                                fnOnClick={submitData}
                            />
                        </div>
                        <div className="form-element">
                            <ButtonForResetOrSubmit
                                buttonType="reset"
                                buttonDisabled={!textQueryValue && !preparationTimeValue &&
                                    cuisineValue === "No preference" && dietValue === "None"}
                                buttonText="Reset"
                                fnOnClick={resetForm}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
            { formFeedback &&
                <div className="status-message">{formFeedback}</div>
            }
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

export default AdvancedSearchPage;