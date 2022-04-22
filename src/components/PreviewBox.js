import React from 'react';
import './PreviewBox.css';
import noimagefound from "../assets/NoImageFound.GIF";

function PreviewBox({ previewData, itemIndex, fnUseItemIndex }) {
    return(
        <div className="preview-box" onClick={() => fnUseItemIndex(itemIndex)}>
            <div className="upper-part">
                { previewData.id >= 0
                    ?
                    <div className="recipe-id">{previewData.id} (index: {itemIndex})</div>
                    :
                    <div className="no-recipe-id">--- (index: {itemIndex})</div>
                }
                { previewData.title && previewData.title.length > 0
                    ?
                    <div className="recipe-name">{previewData.title}</div>
                    :
                    <div className="no-recipe-name">Receptnaam niet gevonden</div>
                }
            </div>
            <div className="lower-part">
                <div className="image-box">
                    { previewData.image && previewData.image.length > 0
                        ?
                        <>
                            { previewData.title && previewData.title.length > 0
                                ?
                                <img className="icon" alt={previewData.title} src={previewData.image}/>
                                :
                                <img className="icon" alt="-----" src={previewData.image}/>
                            }
                        </>
                        :
                        <img className="icon" alt="No food image found." src={noimagefound}/>
                    }
                </div>
                { previewData.readyInMinutes >= 0
                    ?
                    <div className="preparation-time">Bereidingstijd: {previewData.readyInMinutes} minuten</div>
                    :
                    <div className="no-preparation-time">Bereidingstijd niet gevonden</div>
                }
                { previewData.aggregateLikes >= 0
                    ?
                    <div className="popularity">{previewData.aggregateLikes} likes</div>
                    :
                    <div className="no-popularity">Aantal likes niet gevonden</div>
                }
            </div>
        </div>
    );
}

export default PreviewBox;