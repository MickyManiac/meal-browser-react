import React, {useContext} from 'react';
import {LanguageContext} from "../context/LanguageContext";
import getText from "../helpers/getText";
import './PreviewBox.css';
import noimagefound from "../assets/NoImageFound.GIF";

function PreviewBox({ previewData, itemIndex, fnUseItemIndex }) {
    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Render component content
    return(
        <div className="preview-box" onClick={() => fnUseItemIndex(itemIndex)}>
            <div>
                { previewData.title && previewData.title.length > 0
                    ?
                    <div className="recipe-name">{previewData.title}</div>
                    :
                    <div className="no-recipe-name">{ getText(activeLanguage, "shortMsgNoRecipeName") }</div>
                }
            </div>
            <div>
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
                        <img className="icon" alt="Food image not found." src={noimagefound}/>
                    }
                </div>
                { previewData.readyInMinutes >= 0
                    ?
                    <div className="preparation-time">{ getText(activeLanguage, "wordPreparationTime") }: {previewData.readyInMinutes} { getText(activeLanguage, "wordMinutes") }</div>
                    :
                    <div className="no-preparation-time">{ getText(activeLanguage, "shortMsgNoPreparationTime") }</div>
                }
                { previewData.aggregateLikes >= 0
                    ?
                    <div className="popularity">{previewData.aggregateLikes} likes</div>
                    :
                    <div className="no-popularity">{ getText(activeLanguage, "shortMsgNoLikes") }</div>
                }
            </div>
        </div>
    );
}

export default PreviewBox;