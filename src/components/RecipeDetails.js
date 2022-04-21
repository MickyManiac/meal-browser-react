import React from 'react';
import './RecipeDetails.css';

function RecipeDetails({ recipeData }) {
    return(
        <div className="recipe-details" key={recipeData.id+"_"+recipeData.title}>
            <div className="recipe-id">{recipeData.id}</div>
            <div className="recipe-name">{recipeData.title}</div>
            <div className="image-box"><img className="icon" alt={recipeData.title} src={recipeData.image}/></div>
            <div className="recipe-section">Bereidingstijd:</div><div> {recipeData.readyInMinutes} minuten</div>
            <div className="recipe-section">Ingredi&euml;nten voor {recipeData.servings} porties</div>
            { recipeData.extendedIngredients.length > 0 &&
                <>
                    { recipeData.extendedIngredients.map((ingredient) => (
                        <div>{ingredient.original}</div>
                    ))}
                </>
            }
            <div className="recipe-section">Bereidingswijze</div>
            <div>{recipeData.instructions}</div>
            <div className="popularity">{recipeData.aggregateLikes} likes</div>
            <div><a href={recipeData.sourceUrl} target="_blank" rel="noreferrer">{recipeData.sourceUrl}</a></div>
        </div>
    );
}

export default RecipeDetails;