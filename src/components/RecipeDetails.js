import React, {useContext} from 'react';
import {LanguageContext} from "../context/LanguageContext";
import getText from "../helpers/getText";
import cleanUpInstructionsString from "../helpers/cleanUpInstructionsString";
import './RecipeDetails.css';
import noimagefound from "../assets/NoImageFound.GIF";

function RecipeDetails({ recipeData }) {
    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Render component content
    return(
        <article className="recipe-details">
            <div className="recipe-header">
                { recipeData.title && recipeData.title.length > 0
                    ?
                    <div className="recipe-title">{recipeData.title}</div>
                    :
                    <div className="no-recipe-title">-----</div>
                }
                { recipeData.aggregateLikes >= 0 &&
                    <div className="recipe-data">{recipeData.aggregateLikes} likes</div>
                }
                { recipeData.readyInMinutes >= 0
                    ?
                    <>
                        <div className="recipe-section">{ getText(activeLanguage, "wordPreparationTime") }</div>
                        <div> {recipeData.readyInMinutes} { getText(activeLanguage, "wordMinutes") }</div>
                    </>
                    :
                    <div className="empty-recipe-section">{ getText(activeLanguage, "msgNoPreparationTime") }</div>
                }
            </div>
            <div className="middle-part">
                <div className="middle-text">
                    { recipeData.extendedIngredients && recipeData.extendedIngredients.length > 0
                        ?
                        <>
                            { recipeData.servings >= 0
                                ?
                                <div className="recipe-section">{ getText(activeLanguage, "wordIngredients") } { getText(activeLanguage, "wordFor") } {recipeData.servings} { getText(activeLanguage, "wordServings") }</div>
                                :
                                <div className="recipe-section">{ getText(activeLanguage, "wordIngredients") }</div>
                            }
                            <ul className="bullet-list">
                                { recipeData.extendedIngredients.map((ingredient, index) => (
                                    <li key={recipeData.id+"_ingr_"+index}>{ingredient.original}</li>
                                ))}
                            </ul>
                        </>
                        :
                        <div className="empty-recipe-section">
                            { getText(activeLanguage, "msgNoIngredients") }
                        </div>
                    }
                </div>
                <div className="middle-image">
                    { recipeData.image && recipeData.image.length > 0
                        ?
                        <>
                            { recipeData.title && recipeData.title.length > 0
                                ?
                                <img className="recipe-image" alt={recipeData.title} src={recipeData.image}/>
                                :
                                <img className="recipe-image" alt="-----" src={recipeData.image}/>
                            }
                        </>
                        :
                        <img className="recipe-image" alt="Food image not found for this recipe." src={noimagefound}/>
                    }
                </div>
            </div>
            <div className="recipe-footer">
                <div className="instructions">
                    { recipeData.instructions && recipeData.instructions.length > 0
                        ?
                        <>
                            <div className="recipe-section">{ getText(activeLanguage, "wordInstructions") }</div>
                            <div className="recipe-data">
                                { cleanUpInstructionsString(recipeData.instructions).split(/\|/).map((step, index) => (
                                    <div key={recipeData.id+"_instr_"+index}>{step}</div>
                                ))
                                }
                            </div>
                        </>
                        :
                        <div className="empty-recipe-section">
                            { getText(activeLanguage, "msgNoInstructions") }
                        </div>
                        }
                </div>
                { recipeData.sourceUrl && recipeData.sourceUrl.length > 0
                    ?
                    <div className="recipe-source">
                        <div className="recipe-section">{ getText(activeLanguage, "wordSourceUrl") }</div>
                        <div><a href={recipeData.sourceUrl} target="_blank" rel="noreferrer">{recipeData.sourceUrl}</a></div>
                    </div>
                    :
                    <div className="empty-recipe-source">
                        { getText(activeLanguage, "msgNoSourceUrl") }
                    </div>
                }
            </div>
        </article>
    );
}

export default RecipeDetails;