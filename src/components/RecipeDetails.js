import React from 'react';
import './RecipeDetails.css';

function RecipeDetails({ recipeData }) {
    return(
        <article className="recipe-details" key={recipeData.id+"_"+recipeData.title}>
            <div className="recipe-header">
                <div className="recipe-title">{recipeData.title}</div>
                <div className="recipe-data">{recipeData.aggregateLikes} likes</div>
                <div className="recipe-section">Bereidingstijd</div><div> {recipeData.readyInMinutes} minuten</div>
            </div>
            <div className="middle-part">
                <div className="middle-text">
                    <div className="recipe-section">Ingredi&euml;nten voor {recipeData.servings} porties</div>
                    { recipeData.extendedIngredients.length > 0 &&
                        <ul className="bullet-list">
                            { recipeData.extendedIngredients.map((ingredient) => (
                                <li>{ingredient.original}</li>
                            ))}
                        </ul>
                    }
                </div>
                <div className="middle-image">
                    <img className="recipe-image" alt={recipeData.title} src={recipeData.image}/>
                </div>
            </div>
            <div className="recipe-footer">
                <div className="instructions">
                    <div className="recipe-section">Bereidingswijze</div>
                    <div className="recipe-data">{recipeData.instructions}</div>
                </div>
                <div className="recipe-section">Bron</div><div><a href={recipeData.sourceUrl} target="_blank" rel="noreferrer">{recipeData.sourceUrl}</a></div>
            </div>
        </article>
    );
}

export default RecipeDetails;