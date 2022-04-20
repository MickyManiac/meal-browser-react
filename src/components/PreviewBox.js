import React from 'react';
import './PreviewBox.css';

function PreviewBox({ previewData }) {
    return(
        <>
            { <div className="preview-box">
                    <div class="recipeid">{previewData.id}</div>
                    <div class="recipe-name">{previewData.title}</div>
                    <div class="image-box"><img class="icon" alt={previewData.title} src={previewData.image}/></div>
                    <div class="preparation-time">Bereidingstijd: {previewData.readyInMinutes} minuten</div>
                    <div class="popularity">{previewData.aggregateLikes} likes</div>
                    <div><a href={previewData.sourceUrl} target="_blank">{previewData.sourceUrl}</a></div>
                </div>
            }
        </>
    );
}

export default PreviewBox;