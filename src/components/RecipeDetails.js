import React from 'react';
import './RecipeDetails.css';
import noimagefound from "../assets/NoImageFound.GIF";

function RecipeDetails({ recipeData }) {
    return(
        <article className="recipe-details">
            <div className="recipe-header">
                { recipeData.title
                    ?
                    <div className="recipe-title">{recipeData.title}</div>
                    :
                    <div className="no-recipe-title">-----</div>
                }
                { recipeData.aggregateLikes &&
                    <div className="recipe-data">{recipeData.aggregateLikes} likes</div>
                }
                { recipeData.readyInMinutes
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
                            {recipeData.servings ?
                                <div className="recipe-section">Ingredi&euml;nten voor {recipeData.servings} porties</div> :
                                <div className="recipe-section">Ingredi&euml;nten</div>
                            }
                            <ul className="bullet-list">
                                { recipeData.extendedIngredients.map((ingredient, index) => (
                                    <li key={recipeData.id+"_"+index}>{ingredient.original}</li>
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
                    { recipeData.image
                        ?
                        <img className="recipe-image" alt={recipeData.title} src={recipeData.image}/>
                        :
                        <img className="recipe-image" alt="No food image found." src={noimagefound}/>
                    }
                </div>
            </div>
            <div className="recipe-footer">
                <div className="instructions">
                    { recipeData.instructions
                        ?
                        <>
                            <div className="recipe-section">Bereidingswijze</div>
                            <div className="recipe-data">{recipeData.instructions}</div>
                        </>
                        :
                        <div className="empty-recipe-section">
                            De bereidingswijze kon voor dit recept helaas niet worden opgehaald.
                        </div>
                        }
                </div>
                { recipeData.sourceUrl
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