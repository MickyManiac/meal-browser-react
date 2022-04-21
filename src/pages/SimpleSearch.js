import React, {useState} from 'react';
import axios from "axios";
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import PreviewCarousel from "../components/PreviewCarousel";

function SimpleSearchPage() {
    const [textQueryValue, setTextQueryValue] = React.useState('');
    const [recipeData, setRecipeData] = useState({});
    const [errorRecipeData, setErrorRecipeData] = useState(false);
    const [loadingRecipeData, setLoadingRecipeData] = useState(true);
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(-1);
    function handlePreviewBoxSelection(previewBoxInd) {
        setSelectedPreviewIndex(previewBoxInd);
        // Fetch detailed recipe data for bulkData[previewBoxInd].id via useState with dependency aray [selectedPreviewIndex]
    }
    function submitData(e) {
        e.preventDefault();
        // alert(`We gaan recepten zoeken met zoekterm ${textQueryValue}`);
        fetchRecipeData(textQueryValue);
    }
    // Fetch bulk data for a predefined list of popular recipes.
    async function fetchRecipeData(searchText) {
        setErrorRecipeData(false);
        setLoadingRecipeData(true);
        if (searchText) {
            const restCall = `https://api.spoonacular.com/recipes/complexSearch?&query=${searchText}&number=1&addRecipeInformation=true&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
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
                <>
                    <PreviewCarousel carouselItems={recipeData} fnUseSelectedItemIndex={handlePreviewBoxSelection}/>
                </>
            }
        </>
    );
}

export default SimpleSearchPage;