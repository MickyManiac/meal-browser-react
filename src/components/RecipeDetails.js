import React from 'react';
import './RecipeDetails.css';
import noimagefound from "../assets/NoImageFound.GIF";
import cleanUpInstructionsString from "../helpers/cleanUpInstructionsString";

function RecipeDetails({ recipeData }) {
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
                        <div className="recipe-section">Bereidingstijd</div>
                        <div> {recipeData.readyInMinutes} minuten</div>
                    </>
                    :
                    <div className="empty-recipe-section">De bereidingstijd kon voor dit recept helaas niet worden opgehaald.</div>
                }
            </div>
            <div className="middle-part">
                <div className="middle-text">
                    { recipeData.extendedIngredients && recipeData.extendedIngredients.length > 0
                        ?
                        <>
                            { recipeData.servings >= 0
                                ?
                                <div className="recipe-section">Ingredi&euml;nten voor {recipeData.servings} porties</div>
                                :
                                <div className="recipe-section">Ingredi&euml;nten</div>
                            }
                            <ul className="bullet-list">
                                { recipeData.extendedIngredients.map((ingredient, index) => (
                                    <li key={recipeData.id+"_ingr_"+index}>{ingredient.original}</li>
                                ))}
                            </ul>
                        </>
                        :
                        <div className="empty-recipe-section">
                            De ingredi&euml;nten konden voor dit recept helaas niet worden opgehaald.
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
                        <img className="recipe-image" alt="No food image found." src={noimagefound}/>
                    }
                </div>
            </div>
            <div className="recipe-footer">
                <div className="instructions">
                    { recipeData.instructions && recipeData.instructions.length > 0
                        ?
                        <>
                            <div className="recipe-section">Bereidingswijze</div>
                            <div className="recipe-data">
                                { cleanUpInstructionsString(recipeData.instructions).split(/\|/).map((step, index) => (
                                    <div key={recipeData.id+"_instr_"+index}>{step}</div>
                                ))
                                }
                            </div>
                        </>
                        :
                        <div className="empty-recipe-section">
                            De bereidingswijze kon voor dit recept helaas niet worden opgehaald.
                        </div>
                        }
                </div>
                { recipeData.sourceUrl && recipeData.sourceUrl.length > 0
                    ?
                    <div className="recipe-source">
                        <div className="recipe-section">bron</div>
                        <div><a href={recipeData.sourceUrl} target="_blank" rel="noreferrer">{recipeData.sourceUrl}</a></div>
                    </div>
                    :
                    <div className="empty-recipe-source">
                        Een externe link kon voor dit recept helaas niet worden opgehaald.
                    </div>
                }
            </div>
        </article>
    );
}

export default RecipeDetails;